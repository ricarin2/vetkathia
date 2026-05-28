# VetKathia Web MVP

VetKathia Web MVP es la primera versión de la web de VetKathia, una marca
personal veterinaria especializada en nutrición natural para perros y gatos.

El objetivo del MVP es convertir tráfico de Instagram, TikTok, YouTube Shorts y
Facebook Reels en solicitudes de valoración nutricional, manteniendo un tono
premium, cálido, profesional y sin claims médicos agresivos.

## Flujo Actual

```txt
Redes sociales -> web -> formulario -> gracias -> respuesta manual
```

La web recoge la información inicial del caso y permite responder manualmente
con el siguiente paso recomendado.

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
  images/
    about-vet-placeholder.svg
    dog-cat-food-placeholder.svg
    hero-vet-dog-cat-placeholder.svg

src/
  assets/
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
```

- `VITE_FORMSPREE_ENDPOINT`: endpoint futuro para enviar solicitudes a
  Formspree o a un backend propio.
- `VITE_CALENDLY_URL`: URL futura de Calendly para reserva online.
- `VITE_ANALYTICS_ENABLED`: bandera preparada para conectar analítica más
  adelante.
- `VITE_LEGAL_CONTENT_READY`: mantener en `false` hasta que las páginas legales
  estén completadas y revisadas. En producción, si no vale `true`, las páginas
  legales muestran un aviso claro de que el sitio no está listo para publicarse.

Si `VITE_FORMSPREE_ENDPOINT` no existe, el formulario simula un envío correcto y
redirige a `/gracias`.

## Rutas

- `/`
- `/planes`
- `/solicitar-valoracion`
- `/gracias`
- `/sobre-mi`
- `/faq`
- `/aviso-legal`
- `/privacidad`
- `/cookies`
- `/condiciones`

## Qué No Está Implementado

- Pagos reales.
- Backend clínico.
- Stripe.
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

No se piden datos de tarjeta, no hay checkout y no se simulan pagos.

## Assets Y Contenido

- Las imágenes actuales son placeholders SVG propios en `public/images/`.
- No se usan imágenes externas con copyright.
- No hay testimonios ficticios.
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
- Decidir pagos y estrategia de contratación.
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

### Netlify

- Build command: `pnpm build`.
- Publish directory: `dist`.
- Environment variables: añadir solo las necesarias.

En ambos casos, configurar rewrite SPA si la plataforma no lo detecta
automáticamente:

```txt
/* /index.html 200
```
