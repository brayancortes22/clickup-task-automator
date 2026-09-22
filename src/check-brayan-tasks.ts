import dotenv from 'dotenv';
dotenv.config();

const API_TOKEN = process.env.CLICKUP_API_TOKEN || '';
const lists = [
  { name: 'Sprint 1', id: '901717181777' },
  { name: 'Sprint 2', id: '901717181778' },
  { name: 'Sprint 3', id: '901717181779' },
  { name: 'Sprint 4', id: '901717181780' },
];

async function checkBrayanTasks() {
  console.log('🔍 Buscando tareas asignadas a Brayan en todos los Sprints...\n');
  for (const list of lists) {
    const url = `https://api.clickup.com/api/v2/list/${list.id}/task?archived=false&subtasks=true&include_closed=true`;
    const res = await fetch(url, { headers: { Authorization: API_TOKEN } });
    const data: any = await res.json();
    const tasks = data.tasks || [];
    const brayanTasks = tasks.filter((t: any) =>
      t.assignees.some((a: any) =>
        a.username?.toLowerCase().includes('brayan') || a.email?.includes('brayan')
      )
    );

    console.log(`📌 ${list.name} (${brayanTasks.length} tareas asignadas a Brayan):`);
    for (const t of brayanTasks) {
      const parent = t.parent ? ` (Subtarea de ${t.parent})` : ' [PRINCIPAL]';
      console.log(`   [${t.id}] ${t.name} | Status: "${t.status?.status}"${parent}`);
    }
    console.log('');
  }
}

checkBrayanTasks();
