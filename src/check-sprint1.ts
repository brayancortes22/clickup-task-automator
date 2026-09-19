import { ClickUpClient } from './services/clickup-client.js';
import dotenv from 'dotenv';
dotenv.config();

const API_TOKEN = process.env.CLICKUP_API_TOKEN || '';
const LIST_ID = '901717181777';

async function check() {
  const url = `https://api.clickup.com/api/v2/list/${LIST_ID}/task?archived=false&subtasks=true&include_closed=true`;
  const res = await fetch(url, {
    headers: {
      Authorization: API_TOKEN,
      'Content-Type': 'application/json',
    },
  });
  const data: any = await res.json();
  const tasks = data.tasks || [];
  console.log(`📋 Total de tareas en la lista de Sprint 1: ${tasks.length}`);
  for (const t of tasks) {
    const parent = t.parent ? ` (Parent: ${t.parent})` : ' [TAREA PRINCIPAL]';
    console.log(`  • [${t.id}] ${t.name} | Status: "${t.status.status}"${parent}`);
  }
}

check();
