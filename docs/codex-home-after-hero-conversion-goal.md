# Goal: Optimizar home VetKathia desde después del hero sin tocar hero ni sección posterior

## Objetivo

Rediseñar la parte media y final de la home de VetKathia para reducir longitud, redundancia y scroll mobile, sin tocar el hero ni la sección inmediatamente posterior al hero.

La home debe contar este storytelling:

necesidad → revisión del caso → estrategia → planes → confianza → FAQ

## Restricción crítica de alcance

NO tocar:

1. `HeroPremium`
2. El hero actual visual, layout, copy, CTAs, imagen, spacing o comportamiento.
3. La sección inmediatamente posterior al hero, actualmente el bloque de método / seguridad con el mensaje tipo:
   “Primero el caso. Después la pauta.”
   o
   “Primero seguridad. Después la pauta.”

Esta sección también debe mantenerse como está en diseño, copy, layout, spacing y comportamiento.

Si para cumplir otro punto parece necesario modificar el hero o la sección inmediatamente posterior, detenerse y reportarlo antes de cambiar nada.

El trabajo debe empezar desde la sección:

“No hay una única dieta correcta.”

y continuar hacia abajo.

## Problema actual

La parte posterior de la home sigue siendo demasiado larga en mobile y repite demasiadas veces:

- revisamos el caso;
- sin improvisar;
- criterio veterinario;
- edad, salud, digestión y rutina;
- no receta genérica;
- transición segura;
- para quién encaja;
- qué pasa tras solicitar.

También hay demasiados patrones visuales similares: cards, chips, bordes rosas, iconos circulares y cajas anidadas.

## Nuevo orden de home respetando hero y sección posterior

Mantener intactos:

1. HeroPremium.
2. Sección posterior al hero / método compacto actual.

Reordenar y optimizar solo desde ahí:

3. Diferenciación compacta: “No hay una única dieta correcta.”
4. Planes y precios.
5. Confianza: Sobre Kathia + límites claros.
6. Qué pasa tras solicitar / método online reducido.
7. FAQ.
8. CTA final.
9. Footer.

## Reglas mobile-first

En mobile, después del hero y la sección posterior actual, deben aparecer pronto:

1. “No hay una única dieta correcta.”
2. Planes y precios.

No debe aparecer antes de planes:

- RiskSection larga.
- “Para quién” como sección larga.
- “En pocas palabras”.
- Método online largo.
- Grids de cards repetitivas.

## Diferenciación compacta

Mantener como bloque separado porque es diferencial estratégico.

Eyebrow:

DEPENDE DEL CASO

Título:

No hay una única dieta correcta.

Texto:

Puede ser una mejora gradual, comida cocinada, mixta, BARF o natural comercial. La pauta adecuada no es la más popular: es la que encaja con su salud, su digestión y tu rutina.

Chips:

- Mejora gradual
- Cocinada
- Mixta
- BARF
- Natural comercial

Diseño:

- sección corta;
- no card grande tipo dashboard;
- no grid de factores;
- no CTA local;
- no llamarlo no-BARF en UI;
- puede usar DietStrategyVisual solo si queda compacto y no parece SaaS/dashboard;
- no borrar DietStrategyVisual sin necesidad.

## Planes y precios

Mover justo después de la diferenciación compacta.

Mantener precios:

- Valoración Nutricional — 59 €
- Plan Personalizado — 89 €
- Plan con Acompañamiento — 129 €

Mantener mensaje:

- no hay pago automático;
- si dudas, puedes enviar el caso.

Mobile:

Cada plan debe mostrar solo:

- nombre;
- precio;
- para quién;
- 3 bullets principales;
- CTA.

El resto debe ir en `<details>` o accordion.

Añadir banda compacta cerca de planes:

Especialmente útil en: gatos · seniors · digestión sensible · transición segura · dudas sobre cantidades

Esta banda sustituye “Para quién” como sección larga.

## Secciones a retirar de home principal

Retirar de HomePage como secciones largas:

- RiskSection.
- “Puede encajar contigo si…”.
- “En pocas palabras”.
- Método online largo antes de planes.

No borrar RiskSection.tsx.

No borrar componentes salvo que quede claro que no tienen referencias ni utilidad futura.

## Método online reducido

Mover después de planes o fusionar con “Qué pasa tras solicitar”.

Contenido máximo:

1. Envías el caso.
2. Reviso la información.
3. Te indico el mejor camino.
4. Recibes valoración, pauta o plan según corresponda.

En mobile:

- no mockup largo;
- si ocupa demasiado, ocultar mockup o simplificar;
- no repetir la sección posterior al hero.

## Sobre Kathia

Mantener después de planes.

En mobile:

- reducir copy;
- mostrar 2-3 ideas clave:
  - veterinaria;
  - nutrición natural con criterio;
  - sin radicalismos;
  - límites claros.

No inventar:

- número colegial;
- años de experiencia;
- casos atendidos;
- reseñas;
- formación.

## FAQ

Mantener FAQ en home, pero reducir si alarga demasiado.

Si se reduce FAQ visible, ajustar structured data para que solo incluya preguntas visibles en home.

## CTA final

Mantener, pero simple y ligero.

Debe reforzar:

- solicitar valoración;
- no pago automático;
- revisión manual del caso.

## Color y fluidez

Respetar el hero y la sección posterior tal como están.

Desde “No hay una única dieta correcta” hacia abajo, usar una secuencia coherente:

- No hay una dieta: crema claro.
- Planes: blush suave.
- Sobre Kathia: crema/blanco editorial.
- Método online reducido: blanco.
- FAQ: blanco.
- CTA final: blush suave.

El rosa debe mantenerse como acento de marca y reaparecer en planes/CTA final.

Reducir:

- bordes rosas excesivos;
- chips innecesarios;
- iconos circulares repetidos;
- cajas anidadas.

## Sistema visual

Card.tsx:

- no tocar si `interactive` ya controla hover;
- solo ajustar si aparece hover global no deseado.

Section.tsx:

- añadir `spacing` opcional si ayuda:
  - normal
  - compact
  - tight
- mantener default actual para no romper otras páginas.

SectionHeading.tsx:

- añadir variante o tamaño compacto opcional;
- mantener default actual;
- evitar que todos los bloques parezcan hero.

## Archivos a revisar

- `src/pages/HomePage.tsx`
- `src/components/sections/DigitalProcessMockup.tsx`
- `src/components/sections/RiskSection.tsx`
- `src/components/ui/Card.tsx`
- `src/components/ui/Section.tsx`
- `src/components/ui/SectionHeading.tsx`
- `src/data/home.ts`
- `src/data/plans.ts`
- `src/data/structuredData.ts`
- `src/styles/globals.css`

## Archivos o partes que NO deben modificarse

No modificar salvo que sea estrictamente inevitable y se reporte antes:

- `src/components/sections/HeroPremium.tsx`
- JSX, copy, layout o estilos de la sección inmediatamente posterior a `HeroPremium` en `HomePage.tsx`.

Si hay que tocar `HomePage.tsx`, preservar intacto el JSX y clases de:

1. `HeroPremium`
2. la primera sección posterior a `HeroPremium`

## Restricciones

No inventar:

- testimonios;
- cifras;
- credenciales;
- claims médicos;
- promesas de curación.

No convertir la web en:

- ecommerce;
- SaaS genérico;
- blog de recetas;
- web infantil.

Mantener:

- tono profesional;
- cálido;
- premium;
- claro;
- no alarmista;
- mobile-first;
- confianza veterinaria.

## Validación

Usar package manager detectado por lockfile.

En este repo se detecta `pnpm-lock.yaml`, por tanto ejecutar:

- `pnpm lint`
- `pnpm build`

Si build falla por dependencia opcional de Rolldown/Vite:

- reinstalar dependencias según lockfile;
- volver a ejecutar build;
- documentar exactamente el error si persiste.

## Criterios de aceptación

- HeroPremium no fue modificado.
- La sección inmediatamente posterior al hero no fue modificada.
- En mobile, planes aparece pronto después del hero, la sección posterior actual y el bloque “No hay una única dieta correcta”.
- La narrativa queda clara: necesidad → revisión del caso → estrategia → planes → confianza → FAQ.
- La home se siente menos como sucesión de cards y más como página editorial premium.
- RiskSection.tsx permanece en el proyecto aunque no se use en home.
- DietStrategyVisual no se borra sin necesidad.
- “Para quién” ya no aparece como sección larga.
- “En pocas palabras” ya no aparece en home visual.
- Los CTAs principales llevan a `/solicitar-valoracion`.
- “Ver planes y precios”, si ya existe en el hero, no se modifica salvo que estuviera roto y se reporte antes.
- FAQ visible coincide con structured data.
- No se modifican precios, credenciales, testimonios, claims médicos ni promesas.
- `pnpm lint` pasa.
- `pnpm build` pasa o queda documentado bloqueo externo exacto.
