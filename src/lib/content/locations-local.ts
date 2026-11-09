import type { Bilingual } from "@/lib/i18n";

/*
 * City-specific copy for each office page: a few short "what to know"
 * sections and a local FAQ (also emitted as FAQPage structured data).
 * Keep statements general and accurate; coverage details always depend on
 * the carrier and policy, so the copy says so where it matters.
 */

export type LocalSection = { h: string; p: string };
export type LocalFaq = { q: string; a: string };

export type LocalContent = {
  sectionsTitle: Bilingual<string>;
  sections: Bilingual<LocalSection[]>;
  faq: Bilingual<LocalFaq[]>;
};

export const LOCAL_CONTENT: Record<string, LocalContent> = {
  hialeah: {
    sectionsTitle: { en: "Insurance in Hialeah: what to know", es: "Seguros en Hialeah: lo que debe saber" },
    sections: {
      en: [
        {
          h: "Florida's minimum auto coverage is only a starting point",
          p: "Florida requires every registered vehicle to carry $10,000 in Personal Injury Protection (PIP) and $10,000 in Property Damage Liability. Bodily Injury Liability isn't required for most drivers, but without it your own savings are exposed if you cause a serious accident. Florida also has one of the highest rates of uninsured drivers in the country, so we usually recommend looking at Uninsured Motorist coverage too.",
        },
        {
          h: "Coverage for Hialeah's small businesses",
          p: "From auto repair shops and restaurants to contractors and retail stores along the city's busy commercial corridors, Hialeah runs on small businesses. We help owners put together general liability, workers' compensation, commercial auto and property coverage, and we explain which policies a landlord or client is likely to ask you for before you sign a lease or contract.",
        },
        {
          h: "Health plans with help in Spanish",
          p: "Florida has one of the largest Affordable Care Act Marketplace enrollments in the country, and many families qualify for financial help that lowers their monthly premium. Our agents walk you through the options in Spanish or English during Open Enrollment, which usually runs from November 1 to January 15, or during a Special Enrollment Period if you have a qualifying life event.",
        },
      ],
      es: [
        {
          h: "La cobertura mínima de auto en Florida es solo el punto de partida",
          p: "Florida exige que todo vehículo registrado tenga $10,000 de Protección contra Lesiones Personales (PIP) y $10,000 de Responsabilidad por Daños a la Propiedad. La Responsabilidad por Lesiones Corporales no es obligatoria para la mayoría de los conductores, pero sin ella sus ahorros quedan expuestos si causa un accidente grave. Florida también tiene una de las tasas más altas de conductores sin seguro del país, por lo que normalmente recomendamos considerar la cobertura contra Conductores sin Seguro.",
        },
        {
          h: "Coberturas para los pequeños negocios de Hialeah",
          p: "Desde talleres de mecánica y restaurantes hasta contratistas y tiendas en las zonas comerciales más activas de la ciudad, Hialeah funciona gracias a sus pequeños negocios. Ayudamos a los dueños a armar coberturas de responsabilidad general, compensación laboral, auto comercial y propiedad, y les explicamos qué pólizas les pedirá probablemente un arrendador o cliente antes de firmar un contrato.",
        },
        {
          h: "Planes de salud con ayuda en español",
          p: "Florida tiene una de las mayores inscripciones en el Mercado de Seguros Médicos (ACA) del país, y muchas familias califican para ayuda financiera que reduce su prima mensual. Nuestros agentes le explican las opciones en español o inglés durante la Inscripción Abierta, que normalmente va del 1 de noviembre al 15 de enero, o durante un Período de Inscripción Especial si tiene un cambio de vida que califique.",
        },
      ],
    },
    faq: {
      en: [
        { q: "Do I need an appointment at the Hialeah office?", a: "No. Our Hialeah office welcomes walk-ins Monday to Friday, 9:30 AM to 7:00 PM. You can also call ahead or start your quote online." },
        { q: "Can you help if I need an SR-22 or have a suspended license?", a: "Yes. We work with carriers that file SR-22 and FR-44 certificates with the state and can tell you what's needed to get your license reinstated and your vehicle insured." },
        { q: "Can I do everything in Spanish?", a: "Yes. Our whole team is bilingual, so quotes, paperwork, policy changes and claims questions can all be handled in Spanish." },
      ],
      es: [
        { q: "¿Necesito una cita para visitar la oficina de Hialeah?", a: "No. Nuestra oficina de Hialeah atiende sin cita de lunes a viernes, de 9:30 AM a 7:00 PM. También puede llamar antes o comenzar su cotización en línea." },
        { q: "¿Pueden ayudarme si necesito un SR-22 o tengo la licencia suspendida?", a: "Sí. Trabajamos con aseguradoras que presentan los certificados SR-22 y FR-44 ante el estado y le explicamos qué necesita para recuperar su licencia y asegurar su vehículo." },
        { q: "¿Puedo hacer todo en español?", a: "Sí. Todo nuestro equipo es bilingüe, así que las cotizaciones, los documentos, los cambios de póliza y las preguntas sobre reclamos se pueden atender en español." },
      ],
    },
  },

  doral: {
    sectionsTitle: { en: "Insurance in Doral: what to know", es: "Seguros en Doral: lo que debe saber" },
    sections: {
      en: [
        {
          h: "Business insurance for a logistics hub",
          p: "Doral sits next to Miami International Airport and is one of South Florida's busiest areas for warehouses, distribution and import-export companies. Those businesses usually need more than a general liability policy: commercial auto for vans and trucks, coverage for goods in transit, commercial property for the warehouse and its contents, and workers' compensation for their crews.",
        },
        {
          h: "Condos, townhomes and HOA communities",
          p: "Many Doral residents live in condominiums and HOA communities. In a condo, the association's master policy generally covers the building itself, while an HO-6 policy covers your unit's interior, your belongings and your personal liability. We also look at loss assessment coverage, which can help pay your share if the association charges owners for a covered loss.",
        },
        {
          h: "Driving the 836, the 826 and the Turnpike",
          p: "Daily commutes on the Dolphin Expressway, the Palmetto and Florida's Turnpike mean heavy traffic and more chances of a fender-bender. Collision coverage, Uninsured Motorist coverage and rental reimbursement are worth a look if you depend on your car to get to work.",
        },
      ],
      es: [
        {
          h: "Seguros comerciales para un centro de logística",
          p: "Doral está junto al Aeropuerto Internacional de Miami y es una de las zonas del sur de Florida con más almacenes, empresas de distribución y de importación y exportación. Esos negocios suelen necesitar más que una póliza de responsabilidad general: auto comercial para camionetas y camiones, cobertura para mercancía en tránsito, propiedad comercial para el almacén y su contenido, y compensación laboral para sus empleados.",
        },
        {
          h: "Condominios, townhouses y comunidades con HOA",
          p: "Muchos residentes de Doral viven en condominios y comunidades con asociación de propietarios. En un condominio, la póliza maestra de la asociación generalmente cubre el edificio, mientras que una póliza HO-6 cubre el interior de su unidad, sus pertenencias y su responsabilidad personal. También revisamos la cobertura de evaluación por pérdidas, que puede ayudarle a pagar su parte si la asociación cobra a los propietarios por una pérdida cubierta.",
        },
        {
          h: "Manejar por la 836, la 826 y el Turnpike",
          p: "Los recorridos diarios por la Dolphin Expressway, la Palmetto y el Turnpike de Florida significan mucho tráfico y más probabilidades de un choque menor. Vale la pena considerar la cobertura de colisión, la de Conductores sin Seguro y el reembolso de auto de alquiler si depende de su carro para ir al trabajo.",
        },
      ],
    },
    faq: {
      en: [
        { q: "Is the Doral office open for walk-ins?", a: "Our Doral location meets clients by appointment only. Call (305) 341-0938 to schedule a visit, or start your quote online. For walk-ins, visit our Hialeah office." },
        { q: "Do you insure company vans, trucks and fleets?", a: "Yes. We quote commercial auto for single vehicles and fleets, including delivery vans and box trucks, and can add coverage for the cargo you carry." },
        { q: "What does an HO-6 condo policy cover?", a: "Generally the interior of your unit (such as flooring, cabinets and fixtures, depending on your association's documents), your personal belongings, your liability and additional living expenses after a covered loss. Exact coverage depends on the carrier and policy." },
      ],
      es: [
        { q: "¿La oficina de Doral atiende sin cita?", a: "Nuestra oficina de Doral atiende solo con cita previa. Llame al (305) 341-0938 para programar una visita o comience su cotización en línea. Para atención sin cita, visite nuestra oficina de Hialeah." },
        { q: "¿Aseguran camionetas, camiones y flotas de empresas?", a: "Sí. Cotizamos auto comercial para un solo vehículo o para flotas, incluidas camionetas de reparto y camiones de caja, y podemos añadir cobertura para la carga que transporta." },
        { q: "¿Qué cubre una póliza de condominio HO-6?", a: "Generalmente el interior de su unidad (como pisos, gabinetes y accesorios, según los documentos de su asociación), sus pertenencias, su responsabilidad civil y los gastos adicionales de vivienda tras una pérdida cubierta. La cobertura exacta depende de la aseguradora y de la póliza." },
      ],
    },
  },

  homestead: {
    sectionsTitle: { en: "Insurance in Homestead: what to know", es: "Seguros en Homestead: lo que debe saber" },
    sections: {
      en: [
        {
          h: "Hurricane history and your home's construction",
          p: "Homestead and Florida City were among the hardest-hit areas when Hurricane Andrew struck in 1992, and Florida's building standards became much stricter in the years that followed. Today, insurers look closely at your roof's age and how your home is built. A wind mitigation inspection that documents features like impact windows, shutters and roof-to-wall connections can lower your premium.",
        },
        {
          h: "Flood is a separate policy",
          p: "Standard homeowners policies don't cover flood damage, and much of South Miami-Dade is low-lying. Flood insurance is available through the National Flood Insurance Program and private carriers, and NFIP policies generally have a 30-day waiting period before coverage starts, so it's best not to wait until a storm is in the forecast.",
        },
        {
          h: "Farms, nurseries and the Redland",
          p: "Agriculture is a big part of the Homestead area, from nurseries to fruit groves in the Redland. Farm operations often need commercial auto for work vehicles, general liability and property coverage, and Florida's workers' compensation rules for agricultural employers are different from other businesses, so it's worth confirming what applies to you.",
        },
      ],
      es: [
        {
          h: "Historial de huracanes y la construcción de su casa",
          p: "Homestead y Florida City estuvieron entre las zonas más afectadas cuando el huracán Andrew azotó en 1992, y las normas de construcción de Florida se volvieron mucho más estrictas en los años siguientes. Hoy, las aseguradoras revisan con atención la edad del techo y cómo está construida su casa. Una inspección de mitigación de viento que documente ventanas de impacto, persianas contra huracanes y las conexiones entre el techo y las paredes puede reducir su prima.",
        },
        {
          h: "La inundación es una póliza aparte",
          p: "Las pólizas de propietario estándar no cubren daños por inundación, y gran parte del sur de Miami-Dade es una zona baja. El seguro contra inundaciones está disponible a través del Programa Nacional de Seguro contra Inundaciones (NFIP) y aseguradoras privadas, y las pólizas del NFIP generalmente tienen un período de espera de 30 días antes de entrar en vigor, así que es mejor no esperar a que haya una tormenta en el pronóstico.",
        },
        {
          h: "Fincas, viveros y el Redland",
          p: "La agricultura es una parte importante de la zona de Homestead, desde viveros hasta huertos de frutas en el Redland. Las operaciones agrícolas suelen necesitar auto comercial para los vehículos de trabajo, responsabilidad general y cobertura de propiedad, y las reglas de compensación laboral de Florida para empleadores agrícolas son diferentes a las de otros negocios, así que vale la pena confirmar cuáles le aplican.",
        },
      ],
    },
    faq: {
      en: [
        { q: "Is the Homestead office open for walk-ins?", a: "Our Homestead location meets clients by appointment only. Call (305) 704-7374 to schedule a visit, or start your quote online. For walk-ins, visit our Hialeah office." },
        { q: "What's the difference between an SR-22 and an FR-44?", a: "Both are certificates your insurer files with the state to prove you carry insurance. An FR-44 is generally required after DUI-related offenses and requires higher liability limits than an SR-22. We can tell you which one applies to you and quote carriers that file it." },
        { q: "Can I buy flood insurance right before a hurricane?", a: "You can apply at any time, but NFIP flood policies generally have a 30-day waiting period before coverage begins, and many carriers stop writing new policies once a storm is approaching. It's best to buy well before hurricane season." },
      ],
      es: [
        { q: "¿La oficina de Homestead atiende sin cita?", a: "Nuestra oficina de Homestead atiende solo con cita previa. Llame al (305) 704-7374 para programar una visita o comience su cotización en línea. Para atención sin cita, visite nuestra oficina de Hialeah." },
        { q: "¿Cuál es la diferencia entre un SR-22 y un FR-44?", a: "Ambos son certificados que su aseguradora presenta ante el estado para demostrar que usted tiene seguro. El FR-44 generalmente se exige después de infracciones relacionadas con conducir bajo los efectos del alcohol y requiere límites de responsabilidad más altos que el SR-22. Le diremos cuál le corresponde y cotizaremos con aseguradoras que lo presentan." },
        { q: "¿Puedo comprar un seguro contra inundaciones justo antes de un huracán?", a: "Puede solicitarlo en cualquier momento, pero las pólizas del NFIP generalmente tienen un período de espera de 30 días antes de entrar en vigor, y muchas aseguradoras dejan de emitir pólizas nuevas cuando se acerca una tormenta. Lo mejor es comprarlo mucho antes de la temporada de huracanes." },
      ],
    },
  },

  "boca-raton": {
    sectionsTitle: { en: "Insurance in Boca Raton: what to know", es: "Seguros en Boca Raton: lo que debe saber" },
    sections: {
      en: [
        {
          h: "Condo owners and Florida's newer condo safety laws",
          p: "After the 2021 condominium collapse in Surfside, Florida passed laws requiring milestone structural inspections and reserve studies for many older condo buildings. In some associations that has led to higher fees or special assessments. An HO-6 policy with loss assessment coverage can help pay your share when the association charges owners for a covered loss, though it doesn't cover routine repairs or required reserve funding.",
        },
        {
          h: "Hurricane deductibles on the coast",
          p: "Most Florida homeowners and condo policies have a separate hurricane deductible, usually a percentage of your dwelling coverage (commonly 2% to 10%) instead of a flat dollar amount. On a coastal Palm Beach County home that can be a large out-of-pocket amount, so we show you how different deductible options change both your premium and your risk.",
        },
        {
          h: "Professional offices and growing businesses",
          p: "Boca Raton has a large mix of medical, legal, financial and other professional offices alongside retail and restaurants. Depending on your business, that can mean professional liability (errors and omissions), a business owner's policy that bundles liability and property, commercial auto and workers' compensation.",
        },
      ],
      es: [
        {
          h: "Dueños de condominios y las nuevas leyes de seguridad de Florida",
          p: "Después del colapso del condominio en Surfside en 2021, Florida aprobó leyes que exigen inspecciones estructurales periódicas y estudios de reservas para muchos edificios de condominios antiguos. En algunas asociaciones eso ha llevado a cuotas más altas o derramas especiales. Una póliza HO-6 con cobertura de evaluación por pérdidas puede ayudarle a pagar su parte cuando la asociación cobra a los propietarios por una pérdida cubierta, aunque no cubre reparaciones de rutina ni los fondos de reserva obligatorios.",
        },
        {
          h: "Deducibles por huracán en la costa",
          p: "La mayoría de las pólizas de propietario y de condominio en Florida tienen un deducible por huracán aparte, normalmente un porcentaje de la cobertura de la vivienda (por lo general entre 2% y 10%) en lugar de una cantidad fija. En una casa costera del condado de Palm Beach esa cantidad puede ser alta, así que le mostramos cómo cada opción de deducible cambia tanto su prima como su riesgo.",
        },
        {
          h: "Oficinas profesionales y negocios en crecimiento",
          p: "Boca Raton tiene una gran variedad de oficinas médicas, legales, financieras y de otros servicios profesionales, además de tiendas y restaurantes. Según su negocio, eso puede significar responsabilidad profesional (errores y omisiones), una póliza para dueños de negocio que combina responsabilidad y propiedad, auto comercial y compensación laboral.",
        },
      ],
    },
    faq: {
      en: [
        { q: "Is the Boca Raton office open for walk-ins?", a: "Our Boca Raton location meets clients by appointment only. Call (239) 204-2208 to schedule a visit, or start your quote online. For walk-ins, visit our Hialeah office." },
        { q: "Does my condo insurance cover special assessments?", a: "Loss assessment coverage on an HO-6 policy can help with your share of an assessment for a covered loss, such as storm damage to common areas, up to your policy limit. It generally doesn't cover assessments for routine maintenance, upgrades or required reserve funding." },
        { q: "How is a hurricane deductible calculated?", a: "It's usually a percentage of your dwelling (Coverage A) limit. For example, a 2% hurricane deductible on a home insured for $400,000 would be $8,000. The options available depend on the carrier." },
      ],
      es: [
        { q: "¿La oficina de Boca Raton atiende sin cita?", a: "Nuestra oficina de Boca Raton atiende solo con cita previa. Llame al (239) 204-2208 para programar una visita o comience su cotización en línea. Para atención sin cita, visite nuestra oficina de Hialeah." },
        { q: "¿Mi seguro de condominio cubre las derramas especiales?", a: "La cobertura de evaluación por pérdidas de una póliza HO-6 puede ayudarle con su parte de una derrama por una pérdida cubierta, como daños por tormenta en las áreas comunes, hasta el límite de su póliza. Generalmente no cubre derramas por mantenimiento de rutina, mejoras o fondos de reserva obligatorios." },
        { q: "¿Cómo se calcula el deducible por huracán?", a: "Normalmente es un porcentaje del límite de la vivienda (Cobertura A). Por ejemplo, un deducible por huracán del 2% en una casa asegurada por $400,000 sería de $8,000. Las opciones disponibles dependen de la aseguradora." },
      ],
    },
  },

  "lehigh-acres": {
    sectionsTitle: { en: "Insurance in Lehigh Acres: what to know", es: "Seguros en Lehigh Acres: lo que debe saber" },
    sections: {
      en: [
        {
          h: "After Hurricane Ian",
          p: "Hurricane Ian made landfall in Lee County in September 2022, and many Southwest Florida homeowners have seen their insurance options and premiums change since then. Shopping more than one carrier matters here, and documenting your home's storm-resistant features with a wind mitigation inspection is one of the most reliable ways to lower your premium.",
        },
        {
          h: "Newer homes and older homes",
          p: "Lehigh Acres has a lot of newer construction, and homes built to current Florida building codes often qualify for better rates. Older homes may need a 4-point inspection of the roof, electrical, plumbing and HVAC systems before some carriers will write a policy, and roof age is one of the biggest factors in what you'll pay.",
        },
        {
          h: "Flood and the daily commute",
          p: "Ian showed that flooding can reach well beyond the coast. Standard homeowners policies exclude flood, so we quote both NFIP and private flood options. And if you commute to Fort Myers or Cape Coral every day, reviewing your auto liability limits and Uninsured Motorist coverage is a good idea.",
        },
      ],
      es: [
        {
          h: "Después del huracán Ian",
          p: "El huracán Ian tocó tierra en el condado de Lee en septiembre de 2022, y muchos propietarios del suroeste de Florida han visto cambiar sus opciones de seguro y sus primas desde entonces. Aquí es importante comparar más de una aseguradora, y documentar las características de su casa que resisten tormentas con una inspección de mitigación de viento es una de las formas más confiables de reducir su prima.",
        },
        {
          h: "Casas nuevas y casas antiguas",
          p: "Lehigh Acres tiene mucha construcción nueva, y las casas construidas con los códigos de construcción actuales de Florida suelen calificar para mejores tarifas. Las casas más antiguas pueden necesitar una inspección de 4 puntos del techo, el sistema eléctrico, la plomería y el aire acondicionado antes de que algunas aseguradoras emitan una póliza, y la edad del techo es uno de los factores que más influyen en lo que pagará.",
        },
        {
          h: "Inundaciones y el viaje diario",
          p: "Ian demostró que las inundaciones pueden llegar mucho más allá de la costa. Las pólizas de propietario estándar excluyen las inundaciones, así que cotizamos opciones del NFIP y privadas. Y si viaja todos los días a Fort Myers o Cape Coral, es buena idea revisar sus límites de responsabilidad de auto y la cobertura contra Conductores sin Seguro.",
        },
      ],
    },
    faq: {
      en: [
        { q: "Is the Lehigh Acres office open for walk-ins?", a: "Our Lehigh Acres location meets clients by appointment only. Call (239) 204-2208 to schedule a visit, or start your quote online." },
        { q: "What is a wind mitigation inspection?", a: "A licensed inspector documents features that help your home resist wind, such as roof shape, roof-deck attachment, roof-to-wall connections and opening protection. Florida insurers are required to offer discounts for qualifying features, and the report is usually valid for five years." },
        { q: "Is it easier to insure a new-construction home?", a: "Usually. Newer homes built to current code with newer roofs often qualify for more carriers and better rates. We'll need details like the year built, roof type and any permits or inspection reports." },
      ],
      es: [
        { q: "¿La oficina de Lehigh Acres atiende sin cita?", a: "Nuestra oficina de Lehigh Acres atiende solo con cita previa. Llame al (239) 204-2208 para programar una visita o comience su cotización en línea." },
        { q: "¿Qué es una inspección de mitigación de viento?", a: "Un inspector con licencia documenta las características que ayudan a su casa a resistir el viento, como la forma del techo, la fijación de la cubierta, las conexiones entre el techo y las paredes y la protección de ventanas y puertas. Las aseguradoras de Florida están obligadas a ofrecer descuentos por las características que califiquen, y el informe normalmente es válido por cinco años." },
        { q: "¿Es más fácil asegurar una casa de construcción nueva?", a: "Por lo general, sí. Las casas nuevas construidas con el código actual y con techos nuevos suelen calificar con más aseguradoras y mejores tarifas. Necesitaremos datos como el año de construcción, el tipo de techo y cualquier permiso o informe de inspección." },
      ],
    },
  },
};
