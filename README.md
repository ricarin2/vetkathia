# VetKathia Web MVP

VetKathia Web MVP es la primera versión de la web de VetKathia, una marca
personal veterinaria especializada en nutrición natural para perros y gatos.

El objetivo del MVP es convertir tráfico de Instagram, TikTok, YouTube Shorts,
Facebook Reels, Google y búsquedas en IA en tutores que entienden el servicio,
ven planes y precios pronto, eligen un plan y completan el cuestionario inicial
después de pagar, reservar o iniciar el plan.

La comunicación debe mantener un tono premium, cálido, profesional y sin claims
médicos agresivos. No se comunica revisión gratuita previa.

## Flujo Actual

```txt
Tráfico -> web -> planes -> elección de plan -> pago/reserva/inicio
-> cuestionario inicial -> revisión manual -> entrega según plan
```

La web muestra planes y precios antes del cuestionario. El cuestionario recoge
la información inicial del caso una vez seleccionado el plan y permite responder
manualmente con la valoración, pauta o acompañamiento que corresponda al servicio
contratado.

## Planes Y Precios

- Valoración Nutricional: 59 €
- Plan Personalizado: 89 €
- Plan con Acompañamiento: 129 €

## Stack

- React + Vite
- TypeScript
- Tailwind CSS
- React Router
- React Hook Form
- Zod
- Lucide React
- GSAP para microanimaciones sutiles en escritorio

Three.js no está activo en el MVP final. Se sustituyó por un fondo CSS ligero
para evitar peso innecesario en un detalle decorativo.

## Comandos

Instalar dependencias:

```bash
pnpm install
```

Desarrollo local:

```bash
pnpm dev
```

Build de producción:

```bash
pnpm build
```

Preview del build:

```bash
pnpm preview
```

Lint:

```bash
pnpm lint
```

Si no usas pnpm:

```bash
npm install
npm run dev
npm run build
npm run preview
npm run lint
```

## Estructura De Carpetas

```txt
public/
  favicon.svg
  llms.txt
  robots.txt
  sitemap.xml
  _redirects
  images/
    kathia-vet-web.jpg
    vetkathia-hero-pets.jpg
    placeholders SVG propios

src/
  components/
    common/
    forms/
    layout/
    sections/
    ui/
  data/
  hooks/
  lib/
  pages/
  routes/
  styles/
```

Carpetas principales:

- `src/components/ui`: componentes base reutilizables.
- `src/components/layout`: header, footer, navegación móvil y layout principal.
- `src/components/common`: piezas compartidas como placeholders de integración.
- `src/pages`: páginas de cada ruta.
- `src/routes`: configuración de React Router.
- `src/data`: contenido estructurado para planes, FAQs, home y legales.
- `src/lib`: validación, envío de formulario, integraciones y tracking.
- `src/hooks`: hooks de microanimaciones.
- `src/styles`: estilos globales y tokens visuales.

## Variables De Entorno

Todas son opcionales en el MVP.

```bash
VITE_FORMSPREE_ENDPOINT=
VITE_CALENDLY_URL=
VITE_ANALYTICS_ENABLED=false
VITE_LEGAL_CONTENT_READY=false
VITE_SHOW_DEMO_CASES=
```

- `VITE_FORMSPREE_ENDPOINT`: endpoint futuro para enviar solicitudes a
  Formspree o a un backend propio.
- `VITE_CALENDLY_URL`: URL futura de Calendly para reserva online.
- `VITE_ANALYTICS_ENABLED`: bandera preparada para conectar analítica más
  adelante.
- `VITE_LEGAL_CONTENT_READY`: mantener en `false` hasta que las páginas legales
  estén completadas y revisadas. En producción, si no vale `true`, las páginas
  legales muestran un aviso claro de que el sitio no está listo para publicarse.
- `VITE_SHOW_DEMO_CASES`: permite mostrar casos demo en producción si vale
  `true`. En desarrollo se muestran por defecto salvo que valga `false`.

Si `VITE_FORMSPREE_ENDPOINT` no existe, el formulario simula un envío correcto y
redirige a `/gracias`.

## Rutas

- `/`
- `/planes`
- `/solicitar-valoracion`
- `/gracias`
- `/sobre-mi`
- `/casos`
- `/faq`
- `/aviso-legal`
- `/privacidad`
- `/cookies`
- `/condiciones`

## Qué No Está Implementado

- Pagos reales.
- Backend clínico.
- Checkout interno con Stripe.
- Calendly activo.
- Área privada.
- Login.
- Ecommerce.
- Base de datos clínica.
- Automatizaciones avanzadas.

## Integraciones Preparadas

- Formulario listo para conectar a Formspree o backend propio.
- Placeholder de Calendly en `/solicitar-valoracion`.
- Capa de tracking neutral en `src/lib/analytics.ts`, preparada para Plausible,
  Google Analytics o PostHog.
- `src/lib/planCheckout.ts` prepara enlaces de checkout/reserva por plan. Si no
  hay enlace externo configurado, el CTA lleva al cuestionario con el plan
  seleccionado.

No se piden datos de tarjeta dentro de la web, no hay checkout interno y no se
simulan pagos.

## Assets Y Contenido

- La home usa imágenes propias/locales en `public/images/`, incluyendo
  `/images/kathia-vet-web.jpg` para la sección Sobre Kathia y assets JPG del
  hero.
- También hay placeholders SVG propios para futuras sustituciones visuales.
- No se usan imágenes externas con copyright.
- No hay testimonios reales inventados.
- Los casos demo están marcados como demo visual y no deben presentarse como
  testimonios reales.
- Las páginas legales son placeholders y requieren revisión profesional antes de
  publicar en producción.

## Checklist Antes De Publicar

- Completar responsable.
- Completar email de contacto.
- Completar finalidad del tratamiento.
- Completar legitimación.
- Completar destinatarios.
- Completar derechos.
- Completar política de cookies.
- Revisar condiciones del servicio.
- Revisar fiscalidad y cobros.

## Próximos Pasos

- Conectar formulario real.
- Integrar Calendly.
- Decidir enlaces externos de pago/reserva y estrategia de contratación.
- Añadir analítica.
- Para SEO fuerte, considerar prerender estático o migración futura a Astro/Next
  si se quiere posicionar contenido orgánico.
- Añadir testimonios reales cuando existan.
- Crear lead magnet SENIOR.
- Sustituir placeholders por imágenes propias reales.
- Revisar textos legales con profesional cualificado.

## Despliegue

### Vercel

- Framework preset: `Vite`.
- Build command: `pnpm build`.
- Output directory: `dist`.
- Environment variables: añadir solo las necesarias.
- Fallback SPA configurado en `vercel.json`.

### Netlify / Cloudflare Pages

- Build command: `pnpm build`.
- Publish directory: `dist`.
- Environment variables: añadir solo las necesarias.
- Fallback SPA configurado en `public/_redirects`.

Fallback usado:

```txt
/* /index.html 200
```
