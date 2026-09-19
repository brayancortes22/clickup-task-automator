import { ClickUpClient } from './services/clickup-client.js';
import dotenv from 'dotenv';
dotenv.config();

const API_TOKEN = process.env.CLICKUP_API_TOKEN || '';
const LIST_ID = '901717181777';
const PARENT_TASK_ID = '86e3bbaxc';

const PARTICIPANTS = {
  july: 101359716,
  reving: 100146058,
  johan: 156225367,
  diego: 156057442,
  brayan: 240210240,
};

const subtasks = [
  {
    name: '[S1-T0.1] Despliegue de Frontend en Vercel Edge con SPA Routing y proxy API',
    description: `Configuración y puesta en producción del frontend React 19 / Vite en la infraestructura Edge de Vercel.

### Entregables y Logros:
- Configuración de \`nasa project/apps/web/vercel.json\` con reglas de reescritura para Single Page Application (SPA routing: \`/(.*) -> /index.html\`).
- Despliegue continuo (CI/CD) vinculado automáticamente a la rama \`production\` en GitHub.
- Configuración de variables de entorno para conexión con el backend en Render.
- **URL en Producción:** https://nasa-earth-trend-detective.vercel.app/`,
    assignees: [PARTICIPANTS.brayan],
    status: 'complete',
    priority: 1, // Urgent
  },
  {
    name: '[S1-T0.2] Despliegue de Backend .NET 10 en Render Cloud con Blueprint render.yaml',
    description: `Despliegue y containerización del backend ASP.NET Core 10 Preview en Render Cloud Services.

### Entregables y Logros:
- Blueprint de infraestructura como código (\`render.yaml\`) en la raíz del repositorio.
- Dockerfile multi-stage optimizado para SDK .NET 10 Preview y runtime Alpine/Linux.
- Soporte dinámico de variable de entorno \`PORT\` en \`Program.cs\` (\`http://0.0.0.0:\${port}\`).
- Endpoint de verificación de salud operacional (\`Health Check\`) activo y respondiendo \`Healthy\`.
- **URL en Producción:** https://nasa-trend-detective-api.onrender.com/health`,
    assignees: [PARTICIPANTS.july, PARTICIPANTS.brayan],
    status: 'complete',
    priority: 1, // Urgent
  },
  {
    name: '[S1-T0.3] Blindaje de ramas con GitHub Rulesets v2 (Anti-Force Push y Anti-Deletion)',
    description: `Protección integral del repositorio contra sobrescrituras destructivas y alteración del historial de Git.

### Entregables y Logros:
- Configuración de GitHub Ruleset oficial para ramas críticas: \`production\`, \`qa\` y \`development\`.
- Activación de reglas \`Block force pushes\` (Anti-Force Push) y \`Prevent branch deletion\`.
- Aplicación de política de contribución mediante Pull Requests y revisiones de pares.
- Alineación estricta con el flujo de trabajo de 3 ramas (Development -> QA -> Production).`,
    assignees: [PARTICIPANTS.brayan, PARTICIPANTS.july],
    status: 'complete',
    priority: 1, // Urgent
  },
  {
    name: '[S1-T0.4] Creación de equipos en GitHub (backend-team, frontend-team), CODEOWNERS y TEAM.md',
    description: `Estructuración de la gobernanza de ingeniería, equipos técnicos y asignación automática de revisiones de código.

### Entregables y Logros:
- Creación de equipos oficiales en la organización \`@nasa-trend-detective\`: \`@nasa-trend-detective/backend-team\` y \`@nasa-trend-detective/frontend-team\`.
- Configuración del archivo \`.github/CODEOWNERS\` para vinculación de responsabilidades sobre directorios (\`/backend\`, \`/apps/web\`, \`/packages/shared\`).
- Creación y publicación de \`TEAM.md\` detallando los 5 integrantes, sus roles asignados y canales de comunicación.`,
    assignees: [
      PARTICIPANTS.brayan,
      PARTICIPANTS.july,
      PARTICIPANTS.reving,
      PARTICIPANTS.johan,
      PARTICIPANTS.diego,
    ],
    status: 'complete',
    priority: 1, // Urgent
  },
  {
    name: '[S1-T0.5] Panel de acceso rápido para desarrolladores en README y GitHub Environments',
    description: `Diseño e implementación de un dashboard centralizado en la documentación raíz para agilizar el acceso del equipo a todos los entornos y herramientas.

### Entregables y Logros:
- Tabla interactiva de Entornos en Vivo en \`README.md\` (Production, QA, Development).
- Enlaces directos a frontend en Vercel, backend en Render, Swagger/OpenAPI docs y consola de monitoreo.
- Configuración de GitHub Environments con badges de estado y URLs de despliegue vinculadas.`,
    assignees: [PARTICIPANTS.brayan],
    status: 'complete',
    priority: 1, // Urgent
  },
];

async function run() {
  const client = new ClickUpClient(API_TOKEN);
  console.log(`🚀 Creando 5 subtareas bajo la tarea padre: ${PARENT_TASK_ID}...`);

  for (const sub of subtasks) {
    const payload = {
      name: sub.name,
      description: sub.description,
      markdown_description: sub.description,
      assignees: sub.assignees,
      status: sub.status,
      priority: sub.priority,
      parent: PARENT_TASK_ID,
    };

    try {
      const created = await client.createTask(LIST_ID, payload);
      console.log(`✅ Subtarea creada: [${created.id}] ${created.name} -> URL: ${created.url}`);
    } catch (err: any) {
      console.error(`❌ Error creando subtarea "${sub.name}":`, err.message);
    }
  }

  console.log('\n🎉 ¡Todas las subtareas han sido registradas exitosamente en ClickUp!');
}

run();
