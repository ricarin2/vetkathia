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
tráfico externo -> home/planes -> contratar plan -> pago seguro con Stripe
-> cuestionario nutricional -> cita online con Calendly -> servicio contratado
```

La web muestra planes y precios antes del cuestionario. El cuestionario recoge
la información inicial del caso una vez contratado el servicio y permite
responder manualmente con la valoración, pauta o acompañamiento que corresponda.

## Flujo De Contratación Online

1. La persona llega desde redes sociales, Google, buscadores o IA.
2. Entiende qué hace VetKathia y compara los planes.
3. Elige Valoración Nutricional, Plan Personalizado o Plan con Acompañamiento.
4. Revisa `/contratar`, acepta condiciones y confirma el plan.
5. Paga online mediante Stripe, usando Payment Links o Checkout Sessions.
6. Completa el cuestionario nutricional en un formulario propio, Formspree o
   backend futuro.
7. Agenda consulta o revisión con Calendly.
8. Recibe la valoración, plan o acompañamiento según el servicio contratado.

Stripe y Calendly se activan mediante variables de entorno. Si faltan enlaces,
claves o textos legales, la web debe mostrar un estado claro de configuración y
no simular una contratación correcta. No se deben pedir ni procesar datos de
tarjeta directamente en React.

Si se usa Payment Links, el cliente solo redirige a URLs públicas configuradas
por plan. Si se usa Checkout Sessions, el cliente inicia el checkout con
`POST /api/create-checkout-session`, que resuelve el Price ID en servidor y
devuelve la URL alojada de Stripe. En ese modo, el cumplimiento real del
servicio depende del webhook `POST /api/stripe-webhook`, no de la página de
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

Entorno validado:

- Node.js `v25.9.0`.
- pnpm `11.0.6`, fijado en `package.json` con `packageManager`.

Instalación limpia recomendada:

```bash
rm -rf node_modules
pnpm install --frozen-lockfile
```

Instalar dependencias en desarrollo:

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

No subas ni empaquetes `node_modules`. Está ignorado en `.gitignore`, pero los
ZIPs futuros deben generarse desde el repositorio limpio y reconstruir
dependencias con `pnpm install --frozen-lockfile`.

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

```bash
VITE_SITE_URL=
VITE_CONTACT_EMAIL=
VITE_FORMSPREE_ENDPOINT=

VITE_CHECKOUT_ENABLED=
VITE_CHECKOUT_MODE=payment_links
VITE_STRIPE_PAYMENT_LINK_VALUATION=
VITE_STRIPE_PAYMENT_LINK_PERSONALIZED=
VITE_STRIPE_PAYMENT_LINK_ACCOMPANIMENT=

VITE_CALENDLY_URL_VALUATION=
VITE_CALENDLY_URL_PERSONALIZED=
VITE_CALENDLY_URL_ACCOMPANIMENT=

VITE_LEGAL_CONTENT_READY=
VITE_REQUIRE_PAYMENT_BEFORE_FORM=true
VITE_CALENDLY_ENABLED=
VITE_CALENDLY_EMBED_MODE=inline
VITE_ANALYTICS_ENABLED=false

# Optional client-side flag for Checkout Sessions mode.
VITE_CHECKOUT_API_URL=/api/create-checkout-session
VITE_STRIPE_CONFIGURED=false

# Server-side only. Do not prefix these with VITE_.
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
- `VITE_CONTACT_EMAIL`: email público de contacto legal/operativo. Si está
  vacío, el footer muestra un texto neutro y la contratación real queda
  bloqueada aunque Stripe esté configurado.
- `VITE_FORMSPREE_ENDPOINT`: endpoint futuro para enviar solicitudes a
  Formspree o a un backend propio.
- `VITE_CALENDLY_ENABLED`: activa la agenda online cuando vale `true`.
- `VITE_CALENDLY_URL_VALUATION`, `VITE_CALENDLY_URL_PERSONALIZED` y
  `VITE_CALENDLY_URL_ACCOMPANIMENT`: URLs públicas de Calendly por plan.
- `VITE_CHECKOUT_ENABLED`: activa el flujo de checkout cuando vale `true`.
- `VITE_CHECKOUT_MODE`: usar `payment_links` para Stripe Payment Links o
  `checkout_sessions` para crear sesiones desde backend/serverless.
- `VITE_STRIPE_PAYMENT_LINK_VALUATION`,
  `VITE_STRIPE_PAYMENT_LINK_PERSONALIZED` y
  `VITE_STRIPE_PAYMENT_LINK_ACCOMPANIMENT`: enlaces públicos de Stripe Payment
  Link por plan. No guardar URLs reales de producción en el repositorio.
- `VITE_CHECKOUT_API_URL`: endpoint serverless que crea la sesión de Stripe si
  se usa `checkout_sessions`.
- `VITE_STRIPE_CONFIGURED`: marcar como `true` solo cuando el endpoint de
  checkout y las variables server-side de Stripe estén configurados para
  `checkout_sessions`.
- `VITE_REQUIRE_PAYMENT_BEFORE_FORM`: puede exigir pago antes del formulario si
  vale `true`.
- `VITE_ANALYTICS_ENABLED`: bandera preparada para conectar analítica más
  adelante.
- `VITE_LEGAL_CONTENT_READY`: mantener en `false` hasta que las páginas legales
  estén completadas y revisadas. Aunque valga `true`, la contratación real se
  bloquea si faltan email/contacto, responsable, privacidad, condiciones de
  cancelación/reembolso o quedan marcadores `[COMPLETAR: ...]`.
- Los casos demo solo pueden mostrarse en desarrollo. En producción no se
  publican casos sin consentimiento explícito.
- `CHECKOUT_ENABLED`: espejo server-side para permitir o bloquear la creación
  real de sesiones en `/api/create-checkout-session`.

Si `VITE_FORMSPREE_ENDPOINT` no existe, el formulario solo simula el envío en
desarrollo. En producción muestra un aviso de configuración y no redirige a
`/gracias` con un falso éxito.

## Variables De Entorno Para Stripe Y Calendly

En cliente solo se documentan y usan variables públicas `VITE_`. Las claves
secretas de Stripe deben vivir únicamente en servidor, funciones serverless o
backend propio, y nunca deben exponerse en Vite.

Variables server-side necesarias si se usa Stripe Checkout Sessions:

- `CHECKOUT_ENABLED`: espejo server-side para permitir o bloquear la creación
  real de sesiones en `/api/create-checkout-session`.
- `LEGAL_CONTENT_READY`: espejo server-side para bloquear Stripe en producción
  si las páginas legales no están completadas y revisadas.
- `LEGAL_CONTACT_EMAIL` o `CONTACT_EMAIL`: email/canal server-side de contacto
  legal si se quiere separar del valor público `VITE_CONTACT_EMAIL`.
- `STRIPE_SECRET_KEY`: clave secreta de Stripe.
- `STRIPE_WEBHOOK_SECRET`: secreto de firma del webhook.
- `STRIPE_PRICE_VALUATION`: Price ID de la Valoración Nutricional.
- `STRIPE_PRICE_PERSONALIZED`: Price ID del Plan Personalizado.
- `STRIPE_PRICE_ACCOMPANIMENT`: Price ID del Plan con Acompañamiento.

Stripe metadata no debe incluir datos clínicos del animal. Solo se permite
enviar identificadores comerciales y de atribución como `planKey`, `planName`,
UTMs, click IDs, landing page, referrer e identificador interno del intento de
checkout.

En Checkout Sessions, los precios no se envían desde cliente. Cada plan se
valida contra una allowlist en `/api/create-checkout-session` y se resuelve con
variables `STRIPE_PRICE_*` en servidor.

## Stripe CLI Y Webhooks

Con Stripe Payment Links, la confirmación del pago se revisa en Stripe Dashboard
o mediante automatizaciones externas de Stripe. Para fulfillment automatizado
con confirmación server-side, usar Checkout Sessions y webhook.

Para probar el webhook de Checkout Sessions en local con Vercel, ejecuta la app
con `vercel dev` y en otra terminal:

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
- Stripe Payment Links por plan mediante variables públicas
  `VITE_STRIPE_PAYMENT_LINK_*`.
- Stripe Checkout Sessions opcional con endpoint serverless en
  `api/create-checkout-session.ts`.
- Webhook de Stripe en `api/stripe-webhook.ts` para confirmar pagos si se usa
  Checkout Sessions.
- Capa de tracking neutral en `src/lib/analytics.ts`, preparada para Plausible,
  Google Analytics o PostHog.
- `src/lib/checkout.ts` redirige a Stripe desde cliente sin exponer claves
  secretas.

No se piden datos de tarjeta dentro de la web. La contratación debe hacerse con
Stripe alojado.

## Assets Y Contenido

- La home usa imágenes propias/locales en `public/images/`, incluyendo
  `/images/kathia-vet-web.jpg` para la sección Sobre Kathia y assets JPG del
  hero.
- También hay placeholders SVG propios para futuras sustituciones visuales.
- No se usan imágenes externas con copyright.
- No hay testimonios reales inventados.
- Los casos demo están marcados como demo visual y no deben presentarse como
  testimonios reales. Solo pueden mostrarse en desarrollo.
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
- Con legales, contacto o políticas pendientes y checkout activo: bloquear pagos
  reales y mostrar un mensaje claro de configuración legal pendiente.

En desarrollo se pueden revisar pantallas con avisos visibles, pero los falsos
éxitos no deben existir en producción.

## Tests Manuales Del Funnel

- Sin Stripe: `VITE_CHECKOUT_ENABLED=true`, `VITE_CHECKOUT_MODE=payment_links` y
  enlaces `VITE_STRIPE_PAYMENT_LINK_*` vacíos. Verifica que `/planes` y
  `/contratar?plan=valuation` no muestran pago activo y enseñan el mensaje de
  contratación no configurada.
- Con Stripe Payment Links: `VITE_CHECKOUT_ENABLED=true`,
  `VITE_CHECKOUT_MODE=payment_links`, `VITE_LEGAL_CONTENT_READY=true` y enlaces
  `VITE_STRIPE_PAYMENT_LINK_*` completos. Verifica que “Pagar con Stripe”
  redirige al enlace alojado de Stripe del plan.
- Con Stripe Checkout Sessions: `VITE_CHECKOUT_ENABLED=true`,
  `VITE_CHECKOUT_MODE=checkout_sessions`, `VITE_STRIPE_CONFIGURED=true`,
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
  `VITE_LEGAL_CONTENT_READY=false` y Stripe configurado. En producción el botón
  de pago debe quedar bloqueado; si se usa `/api`, el endpoint también debe
  rechazar la creación de sesión si `LEGAL_CONTENT_READY` no vale `true`.
- Contacto o políticas pendientes: prueba con `VITE_LEGAL_CONTENT_READY=true`
  pero `VITE_CONTACT_EMAIL` vacío o marcadores `[COMPLETAR: ...]` en
  `src/data/legal.ts`. La contratación debe seguir bloqueada.
- Checkout cancelado: abre `/pago-cancelado?plan=valuation` y comprueba que no
  crea lead falso, solo permite volver a planes o intentarlo de nuevo.
- Pago completado: abre `/pago-completado?session_id=cs_test_123&plan=valuation`
  y verifica que no afirma fulfillment de servidor; solo continúa con
  cuestionario y Calendly.
- Pago completado con Payment Links: abre `/pago-completado?plan=valuation` y
  verifica que la página permite continuar al cuestionario sin afirmar
  verificación server-side.
- Cuestionario enviado: con endpoint real configurado, envía un cuestionario y
  verifica la redirección a `/gracias?plan=...&questionnaire=sent`.
- Urgencia no aceptada: intenta enviar el cuestionario sin aceptar el aviso de
  urgencias. Debe mostrar validación y no enviar.
- Urgencia aceptada: acepta privacidad y urgencias. El envío solo debe avanzar
  si el endpoint de formulario está configurado o estás en desarrollo con aviso
  visible.

## Checklist Antes De Publicar

- Stripe configurado en el modo elegido: Payment Links por plan o Checkout
  Sessions con Prices server-side.
- Calendly configurado por plan.
- Formulario configurado con `VITE_FORMSPREE_ENDPOINT` o backend real.
- Legales completos y revisados: responsable, privacidad, cookies, condiciones,
  cancelación, cambios y reembolso.
- Email/contacto legal visible y configurado.
- Webhook de Stripe probado si se usa Checkout Sessions.
- Build limpio con `pnpm lint` y `pnpm build`.
- Search Console configurado.
- Sitemap enviado.

## Próximos Pasos

- Conectar formulario real.
- Configurar Stripe Payment Links por plan o Checkout Sessions y webhook en
  producción.
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
