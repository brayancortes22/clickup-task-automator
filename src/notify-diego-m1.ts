import dotenv from 'dotenv';
dotenv.config();

const API_TOKEN = process.env.CLICKUP_API_TOKEN || '';
const taskIds = ['86e3jvvu6', '86e3jvvum']; // aurora_external_tools y Cerrar M1

const commentText = `🚀 [Lead Architect Handover] PR #2 abierto y base de M1 entregada en development

Hola @Diego Arias, ¡buenas noticias! Ya completamos y cerramos al 100% el hito M0 (con tag oficial m0) y dejamos lista nuestra parte de M1 en development.

📌 Pull Request #2 abierto hacia QA: https://github.com/aurora-engine-labs/aurora-engine/pull/2

Resumen de lo entregado:
1. 📖 Guía técnica para el equipo:
   - Añadida en docs/13-anatomia-de-un-modulo.md e indexada en docs/README.md. Explica con ejemplos config.py, SCsub, register_types, GDCLASS, _bind_methods, gestión de memoria (Ref vs Object) y tests doctest. Te servirá de plantilla directa para crear tu módulo.

2. 🧱 Módulo modules/aurora_core/:
   - 11 categorías de log tipadas (AuroraAI, AuroraMCP, AuroraExternalTools, AuroraRenderer, etc.) y macros AURORA_LOG_INFO, AURORA_LOG_WARN, AURORA_LOG_ERROR.
   - Singleton AuroraCore con versión 0.1.0-dev, versión base 4.7.2-stable y ProjectSettings bajo aurora/*.
   - Tests doctest listos en modules/aurora_core/tests/.

3. 🧠 Módulo modules/aurora_intelligence/:
   - Esqueleto compilable con clase AuroraIntelligence registrada en ClassDB y tests doctest.

4. 🔌 Módulo modules/aurora_mcp/:
   - Esqueleto compilable con clase AuroraMCP (especificación 2024-11-05) y tests doctest.

5. 🛡️ Suite de CI Local:
   - Scripts aurora/tools/ci_local.ps1 y ci_local.sh validados con 0 errores, 0 secretos y cero archivos de upstream modificados.

---
👉 Lo que te corresponde para cerrar M1:
1. Implementar el esqueleto de modules/aurora_external_tools/ y la interfaz IExternalTool (apóyate en docs/13-anatomia-de-un-modulo.md).
2. Compilar y ejecutar los tests doctest (--headless --test) con los 4 módulos en tu máquina de desarrollo o CI.
3. Al tenerlo listo, aprobamos y fusionamos el PR #2 y aplicamos el tag conjunto m1.

¡Queda todo sincronizado en development para que continúes!`;

async function notify() {
  for (const taskId of taskIds) {
    console.log(`Enviando notificación a Diego en ClickUp para la tarea ${taskId}...`);
    try {
      const res = await fetch(`https://api.clickup.com/api/v2/task/${taskId}/comment`, {
        method: 'POST',
        headers: {
          Authorization: API_TOKEN,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          comment_text: commentText,
          notify_all: true,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log(`✅ Comentario publicado con éxito en tarea ${taskId} (Comment ID: ${data.id})`);
      } else {
        const err = await res.text();
        console.error(`❌ Error al publicar en tarea ${taskId}:`, err);
      }
    } catch (e) {
      console.error(`❌ Excepción al publicar en tarea ${taskId}:`, e);
    }
  }
}

notify();
