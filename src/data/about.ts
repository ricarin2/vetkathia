export const aboutCredentials = {
  education: [],
  focus: 'Nutrición natural para perros y gatos',
  licenseNumber: '6552476',
  publicExperience: '',
  role: 'Veterinaria',
}


export type KathiaProfile = {
  kathiaPhotoSrc?: string
  kathiaPhotoAlt?: string
  collegiateNumber?: string
}

export const kathiaProfile: KathiaProfile = {
  kathiaPhotoSrc: '/images/kathia-vet-web.jpg',
  kathiaPhotoAlt: 'Kathia, veterinaria de VetKathia',
  collegiateNumber: aboutCredentials.licenseNumber,
}

export const visibleAboutCredentials = [
  aboutCredentials.role
    ? {
        label: 'Perfil profesional',
        value: aboutCredentials.role,
      }
    : null,
  aboutCredentials.focus
    ? {
        label: 'Área de trabajo',
        value: aboutCredentials.focus,
      }
    : null,
  aboutCredentials.licenseNumber
    ? {
        label: 'Número colegial',
        value: aboutCredentials.licenseNumber,
      }
    : null,
  aboutCredentials.publicExperience
    ? {
        label: 'Experiencia',
        value: aboutCredentials.publicExperience,
      }
    : null,
].filter(Boolean) as Array<{ label: string; value: string }>

export const aboutTrustPillars = [
  {
    text: 'Reviso especie, edad, salud, digestión, rutina y alimentación actual antes de recomendar cambios.',
    title: 'Enfoque veterinario',
  },
  {
    text: 'No trabajo desde una dieta única ni desde mensajes extremos. Natural no significa improvisado.',
    title: 'Sin radicalismos',
  },
  {
    text: 'El plan debe poder aplicarse en casa, con cantidades, transición y ajustes según el caso.',
    title: 'Planes adaptados',
  },
  {
    text: 'No sustituye urgencias ni el seguimiento clínico habitual cuando hay patologías complejas.',
    title: 'Límites del servicio',
  },
]

export const aboutBlocks = [
  {
    items: [
      'Valoro especie, etapa de vida, salud, alimentación actual y rutina familiar.',
      'Busco planes realistas, seguros y aplicables en el día a día.',
      'Trabajo sin radicalismos: natural no significa improvisado.',
    ],
    title: 'Mi enfoque',
  },
  {
    items: [
      'Perros y gatos que necesitan mejorar su alimentación.',
      'Animales senior que requieren revisar necesidades y tolerancias.',
      'Digestiones sensibles, sobrepeso, dudas con cantidades o transiciones a comida real.',
      'Casos con patologías, siempre valorando si necesitan atención clínica previa.',
    ],
    title: 'Qué tipo de casos trabajo',
  },
  {
    items: [
      'No prometo curas ni resultados garantizados.',
      'No sustituyo urgencias veterinarias ni el seguimiento de tu veterinario habitual.',
      'No uso recetas universales ni planes copiados de internet.',
    ],
    title: 'Qué no hago',
  },
  {
    items: [
      'BARF puede encajar en algunos casos, pero no es el único camino.',
      'A veces tiene más sentido una dieta cocinada, mixta, natural comercial o una transición gradual.',
      'La recomendación depende del animal, no de una moda.',
    ],
    title: 'Por qué no sigo una única dieta para todos',
  },
]
