import dotenv from 'dotenv';
dotenv.config();

const API_TOKEN = process.env.CLICKUP_API_TOKEN || '';
const lists = [
  { name: 'Sprint 1', id: '901717181777' },
  { name: 'Sprint 2', id: '901717181778' },
  { name: 'Sprint 3', id: '901717181779' },
  { name: 'Sprint 4', id: '901717181780' },
];

async function checkAll() {
  console.log('🔍 Consultando las listas de los 4 Sprints en ClickUp...\n');
  for (const list of lists) {
    const url = `https://api.clickup.com/api/v2/list/${list.id}/task?archived=false&subtasks=true&include_closed=true`;
    const res = await fetch(url, { headers: { Authorization: API_TOKEN } });
    const data: any = await res.json();
    const tasks = data.tasks || [];
    console.log(`📦 ${list.name} (List ID: ${list.id}): ${tasks.length} tareas registradas.`);
  }
}

checkAll();
