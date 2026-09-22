import dotenv from 'dotenv';
dotenv.config();

const API_TOKEN = process.env.CLICKUP_API_TOKEN || '';
const LIST_ID = '901717181777'; // Sprint 1
const SPACE_ID = '90177646254';

async function checkViews() {
  console.log('🔍 Consultando vistas de la Lista de Sprint 1...');
  const res1 = await fetch(`https://api.clickup.com/api/v2/list/${LIST_ID}/view`, {
    headers: { Authorization: API_TOKEN },
  });
  const data1: any = await res1.json();
  console.log('Vistas de la lista:', data1.views?.map((v: any) => ({
    id: v.id,
    name: v.name,
    type: v.type,
    grouping: v.grouping,
  })));

  console.log('\n🔍 Consultando vistas del Space...');
  const res2 = await fetch(`https://api.clickup.com/api/v2/space/${SPACE_ID}/view`, {
    headers: { Authorization: API_TOKEN },
  });
  const data2: any = await res2.json();
  console.log('Vistas del Space:', data2.views?.map((v: any) => ({
    id: v.id,
    name: v.name,
    type: v.type,
    grouping: v.grouping,
  })));
}

checkViews();
