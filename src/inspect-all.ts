import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const token = process.env.CLICKUP_API_TOKEN || '';

async function fetchClickUp(endpoint: string) {
  const res = await fetch(`https://api.clickup.com/api/v2${endpoint}`, {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`ClickUp API Error (${res.status} ${res.statusText}): ${text}`);
  }
  return res.json();
}

async function main() {
  if (!token) {
    console.error('ERROR: No CLICKUP_API_TOKEN found in .env');
    return;
  }

  console.log('Fetching teams...');
  const teamsData = await fetchClickUp('/team');
  const teams = teamsData.teams || [];
  console.log(`Found ${teams.length} teams/workspaces:`);

  for (const team of teams) {
    console.log(`\n=== Team: ${team.name} (ID: ${team.id}) ===`);
    console.log('Members:');
    for (const member of team.members || []) {
      console.log(` - ${member.user.username} (${member.user.email}, ID: ${member.user.id}, Role: ${member.user.role})`);
    }

    console.log('\nFetching spaces for team:', team.name);
    const spacesData = await fetchClickUp(`/team/${team.id}/space?archived=false`);
    const spaces = spacesData.spaces || [];

    for (const space of spaces) {
      console.log(`\n--- Space: ${space.name} (ID: ${space.id}) ---`);
      
      // Fetch folders
      const foldersData = await fetchClickUp(`/space/${space.id}/folder?archived=false`);
      const folders = foldersData.folders || [];
      for (const folder of folders) {
        console.log(`  Folder: ${folder.name} (ID: ${folder.id})`);
        const listsData = await fetchClickUp(`/folder/${folder.id}/list?archived=false`);
        for (const list of listsData.lists || []) {
          console.log(`    List: ${list.name} (ID: ${list.id})`);
          // Fetch tasks in this list
          const tasksData = await fetchClickUp(`/list/${list.id}/task?archived=false&include_closed=true`);
          for (const task of tasksData.tasks || []) {
            const assignees = (task.assignees || []).map((a: any) => `${a.username} (ID: ${a.id})`).join(', ');
            console.log(`      Task: [${task.status.status}] ${task.name} | Assigned: ${assignees || 'Unassigned'}`);
          }
        }
      }

      // Fetch folderless lists
      const folderlessData = await fetchClickUp(`/space/${space.id}/list?archived=false`);
      const folderlessLists = folderlessData.lists || [];
      for (const list of folderlessLists) {
        console.log(`  Folderless List: ${list.name} (ID: ${list.id})`);
        const tasksData = await fetchClickUp(`/list/${list.id}/task?archived=false&include_closed=true`);
        for (const task of tasksData.tasks || []) {
          const assignees = (task.assignees || []).map((a: any) => `${a.username} (ID: ${a.id})`).join(', ');
          console.log(`    Task: [${task.status.status}] ${task.name} | Assigned: ${assignees || 'Unassigned'}`);
        }
      }
    }
  }
}

main().catch(console.error);
