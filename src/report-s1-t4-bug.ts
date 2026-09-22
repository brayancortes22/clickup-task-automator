import dotenv from 'dotenv';
dotenv.config();

const API_TOKEN = process.env.CLICKUP_API_TOKEN || '';
const taskIds = ['86e3bamyf', '86e3bamyk']; // S1-T4 y S1-T4.2

const commentText = `🚨 [Reporte Técnico QA / Frontend Lead] Incidencia de renderizado y texturizado en la Tierra 3D (PR #7)

Hola @Diego Arias, durante las pruebas de integración local en la rama development con el nuevo Design System (S1-T5), identificamos que la esfera 3D del globo terráqueo no se visualiza (canvas en negro / sin texturas Blue Marble).

Tras realizar un análisis estático y dinámico a bajo nivel, encontramos las 3 causas raíz en S1-T4:

1. ⚠️ React.StrictMode en main.tsx:
React 19 en modo desarrollo ejecuta un ciclo de montaje -> desmontaje -> montaje en el frame 0. El cleanup inicial ejecuta 'globe._destructor()' y 'disposeSurface()', lo que destruye el WebGLRenderer y marca 'disposed = true', cancelando de inmediato las promesas de carga de texturas de TextureLoader ('if (disposed) return null;').

2. ⚠️ Bloqueo de caché de sombreadores en earthMaterial.ts (línea 47):
'material.customProgramCacheKey = () => "earth-day-ggx-v3";' devuelve un string estático. Three.js compila el WebGLProgram en el frame 1 cuando aún no hay texturas (sin USE_MAP). Cuando la textura Blue Marble 4K termina de cargar y hace 'material.needsUpdate = true', Three.js consulta la clave de caché, encuentra "earth-day-ggx-v3" y reutiliza el sombreador sin mapa, impidiendo que la textura se dibuje jamás.
👉 Solución: La clave debe ser dinámica según los mapas activos:
material.customProgramCacheKey = () => \`earth-ggx-\${material.map ? 'map' : 'nomap'}-\${material.bumpMap ? 'bump' : 'nobump'}\`;

3. ⚠️ Incompatibilidad de Shader Chunk en Three.js v0.186 (earthMaterial.ts línea 42):
El código busca reemplazar 'material.specularColor = vec3( 0.04 );'. En Three.js 0.186 esa línea cambió a 'material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );'. El reemplazo no hace match y no aplica el cálculo de reflectancia de agua.

Quedamos atentos a tu ajuste en S1-T4 para continuar con la validación del Sprint 1. ¡Gran trabajo en la base estructural!`;

async function postReport() {
  console.log('Enviando reporte de bug a ClickUp para S1-T4...');
  for (const taskId of taskIds) {
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
      console.log(`✅ Comentario publicado con éxito en la tarea ${taskId} (Comment ID: ${data.id})`);
    } else {
      const errorText = await res.text();
      console.error(`❌ Error al publicar en tarea ${taskId}:`, errorText);
    }
  }
}

postReport();
