# VetKathia Web

VetKathia Web es la web comercial de VetKathia, una marca personal veterinaria
especializada en nutrición natural para perros y gatos.

El objetivo es convertir tráfico de Instagram, TikTok, YouTube Shorts, Facebook
Reels, Google y búsquedas en IA en contratación online de servicios de nutrición
veterinaria: la persona entiende el servicio, compara planes, acepta
condiciones, paga con Stripe, completa el cuestionario nutricional y reserva
cita con Calendly cuando la agenda esté configurada.

La comunicación debe mantener un tono premium, cálido, profesional y sin claims
médicos agresivos. No se comunica revisión gratuita previa.

## Flujo Actual

```txt
Redes sociales / Google / IA -> web -> planes -> contratar
-> Stripe Checkout -> Calendly + cuestionario -> gracias
```

La web muestra planes y precios antes del cuestionario. El cuestionario recoge
la información inicial del caso una vez contratado el servicio y permite
responder manualmente con la valoración, pauta o acompañamiento que corresponda.

## Flujo De Contratación Online

1. La persona llega desde redes sociales, Google, buscadores o IA.
2. Entiende qué hace VetKathia y compara los planes.
3. Elige Valoración Nutricional, Plan Personalizado o Plan con Acompañamiento.
4. Revisa `/contratar`, acepta condiciones y confirma el plan.
5. Paga online mediante Stripe Checkout Sessions creadas en `/api`.
6. Agenda consulta o revisión con Calendly.
7. Completa el cuestionario nutricional en un formulario propio, Formspree o
   backend futuro.
8. Recibe la valoración, plan o acompañamiento según el servicio contratado.

Stripe y Calendly están pendientes de configuración o en integración. No se
deben pedir ni procesar datos de tarjeta directamente en React.

El cliente React nunca crea sesiones de Stripe ni conoce claves secretas. El
checkout se inicia con `POST /api/create-checkout-session`, que resuelve el
Price ID en servidor y devuelve la URL alojada de Stripe. El cumplimiento real
del servicio depende del webhook `POST /api/stripe-webhook`, no de la página de
éxito.

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

Three.js no está activo en la versión actual. Se sustituyó por un fondo CSS ligero
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
- `src/components/common`: piezas compartidas como SEO, JSON-LD y Calendly.
- `src/pages`: páginas de cada ruta.
- `src/routes`: configuración de React Router.
- `src/data`: contenido estructurado para planes, FAQs, home y legales.
- `src/lib`: validación, envío de formulario, integraciones y tracking.
- `src/hooks`: hooks de microanimaciones.
- `src/styles`: estilos globales y tokens visuales.

## Variables De Entorno

Todas son opcionales mientras Stripe y Calendly estén pendientes de
configuración o en integración.

```bash
VITE_SITE_URL=
VITE_FORMSPREE_ENDPOINT=
VITE_CALENDLY_URL=
VITE_CALENDLY_ENABLED=false
VITE_CALENDLY_URL_VALUATION=
VITE_CALENDLY_URL_PERSONALIZED=
VITE_CALENDLY_URL_ACCOMPANIMENT=
VITE_CHECKOUT_ENABLED=true
VITE_CHECKOUT_MODE=checkout_sessions
VITE_CHECKOUT_API_URL=/api/create-checkout-session
VITE_STRIPE_CONFIGURED=false
VITE_REQUIRE_PAYMENT_BEFORE_FORM=true
VITE_ANALYTICS_ENABLED=false
VITE_LEGAL_CONTENT_READY=false
VITE_SHOW_DEMO_CASES=

LEGAL_CONTENT_READY=false
CHECKOUT_ENABLED=false
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_VALUATION=
STRIPE_PRICE_PERSONALIZED=
STRIPE_PRICE_ACCOMPANIMENT=
```

- `VITE_SITE_URL`: URL pública del sitio para SEO, atribución y retornos de
  integración.
- `VITE_FORMSPREE_ENDPOINT`: endpoint futuro para enviar solicitudes a
  Formspree o a un backend propio.
- `VITE_CALENDLY_ENABLED`: activa la agenda online cuando vale `true`.
- `VITE_CALENDLY_URL`: URL genérica de Calendly para reserva online.
- `VITE_CALENDLY_URL_VALUATION`, `VITE_CALENDLY_URL_PERSONALIZED` y
  `VITE_CALENDLY_URL_ACCOMPANIMENT`: URLs públicas de Calendly por plan.
- `VITE_CHECKOUT_ENABLED`: activa el flujo de checkout cuando vale `true`.
- `VITE_CHECKOUT_MODE`: usar `checkout_sessions`.
- `VITE_CHECKOUT_API_URL`: endpoint serverless que crea la sesión de Stripe.
- `VITE_STRIPE_CONFIGURED`: marcar como `true` solo cuando el endpoint de
  checkout y las variables server-side de Stripe estén configurados.
- `VITE_REQUIRE_PAYMENT_BEFORE_FORM`: puede exigir pago antes del formulario si
  vale `true`.
- `VITE_ANALYTICS_ENABLED`: bandera preparada para conectar analítica más
  adelante.
- `VITE_LEGAL_CONTENT_READY`: mantener en `false` hasta que las páginas legales
  estén completadas y revisadas. En producción, si no vale `true`, las páginas
  legales muestran un aviso claro de que el sitio no está listo para publicarse.
  Si vale `false`, no debe haber pagos reales activos.
- `VITE_SHOW_DEMO_CASES`: permite mostrar casos demo en producción si vale
  `true`. En desarrollo se muestran por defecto salvo que valga `false`.
- `CHECKOUT_ENABLED`: espejo server-side para permitir o bloquear la creación
  real de sesiones en `/api/create-checkout-session`.

Si `VITE_FORMSPREE_ENDPOINT` no existe, el formulario solo simula el envío en
desarrollo. En producción muestra un aviso de configuración y no redirige a
`/gracias` con un falso éxito.

## Variables De Entorno Para Stripe Y Calendly

En cliente solo se documentan y usan variables públicas `VITE_`. Las claves
secretas de Stripe deben vivir únicamente en servidor, funciones serverless o
backend propio, y nunca deben exponerse en Vite.

Variables server-side necesarias para Stripe:

- `CHECKOUT_ENABLED`: espejo server-side para permitir o bloquear la creación
  real de sesiones en `/api/create-checkout-session`.
- `LEGAL_CONTENT_READY`: espejo server-side para bloquear Stripe en producción
  si las páginas legales no están completadas y revisadas.
- `STRIPE_SECRET_KEY`: clave secreta de Stripe.
- `STRIPE_WEBHOOK_SECRET`: secreto de firma del webhook.
- `STRIPE_PRICE_VALUATION`: Price ID de la Valoración Nutricional.
- `STRIPE_PRICE_PERSONALIZED`: Price ID del Plan Personalizado.
- `STRIPE_PRICE_ACCOMPANIMENT`: Price ID del Plan con Acompañamiento.

Stripe metadata no debe incluir datos clínicos del animal. Solo se permite
enviar identificadores comerciales y de atribución como `planKey`, `planName`,
UTMs, click IDs, landing page, referrer e identificador interno del intento de
checkout.

Los precios no se envían desde cliente. Cada plan se valida contra una allowlist
en `/api/create-checkout-session` y se resuelve con variables `STRIPE_PRICE_*`
en servidor.

## Stripe CLI Y Webhooks

Para probar el webhook en local con Vercel, ejecuta la app con `vercel dev` y
en otra terminal:

```bash
stripe listen --forward-to localhost:3000/api/stripe-webhook
```

Usa el `whsec_...` que devuelve Stripe CLI como `STRIPE_WEBHOOK_SECRET`.

Para disparar un evento de prueba:

```bash
stripe trigger checkout.session.completed
```

En Vercel, los handlers viven en `/api/create-checkout-session` y
`/api/stripe-webhook`. Si se despliega en Netlify, habrá que adaptar estos
handlers a Netlify Functions y mantener la lectura de raw body para verificar la
firma del webhook.

Calendly debe recibir como máximo datos de contacto y atribución. La información
clínica sensible debe enviarse por el cuestionario nutricional a Formspree,
endpoint propio o backend futuro.

## Rutas

- `/`
- `/planes`
- `/contratar`
- `/pago-completado`
- `/pago-cancelado`
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

- Backend clínico.
- Stripe y Calendly pueden estar pendientes de configuración o en integración,
  según variables de entorno.
- Base de datos persistente de fulfillment. El webhook deja una abstracción
  `fulfillCheckoutSession(session)` preparada para email interno, base de datos
  futura o CRM.
- Área privada.
- Login.
- Ecommerce.
- Base de datos clínica.
- Automatizaciones avanzadas.

## Integraciones Preparadas

- Formulario listo para conectar a Formspree o backend propio.
- Integración reutilizable de Calendly por plan, con fallback claro si falta URL.
- Stripe Checkout Sessions con endpoint serverless en
  `api/create-checkout-session.ts`.
- Webhook de Stripe en `api/stripe-webhook.ts` para confirmar pagos.
- Capa de tracking neutral en `src/lib/analytics.ts`, preparada para Plausible,
  Google Analytics o PostHog.
- `src/lib/checkout.ts` inicia la sesión de Stripe desde cliente sin exponer
  claves secretas.

No se piden datos de tarjeta dentro de la web. La contratación debe hacerse con
Stripe Checkout alojado.

## Assets Y Contenido

- La home usa imágenes propias/locales en `public/images/`, incluyendo
  `/images/kathia-vet-web.jpg` para la sección Sobre Kathia y assets JPG del
  hero.
- También hay placeholders SVG propios para futuras sustituciones visuales.
- No se usan imágenes externas con copyright.
- No hay testimonios reales inventados.
- Los casos demo están marcados como demo visual y no deben presentarse como
  testimonios reales.
- Las páginas legales contienen marcadores editables `[COMPLETAR: ...]` y
  requieren revisión profesional antes de publicar en producción.

## Estados De Integración Y Fallbacks

`src/lib/integrations.ts` expone `getIntegrationStatus()` para centralizar el
estado de Stripe, Calendly, formulario y legales. La web debe fallar de forma
explícita:

- Sin Stripe configurado: mostrar “La contratación online no está configurada
  todavía.” y no activar CTAs de pago.
- Sin Calendly por plan: mostrar “La agenda online no está configurada para
  este plan.”.
- Sin endpoint de formulario en producción: mostrar “El formulario no está
  configurado para recibir cuestionarios.” y no redirigir a `/gracias`.
- Con legales pendientes y checkout activo: mostrar “No se puede activar la
  contratación real hasta completar los textos legales.” y bloquear pagos reales.

En desarrollo se pueden revisar pantallas con avisos visibles, pero los falsos
éxitos no deben existir en producción.

## Tests Manuales Del Funnel

- Sin Stripe: `VITE_CHECKOUT_ENABLED=true` y `VITE_STRIPE_CONFIGURED=false`.
  Verifica que `/planes` y `/contratar?plan=valuation` no muestran pago activo y
  enseñan el mensaje de contratación no configurada.
- Con Stripe: `VITE_CHECKOUT_ENABLED=true`, `VITE_STRIPE_CONFIGURED=true`,
  `VITE_LEGAL_CONTENT_READY=true`, `CHECKOUT_ENABLED=true`,
  `LEGAL_CONTENT_READY=true` y variables `STRIPE_*` completas. Verifica que
  “Pagar con Stripe” abre Checkout alojado.
- Sin Calendly: deja vacío `VITE_CALENDLY_URL_VALUATION`. Verifica que
  `/pago-completado?plan=valuation` y el cuestionario muestran el fallback de
  agenda no configurada para ese plan.
- Sin Form endpoint: deja vacío `VITE_FORMSPREE_ENDPOINT` y prueba build/preview
  en modo producción. El cuestionario debe bloquear el envío real y no llegar a
  `/gracias`.
- Legales pendientes: `VITE_CHECKOUT_ENABLED=true`,
  `VITE_STRIPE_CONFIGURED=true` y `VITE_LEGAL_CONTENT_READY=false`. En
  producción el botón de pago debe quedar bloqueado; el endpoint `/api` también
  debe rechazar la creación de sesión si `LEGAL_CONTENT_READY` no vale `true`.
- Checkout cancelado: abre `/pago-cancelado?plan=valuation` y comprueba que no
  crea lead falso, solo permite volver a planes o intentarlo de nuevo.
- Pago completado: abre `/pago-completado?session_id=cs_test_123&plan=valuation`
  y verifica que no afirma fulfillment de servidor; solo continúa con
  cuestionario y Calendly.
- Pago completado sin sesión: abre `/pago-completado?plan=valuation` y verifica
  que la página no marca el plan como pagado ni permite continuar al
  cuestionario.
- Cuestionario enviado: con endpoint real configurado, envía un cuestionario y
  verifica la redirección a `/gracias?plan=...&questionnaire=sent`.
- Urgencia no aceptada: intenta enviar el cuestionario sin aceptar el aviso de
  urgencias. Debe mostrar validación y no enviar.
- Urgencia aceptada: acepta privacidad y urgencias. El envío solo debe avanzar
  si el endpoint de formulario está configurado o estás en desarrollo con aviso
  visible.

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
- Configurar Stripe Checkout Sessions y webhook en producción.
- Configurar URLs reales de Calendly por plan.
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
