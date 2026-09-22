import dotenv from 'dotenv';
dotenv.config();

const API_TOKEN = process.env.CLICKUP_API_TOKEN || '';
const LIST_ID = '901717181777'; // Sprint 1
const SPACE_ID = '90177646254';

async function createBoardViews() {
  console.log('🚀 Creando vista de Tablero (Board) agrupada por Estado en Sprint 1...');
  
  const payloadListBoard = {
    name: 'Tablero Kanban (Por Estados)',
    type: 'board',
    grouping: {
      field: 'status',
      dir: 1,
    },
  };

  const res1 = await fetch(`https://api.clickup.com/api/v2/list/${LIST_ID}/view`, {
    method: 'POST',
    headers: {
      Authorization: API_TOKEN,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payloadListBoard),
  });

  const data1: any = await res1.json();
  if (res1.ok) {
    console.log(`✅ Tablero creado en Sprint 1 (View ID: ${data1.view?.id}, Name: "${data1.view?.name}")`);
  } else {
    console.error('❌ Error al crear tablero en Lista:', data1);
  }

  console.log('\n🚀 Creando vista de Tablero General en el Space...');
  const payloadSpaceBoard = {
    name: 'Tablero General (Por Estados)',
    type: 'board',
    grouping: {
      field: 'status',
      dir: 1,
    },
  };

  const res2 = await fetch(`https://api.clickup.com/api/v2/space/${SPACE_ID}/view`, {
    method: 'POST',
    headers: {
      Authorization: API_TOKEN,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payloadSpaceBoard),
  });

  const data2: any = await res2.json();
  if (res2.ok) {
    console.log(`✅ Tablero creado en el Space (View ID: ${data2.view?.id}, Name: "${data2.view?.name}")`);
  } else {
    console.error('❌ Error al crear tablero en Space:', data2);
  }

  // Crear también un tablero agrupado por Integrante (Assignee) para facilitar el control de equipo
  console.log('\n🚀 Creando vista de Tablero por Integrante (Assignee)...');
  const payloadAssigneeBoard = {
    name: 'Tablero por Integrante (Responsable)',
    type: 'board',
    grouping: {
      field: 'assignee',
      dir: 1,
    },
  };

  const res3 = await fetch(`https://api.clickup.com/api/v2/list/${LIST_ID}/view`, {
    method: 'POST',
    headers: {
      Authorization: API_TOKEN,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payloadAssigneeBoard),
  });

  const data3: any = await res3.json();
  if (res3.ok) {
    console.log(`✅ Tablero por Integrante creado en Sprint 1 (View ID: ${data3.view?.id})`);
  } else {
    console.error('❌ Error al crear tablero por Integrante:', data3);
  }
}

createBoardViews();
