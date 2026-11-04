import dotenv from 'dotenv';
dotenv.config();

const API_TOKEN = process.env.CLICKUP_API_TOKEN || '';

const DELIVERED_TASK_IDS = [
  // Sprint 1
  '86e3bamxx', // S1-T1 Principal
  '86e3bamxy', // S1-T1.1
  '86e3bamy1', // S1-T1.2
  '86e3bamy2', // S1-T1.3
  '86e3bamy4', // S1-T2 Principal
  '86e3bamy5', // S1-T2.1
  '86e3bamy6', // S1-T2.2
  '86e3bamy8', // S1-T2.3
  '86e3bamya', // S1-T3 Principal
  '86e3bamyb', // S1-T3.1
  '86e3bamyc', // S1-T3.2
  '86e3bamyd', // S1-T3.3

  // Sprint 2
  '86e3bamz0', // S2-T1 Principal
  '86e3bamz1', // S2-T1.1
  '86e3bamz2', // S2-T1.2
  '86e3bamz3', // S2-T1.3
  '86e3bamz4', // S2-T2 Principal
  '86e3bamz5', // S2-T2.1
  '86e3bamz7', // S2-T2.2
  '86e3bamzg', // S2-T2.3
  '86e3bamzh', // S2-T3 Principal
  '86e3bamzk', // S2-T3.1
  '86e3bamzu', // S2-T3.2
  '86e3bamzv', // S2-T3.3

  // Sprint 3
  '86e3ban0k', // S3-T1 Principal
  '86e3ban0m', // S3-T1.1
  '86e3ban0p', // S3-T1.2
  '86e3ban0q', // S3-T1.3
  '86e3ban0u', // S3-T2 Principal
  '86e3ban0x', // S3-T2.1
  '86e3ban0y', // S3-T2.2
  '86e3ban10', // S3-T2.3
  '86e3ban11', // S3-T3 Principal
  '86e3ban13', // S3-T3.1
  '86e3ban16', // S3-T3.2
  '86e3ban17', // S3-T3.3
  '86e3ban19', // S3-T4 Principal
  '86e3ban1a', // S3-T4.1
  '86e3ban1b', // S3-T4.2
  '86e3ban1d', // S3-T4.3

  // Sprint 4
  '86e3ban1p', // S4-T1 Principal
  '86e3ban1r', // S4-T1.1
  '86e3ban1u', // S4-T1.2
  '86e3ban1v', // S4-T1.3
  '86e3ban21', // S4-T3 Principal
  '86e3ban2b', // S4-T3.1
  '86e3ban2c', // S4-T3.2
  '86e3ban2f', // S4-T3.3
];

async function completeTasks() {
  console.log(`🚀 Iniciando actualización a 'complete' de ${DELIVERED_TASK_IDS.length} tareas en ClickUp...\n`);
  let successCount = 0;
  let errorCount = 0;

  for (const taskId of DELIVERED_TASK_IDS) {
    try {
      const res = await fetch(`https://api.clickup.com/api/v2/task/${taskId}`, {
        method: 'PUT',
        headers: { Authorization: API_TOKEN, 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'complete' }),
      });
      if (res.ok) {
        successCount++;
        console.log(`✅ [${successCount}/${DELIVERED_TASK_IDS.length}] Tarea ${taskId} actualizada a 'complete'`);
      } else {
        errorCount++;
        console.error(`❌ Error al actualizar ${taskId}:`, await res.text());
      }
      // Pequeño retardo para respetar rate limits de la API de ClickUp
      await new Promise(r => setTimeout(r, 120));
    } catch (e: any) {
      errorCount++;
      console.error(`❌ Excepción en ${taskId}:`, e.message);
    }
  }

  console.log(`\n🎉 Finalizado: ${successCount} actualizadas exitosamente, ${errorCount} errores.`);
}

completeTasks();
