# VetKathia — Project Instructions

## Brand
VetKathia es una marca personal veterinaria especializada en nutrición natural para perros y gatos.

El foco de la marca es:
- Nutrición natural segura.
- Planes personalizados.
- Perros y gatos.
- Animales senior.
- Gatos.
- Patologías.
- Transición segura.
- Prevención.
- Acompañamiento veterinario.

## Positioning
VetKathia no es una cuenta solo BARF.
VetKathia es una marca veterinaria que ayuda a tutores a mejorar la alimentación de su perro o gato con criterio profesional.

Mensaje clave:
“Nutrición natural veterinaria para perros y gatos que necesitan un plan de alimentación seguro y personalizado.”

## UX Principles
- Mobile-first.
- Claridad antes que decoración.
- Confianza antes que espectáculo.
- Conversión sin presión agresiva.
- CTA principal visible.
- Formularios simples.
- Lenguaje claro.
- No usar claims médicos absolutos.
- No prometer curas.
- No sustituir urgencias veterinarias.
- No sustituir al veterinario habitual en casos clínicos complejos.

## Visual Design
- Premium.
- Cálido.
- Limpio.
- Veterinario.
- Cercano.
- Profesional.
- Fondo blanco cálido.
- Rosa empolvado.
- Beige.
- Marrón oscuro.
- Coral suave.
- Mucho espacio en blanco.
- Bordes redondeados.
- Sombras suaves.
- Tarjetas limpias.
- Iconografía minimalista.

## Color Tokens
- Fondo principal: #FFF9F6
- Fondo alternativo: #FFF1F5
- Primario: #E83E73
- Primario oscuro: #BE185D
- Acento suave: #FF8FB1
- Texto principal: #3B2724
- Texto secundario: #7A625C
- Borde suave: #F7B9C9
- Blanco: #FFFFFF

## Typography
- Titulares: serif elegante, preferiblemente Cormorant Garamond o Playfair Display.
- Cuerpo: sans legible, preferiblemente Inter.
- Mantener excelente legibilidad en móvil.

## Technical
- React + Vite + TypeScript.
- Tailwind CSS.
- Componentes modulares.
- Accesibilidad básica.
- Buen contraste.
- Formularios validados.
- Código mantenible.
- No introducir backend complejo.
- Integrar pagos mediante Stripe Payment Links o Stripe Checkout Sessions.
- Nunca manejar tarjetas directamente en React.
- Nunca exponer claves secretas en cliente.
- Calendly se usa para reserva de cita online posterior al pago o dentro del
  onboarding.
- No usar imágenes con copyright.
- Preparar placeholders para imágenes.

## Git Workflow
- Trabajar siempre sobre `main`; no crear ramas nuevas para este proyecto salvo
  petición explícita.
- Después de completar cambios solicitados, ejecutar las validaciones
  correspondientes, hacer commit y subir los cambios a `origin/main`.
- No dejar cambios locales sin subir al terminar una iteración, salvo que el
  usuario pida explícitamente no hacer commit o no hacer push.

## Conversion
Cada página debe responder:
1. Qué hace VetKathia.
2. Para quién es.
3. Cómo funciona.
4. Qué recibe la persona.
5. Qué tiene que hacer ahora.

## Copywriting
Tono:
- Claro.
- Profesional.
- Cercano.
- Tranquilizador.
- No radical.
- No alarmista.

Frases que sí usamos:
- Natural no significa improvisado.
- No es solo BARF.
- Depende del caso.
- Comida real, pero formulada.
- No es solo la edad.
- Tu gato no es un perro pequeño.
- Antes de cambiar, revisa.
- Una receta de internet no siempre es una dieta completa.

Frases que evitamos:
- El pienso mata.
- BARF es la única opción.
- Cura garantizada.
- Resultado asegurado.
- Los veterinarios no saben.
- No necesitas veterinario.
- Esta receta sirve para todos.

## Scope Actual
La versión actual debe validar:
Redes sociales / Google / IA → web → planes → contratar → pago seguro con
Stripe → cuestionario nutricional → cita online con Calendly → prestación del
servicio según el plan contratado.

No implementar todavía:
- login;
- área privada;
- ecommerce;
- blog complejo;
- curso;
- base de datos clínica;
- automatizaciones avanzadas.

## Current Implementation Notes
- El formulario solo puede simular envío en desarrollo si no existe
  `VITE_FORMSPREE_ENDPOINT`. En producción debe bloquear el envío y mostrar un
  error claro.
- Stripe Payment Links se configuran por plan con `VITE_STRIPE_PAYMENT_LINK_*`.
- Si se usa Checkout Sessions, el endpoint serverless de Stripe debe respetar
  `CHECKOUT_ENABLED`, `LEGAL_CONTENT_READY` y las variables `STRIPE_PRICE_*`.
- No exponer `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` ni otras claves
  secretas en Vite.
- Los datos clínicos del animal no deben enviarse a Stripe metadata ni a
  Calendly.
- Analytics está preparado con una capa neutral en `src/lib/analytics.ts`.
- No hay login, área privada ni base de datos clínica.
- No se manejan datos de tarjeta en React.
- Three.js no está activo en la versión actual; se prioriza un fondo CSS ligero
  por rendimiento.
- Las páginas legales son placeholders y requieren revisión profesional antes de
  publicar en producción.
