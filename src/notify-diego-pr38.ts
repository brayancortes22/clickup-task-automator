import dotenv from 'dotenv';
dotenv.config();

const API_TOKEN = process.env.CLICKUP_API_TOKEN || '';
const taskId = '86e3ban2g'; // [S4-T4] Optimización de rendimiento WebGL para garantizar 60 FPS estables

const commentText = `🛰️ [Frontend Lead / Code Review PR #38] Saneamiento de seguridad y optimización de shaders WebGL

Hola @Diego Arias, ¡excelente entrega en el PR #38 con la Tierra realista y los datos reales de GISTEMP v4!

Para blindar la rama y dejarla lista para su aprobación e integración a development sin objeciones en los pipelines de seguridad (CI/CD), acabamos de aplicar los siguientes ajustes preventivos directamente en la rama 'feat/s4-earth-realism-api-integration':

1. 🔐 Seguridad de Credenciales (DevSecOps):
- Se removió 'frontend/.env' del repositorio de Git y se restablecieron las reglas de protección en '.gitignore'.
- La clave VITE_ESRI_API_KEY ya quedó guardada de manera segura en GitHub Secrets (organización y mirror de Vercel) y en el archivo local 'frontend/.env.local' para que sigas desarrollando sin problemas.
- Nota para despliegue: Recuerda habilitar el dominio de Vercel (o *.vercel.app) en los Allowed Referrers de ArcGIS y añadir VITE_ESRI_API_KEY en el panel de Vercel.

2. 🎨 Shaders WebGL (earthTileShader.ts):
- Se dinamizó 'customProgramCacheKey' ('earth-detail-tile-v6_\${material.map ? "map" : "nomap"}') para evitar que Three.js reutilice el programa WebGL compilado sin textura en los mosaicos que ya la tienen cargada.

3. 📝 Documentación Viva:
- Se actualizó la nota 33 en 'docs/obsidian/' reflejando el protocolo seguro de variables.

El build de frontend y los 125 tests de backend pasan 100% limpios. El PR #38 queda listo para fusionarse a development. ¡Gran trabajo!`;

async function notify() {
  console.log(`Enviando notificación a Diego en ClickUp para la tarea ${taskId}...`);
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
    console.log(`✅ Comentario publicado con éxito en ClickUp (Comment ID: ${data.id})`);
  } else {
    const err = await res.text();
    console.error('❌ Error al publicar en ClickUp:', err);
  }
}

notify();
