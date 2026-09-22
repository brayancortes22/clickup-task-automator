import dotenv from 'dotenv';
dotenv.config();

const API_TOKEN = process.env.CLICKUP_API_TOKEN || '';

const S1_T5_MANUAL = `📖 [Manual de Uso Oficial] Componentes del Design System Espacial y MissionHeader

Hola equipo y jurado de la NASA, adjunto el manual de uso de los componentes desarrollados en [S1-T5]:

1. 🌌 Filosofía Visual:
Diseño de cabina orbital que combina 'cosmic-void' (#05070a) con acentos 'nasa-blue' y 'nasa-cyan', utilizando superficies translúcidas Glassmorphism con desenfoque de fondo de 16px/24px.

2. 🪟 Componente GlassPanel:
- 'variant="standard"': Paneles y barras laterales (blur 16px, borde sutil).
- 'variant="deep"': Paneles de datos y tarjetas de análisis (mayor contraste cósmico).
- 'variant="glow"': Contenedores destacados con aura luminiscente.
Uso: '<GlassPanel variant="deep" className="p-4">...</GlassPanel>'

3. 🏷️ Componente StatusBadge:
- 'variant="active"': Misión o telemetría activa en órbita (con pulso animado).
- 'variant="nominal"': Estado operativo normal.
- 'variant="warning"': Detección de anomalías térmicas o pérdida de datos.

4. 🛰️ MissionHeader (Navbar de Misión):
Ubicado en la esquina superior izquierda. Centraliza los badges de estado operativo, marca oficial NASA Space Apps 2026 e indicadores de conexión en tiempo real.

Documentación completa en el repositorio: 'docs/obsidian/16-Manual-de-Uso-Frontend-y-UI.md'`;

const S2_T5_MANUAL = `📖 [Manual de Uso Oficial] Inspector de Detective y Tarjeta Flotante (DetectiveCard)

Hola equipo y evaluadores científicos, adjunto el manual de uso del Inspector de Detective desarrollado en [S2-T5]:

1. 🧭 Activación e Interacción:
- Al hacer clic o tocar cualquier coordenada del globo 3D, se abre automáticamente la tarjeta flotante 'DetectiveCard'.
- La cámara ajusta suavemente su proyección lateral ('focusOffset') para evitar ocluir el punto geográfico seleccionado.

2. 📊 Badges de Significancia Estadística (Test de Mann-Kendall):
Evalúa el rigor no paramétrico de las observaciones según el umbral bilateral |Z| >= 1.96 (p < 0.05):
- 🔴 Calentamiento Acelerado (Z >= +1.96, p < 0.05, Q > 0)
- 🔵 Enfriamiento Anómalo (Z <= -1.96, p < 0.05, Q < 0)
- 🟢 Enverdecimiento Acelerado (Aumento sostenido NDVI)
- 🟠 Pérdida Crítica de Biomasa (Deforestación o sequía)
- 🔷 Pérdida Acelerada de Hielo (Déficit gravimétrico GRACE)
- ⚪ Sin Tendencia Significativa (|Z| < 1.96)
👉 Al pasar el cursor o pulsar sobre el badge, un tooltip científico expone Z-score, p-value y Pendiente de Sen (Q).

3. 📈 Gráfico de Series Temporales (TimeSeriesChart):
- Motor vectorial SVG nativo a 60 FPS sin dependencias pesadas.
- Muestra observaciones históricas 2000-2026 y línea de tendencia de Sen.
- Pasa el cursor por cada punto para ver el año y la lectura con unidad física (°C, NDVI, Gt, ppm).

4. ♿ Accesibilidad y Control:
- Presionar 'Escape' cierra inmediatamente el inspector.
- Navegación por teclado con 'Tab' sin trampas de foco.
- Soporte nativo para 'prefers-reduced-motion'.

Documentación completa en el repositorio: 'docs/obsidian/16-Manual-de-Uso-Frontend-y-UI.md'`;

async function postManuals() {
  console.log('Enviando manuales de uso a ClickUp...');

  // 1. Postear en S1-T5
  const res1 = await fetch(`https://api.clickup.com/api/v2/task/86e3bamyp/comment`, {
    method: 'POST',
    headers: { Authorization: API_TOKEN, 'Content-Type': 'application/json' },
    body: JSON.stringify({ comment_text: S1_T5_MANUAL, notify_all: false })
  });
  const data1 = await res1.json();
  console.log('✅ Manual de uso publicado en [S1-T5] (Comment ID:', data1.id, ')');

  // 2. Postear en S2-T5
  const res2 = await fetch(`https://api.clickup.com/api/v2/task/86e3ban07/comment`, {
    method: 'POST',
    headers: { Authorization: API_TOKEN, 'Content-Type': 'application/json' },
    body: JSON.stringify({ comment_text: S2_T5_MANUAL, notify_all: false })
  });
  const data2 = await res2.json();
  console.log('✅ Manual de uso publicado en [S2-T5] (Comment ID:', data2.id, ')');
}

postManuals();
