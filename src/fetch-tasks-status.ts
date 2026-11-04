import dotenv from 'dotenv';
dotenv.config();

const API_TOKEN = process.env.CLICKUP_API_TOKEN || '';
const lists = [
  { name: 'Sprint 1', id: '901717181777' },
  { name: 'Sprint 2', id: '901717181778' },
  { name: 'Sprint 3', id: '901717181779' },
  { name: 'Sprint 4', id: '901717181780' },
];

async function fetchAllTasks() {
  for (const list of lists) {
    console.log(`\n================== ${list.name} (${list.id}) ==================`);
    const url = `https://api.clickup.com/api/v2/list/${list.id}/task?archived=false&subtasks=true&include_closed=true`;
    const res = await fetch(url, { headers: { Authorization: API_TOKEN } });
    const data: any = await res.json();
    const tasks = data.tasks || [];
    for (const t of tasks) {
      console.log(`[${t.id}] status: "${t.status?.status}" | name: "${t.name}"`);
    }
  }
}

fetchAllTasks();
