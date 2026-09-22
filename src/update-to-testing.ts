import dotenv from 'dotenv';
dotenv.config();

const API_TOKEN = process.env.CLICKUP_API_TOKEN || '';
const SPACE_ID = '90177646254';
const TASK_IDS = [
  '86e3bamyp', // S1-T5 Principal
  '86e3bamyr', // S1-T5.1
  '86e3bamyt', // S1-T5.2
  '86e3bamyu', // S1-T5.3
];

async function syncTestingStatus() {
  const spaceRes = await fetch(`https://api.clickup.com/api/v2/space/${SPACE_ID}`, {
    headers: { Authorization: API_TOKEN },
  });
  const spaceData: any = await spaceRes.json();
  const statuses = spaceData.statuses || [];

  console.log('📋 Estados disponibles actualmente en el Space:');
  statuses.forEach((s: any) => console.log(`   - "${s.status}" (${s.type})`));

  const testingStatus = statuses.find((s: any) => {
    const name = s.status.toLowerCase();
    return name.includes('prueba') || name.includes('review') || name.includes('qa') || name.includes('test');
  });

  if (!testingStatus) {
    console.log('\n⚠️ El estado de "pruebas" / "qa" / "in review" aún no existe en el Space.');
    console.log('👉 Configúralo en la interfaz web de ClickUp (Space Settings -> Task Statuses).');
    return;
  }

  console.log(`\n🚀 Estado detectado: "${testingStatus.status}". Moviendo tareas a este estado...`);
  for (const taskId of TASK_IDS) {
    const res = await fetch(`https://api.clickup.com/api/v2/task/${taskId}`, {
      method: 'PUT',
      headers: { Authorization: API_TOKEN, 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: testingStatus.status }),
    });
    if (res.ok) {
      console.log(`✅ Tarea ${taskId} actualizada a "${testingStatus.status}".`);
    } else {
      console.error(`❌ Error al actualizar ${taskId}:`, await res.text());
    }
  }
}

syncTestingStatus();
