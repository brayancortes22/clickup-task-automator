import dotenv from 'dotenv';
dotenv.config();

const API_TOKEN = process.env.CLICKUP_API_TOKEN || '';
const SPACE_ID = '90177646254';

async function checkStatuses() {
  const res = await fetch(`https://api.clickup.com/api/v2/space/${SPACE_ID}`, {
    headers: { Authorization: API_TOKEN }
  });
  const data: any = await res.json();
  console.log('Statuses in Space:', data.statuses);
}

checkStatuses();
