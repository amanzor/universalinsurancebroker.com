import type { Bilingual } from "@/lib/i18n";

/*
 * Florida insurance guides (/guides/<slug>, /es/guides/<slug>).
 *
 * These are general information, written to be accurate as of REVIEWED_ON.
 * Florida law and federal Marketplace rules change: re-check each guide's
 * figures with a licensed agent before editing, and update REVIEWED_ON.
 * Avoid yearly-changing numbers (rates, subsidy amounts) in the copy.
 */

export const REVIEWED_ON: Bilingual<string> = { en: "November 2026", es: "noviembre de 2026" };
/** ISO date of the last review, for structured data. */
export const REVIEWED_ISO = "2026-11-11";

export type GuideSection = { h: string; p: string[]; list?: string[] };
export type GuideFaq = { q: string; a: string };
export type GuideCopy = {
  title: string;
  /** Meta description and card summary (~150 characters). */
  description: string;
  intro: string;
  takeaways: string[];
  sections: GuideSection[];
  faq: GuideFaq[];
  /** Label for the link to the related service page. */
  relatedLabel: string;
};

export type Guide = {
  slug: string;
  /** Related service page (English path). */
  related: string;
  copy: Bilingual<GuideCopy>;
};

export const GUIDES: Guide[] = [
  /* ──────────────────────────────────────────────────────────────── */
  {
    slug: "florida-car-insurance-requirements",
    related: "/auto-insurance",
    copy: {
      en: {
        title: "Florida Car Insurance Requirements: What the Law Requires",
        description:
          "What Florida's minimum car insurance covers, why the minimum often isn't enough, and when you need an SR-22 or FR-44.",
        intro:
          "Florida is a no-fault state, and its car insurance rules work differently from most of the country. Here's what you're required to carry, what that coverage actually pays for, and where the gaps are.",
        takeaways: [
          "Every Florida-registered vehicle with four or more wheels needs at least $10,000 of Personal Injury Protection (PIP) and $10,000 of Property Damage Liability (PDL).",
          "Bodily Injury Liability isn't required to register most cars, but without it your own savings are exposed if you injure someone.",
          "Letting your insurance lapse can get your license and registration suspended.",
          "After certain violations the state requires an SR-22, and after a DUI an FR-44 with much higher limits.",
        ],
        sections: [
          {
            h: "The minimum coverage Florida requires",
            p: [
              "To register a car in Florida you must carry two coverages, and you have to keep them for as long as the vehicle is registered, even if you aren't driving it:",
            ],
            list: [
              "$10,000 of Personal Injury Protection (PIP), which pays for your own injuries no matter who caused the accident.",
              "$10,000 of Property Damage Liability (PDL), which pays for damage you cause to someone else's car or property.",
            ],
          },
          {
            h: "What PIP covers, and what it doesn't",
            p: [
              "PIP generally pays 80% of reasonable medical expenses and 60% of lost income from an accident, up to your $10,000 limit, plus a $5,000 death benefit. To use it, you need to get initial medical care within 14 days of the accident. The full $10,000 for medical care is available only when a qualified provider determines you had an emergency medical condition; otherwise medical benefits are limited to $2,500.",
              "PIP does not pay for injuries you cause to other people, and it does not repair your car. Those need other coverages.",
            ],
          },
          {
            h: "Why the minimum usually isn't enough",
            p: [
              "$10,000 of property damage coverage doesn't go far when many cars on the road cost several times that. And because Bodily Injury Liability isn't required, a serious accident where you're at fault could leave you personally responsible for someone else's medical bills. Florida also has one of the highest rates of uninsured drivers in the country.",
              "That's why most drivers we work with add some or all of the following:",
            ],
            list: [
              "Bodily Injury Liability, to protect your savings if you injure someone.",
              "Uninsured/Underinsured Motorist coverage, for your injuries when the other driver has little or no insurance.",
              "Collision and Comprehensive, which lenders and leasing companies require. Comprehensive is also what covers flood and storm damage to your car.",
              "Rental reimbursement and roadside assistance, if you depend on your car to get to work.",
            ],
          },
          {
            h: "What happens if your insurance lapses",
            p: [
              "Insurers report cancellations to the state. If your registered vehicle goes without the required coverage, the Florida Department of Highway Safety and Motor Vehicles can suspend your driver's license and registration, and getting them back means paying a reinstatement fee that increases with repeat suspensions. If you sell a car or stop driving it, turn in the license plate before you cancel the insurance.",
            ],
          },
          {
            h: "SR-22 and FR-44 certificates",
            p: [
              "After certain violations, such as some license suspensions or an accident without insurance, the state can require an SR-22: a certificate your insurer files to prove you carry Bodily Injury Liability of at least $10,000 per person and $20,000 per accident, plus $10,000 of property damage.",
              "After a DUI conviction, Florida requires an FR-44 instead, with much higher minimums: $100,000 per person and $300,000 per accident for bodily injury, and $50,000 for property damage. Both are generally required for three years, and if the policy lapses your insurer notifies the state. Not every insurer files these certificates; we work with carriers that do.",
            ],
          },
        ],
        faq: [
          {
            q: "Is Florida a no-fault state?",
            a: "Yes. Your own Personal Injury Protection (PIP) pays for your injuries after an accident, up to its limits, regardless of who was at fault. Fault still matters for property damage and for injuries beyond what PIP covers.",
          },
          {
            q: "Do I need Bodily Injury Liability in Florida?",
            a: "It isn't required to register most vehicles, but it is required if the state orders an SR-22 or FR-44, and we strongly recommend it. Without it, you can be held personally responsible for injuries you cause.",
          },
          {
            q: "How long do I have to keep an SR-22 or FR-44?",
            a: "Generally three years, but check the notice you received from the state for your exact requirement. The certificate has to stay active for the whole period.",
          },
          {
            q: "Does my Florida policy cover me when I drive in another state?",
            a: "Most Florida auto policies cover you anywhere in the United States and Canada, and many automatically meet another state's minimum limits while you're there. Check your policy or ask us to confirm.",
          },
        ],
        relatedLabel: "Get a Florida auto insurance quote",
      },
      es: {
        title: "Requisitos del Seguro de Auto en Florida: Lo Que Exige la Ley",
        description:
          "Qué cubre el seguro de auto mínimo en Florida, por qué el mínimo muchas veces no alcanza y cuándo necesita un SR-22 o FR-44.",
        intro:
          "Florida es un estado sin culpa (no-fault), y sus reglas de seguro de auto funcionan de forma diferente a las de la mayor parte del país. Aquí le explicamos qué está obligado a tener, qué paga realmente esa cobertura y dónde quedan los vacíos.",
        takeaways: [
          "Todo vehículo de cuatro ruedas o más registrado en Florida necesita al menos $10,000 de Protección contra Lesiones Personales (PIP) y $10,000 de Responsabilidad por Daños a la Propiedad (PDL).",
          "La Responsabilidad por Lesiones Corporales no es obligatoria para registrar la mayoría de los autos, pero sin ella sus ahorros quedan expuestos si lesiona a alguien.",
          "Dejar que su seguro se venza puede llevar a la suspensión de su licencia y su registro.",
          "Después de ciertas infracciones el estado exige un SR-22, y después de un DUI un FR-44 con límites mucho más altos.",
        ],
        sections: [
          {
            h: "La cobertura mínima que exige Florida",
            p: [
              "Para registrar un auto en Florida debe tener dos coberturas, y debe mantenerlas mientras el vehículo esté registrado, aunque no lo esté manejando:",
            ],
            list: [
              "$10,000 de Protección contra Lesiones Personales (PIP), que paga sus propias lesiones sin importar quién causó el accidente.",
              "$10,000 de Responsabilidad por Daños a la Propiedad (PDL), que paga los daños que usted cause al auto o la propiedad de otra persona.",
            ],
          },
          {
            h: "Qué cubre el PIP y qué no",
            p: [
              "El PIP generalmente paga el 80% de los gastos médicos razonables y el 60% de los ingresos perdidos por un accidente, hasta su límite de $10,000, más un beneficio por muerte de $5,000. Para usarlo, debe recibir atención médica inicial dentro de los 14 días posteriores al accidente. Los $10,000 completos para gastos médicos solo están disponibles cuando un proveedor calificado determina que usted tuvo una condición médica de emergencia; de lo contrario, los beneficios médicos se limitan a $2,500.",
              "El PIP no paga las lesiones que usted cause a otras personas ni repara su auto. Para eso se necesitan otras coberturas.",
            ],
          },
          {
            h: "Por qué el mínimo normalmente no es suficiente",
            p: [
              "$10,000 de cobertura por daños a la propiedad no alcanzan cuando muchos autos en la calle cuestan varias veces esa cantidad. Y como la Responsabilidad por Lesiones Corporales no es obligatoria, un accidente grave en el que usted tenga la culpa podría dejarlo personalmente responsable de las cuentas médicas de otra persona. Florida además tiene una de las tasas más altas de conductores sin seguro del país.",
              "Por eso la mayoría de los conductores con los que trabajamos añaden algunas o todas estas coberturas:",
            ],
            list: [
              "Responsabilidad por Lesiones Corporales, para proteger sus ahorros si lesiona a alguien.",
              "Conductor sin Seguro o con Seguro Insuficiente, para sus lesiones cuando el otro conductor tiene poco o ningún seguro.",
              "Colisión y Cobertura Integral (Comprehensive), que exigen los prestamistas y las compañías de leasing. La cobertura integral también es la que cubre los daños por inundación y tormentas a su auto.",
              "Reembolso de auto de alquiler y asistencia en carretera, si depende de su auto para ir al trabajo.",
            ],
          },
          {
            h: "Qué pasa si su seguro se vence",
            p: [
              "Las aseguradoras reportan las cancelaciones al estado. Si su vehículo registrado se queda sin la cobertura obligatoria, el Departamento de Seguridad en las Carreteras y Vehículos Motorizados de Florida puede suspender su licencia de conducir y su registro, y recuperarlos implica pagar una tarifa de reinstalación que aumenta con cada suspensión. Si vende un auto o deja de manejarlo, entregue la placa antes de cancelar el seguro.",
            ],
          },
          {
            h: "Certificados SR-22 y FR-44",
            p: [
              "Después de ciertas infracciones, como algunas suspensiones de licencia o un accidente sin seguro, el estado puede exigir un SR-22: un certificado que su aseguradora presenta para demostrar que usted tiene Responsabilidad por Lesiones Corporales de al menos $10,000 por persona y $20,000 por accidente, más $10,000 por daños a la propiedad.",
              "Después de una condena por DUI, Florida exige en su lugar un FR-44, con mínimos mucho más altos: $100,000 por persona y $300,000 por accidente por lesiones corporales, y $50,000 por daños a la propiedad. Ambos generalmente se exigen por tres años, y si la póliza se vence la aseguradora lo notifica al estado. No todas las aseguradoras presentan estos certificados; trabajamos con las que sí lo hacen.",
            ],
          },
        ],
        faq: [
          {
            q: "¿Florida es un estado sin culpa (no-fault)?",
            a: "Sí. Su propia Protección contra Lesiones Personales (PIP) paga sus lesiones después de un accidente, hasta sus límites, sin importar quién tuvo la culpa. La culpa sigue importando para los daños a la propiedad y para las lesiones que superan lo que cubre el PIP.",
          },
          {
            q: "¿Necesito Responsabilidad por Lesiones Corporales en Florida?",
            a: "No es obligatoria para registrar la mayoría de los vehículos, pero sí lo es si el estado le exige un SR-22 o FR-44, y se la recomendamos mucho. Sin ella, usted puede ser personalmente responsable de las lesiones que cause.",
          },
          {
            q: "¿Por cuánto tiempo debo mantener un SR-22 o FR-44?",
            a: "Generalmente tres años, pero revise el aviso que recibió del estado para conocer su requisito exacto. El certificado debe estar activo durante todo el período.",
          },
          {
            q: "¿Mi póliza de Florida me cubre cuando manejo en otro estado?",
            a: "La mayoría de las pólizas de auto de Florida le cubren en cualquier parte de Estados Unidos y Canadá, y muchas cumplen automáticamente los límites mínimos de otro estado mientras está allí. Revise su póliza o pídanos que lo confirmemos.",
          },
        ],
        relatedLabel: "Cotice su seguro de auto en Florida",
      },
    },
  },

  /* ──────────────────────────────────────────────────────────────── */
  {
    slug: "florida-hurricane-deductibles",
    related: "/home-insurance",
    copy: {
      en: {
        title: "Hurricane Deductibles in Florida, Explained",
        description:
          "How Florida hurricane deductibles work: how they're calculated, when they apply, the once-per-season rule and how to choose the right one.",
        intro:
          "Almost every Florida homeowners and condo policy has two deductibles: a regular one for most claims and a separate hurricane deductible that is usually much larger. Knowing how yours works before storm season can save you a costly surprise.",
        takeaways: [
          "The hurricane deductible is usually a percentage of your dwelling coverage, not a flat dollar amount.",
          "It applies from the moment a hurricane watch or warning is issued for any part of Florida until 72 hours after the last one ends.",
          "In Florida it applies once per calendar year with the same insurer, not once per storm.",
          "It doesn't cover flooding. Flood is a separate policy with its own deductible.",
        ],
        sections: [
          {
            h: "What a hurricane deductible is",
            p: [
              "Your policy's regular deductible, often called the all-other-perils deductible, applies to things like fire, theft or a burst pipe. Damage caused by a hurricane uses a separate hurricane deductible instead. For most Florida homes it's a percentage of your dwelling coverage (Coverage A), so it grows as your home's insured value grows.",
            ],
          },
          {
            h: "How much it can be",
            p: [
              "Florida insurers are required to offer hurricane deductible options of $500, 2%, 5% and 10% of dwelling coverage, although which options are available can depend on the home and the carrier. The percentage makes a big difference:",
            ],
            list: [
              "A home insured for $350,000 with a 2% hurricane deductible: you pay the first $7,000 of hurricane damage.",
              "The same home with a 5% hurricane deductible: you pay the first $17,500.",
              "With a 10% hurricane deductible: you pay the first $35,000.",
            ],
          },
          {
            h: "When it applies",
            p: [
              "Under Florida law, the hurricane deductible applies to hurricane losses during a specific window: it starts when the National Hurricane Center issues a hurricane watch or warning for any part of Florida, and it ends 72 hours after the last hurricane watch or warning for the state is lifted. Damage from a storm that never brings a hurricane watch or warning, such as many tropical storms, is handled under your regular deductible.",
            ],
          },
          {
            h: "Once per season, not once per storm",
            p: [
              "Florida applies the hurricane deductible once per calendar year when you stay with the same insurer. If a second hurricane damages your home in the same year, you pay whichever is greater: the part of your hurricane deductible you haven't used yet, or your regular deductible. You don't start over with a full hurricane deductible for every storm.",
            ],
          },
          {
            h: "How to choose the right deductible",
            p: [
              "A higher hurricane deductible lowers your premium, but you need to be able to pay it after a storm, at the same time as other costs like temporary housing. A good rule of thumb is to choose a deductible you could cover from savings. Your mortgage lender may also limit how high it can be.",
              "Other ways to lower your premium without raising your risk:",
            ],
            list: [
              "A wind mitigation inspection. Florida insurers must offer discounts for features like impact windows, shutters, roof shape and stronger roof-to-wall connections, and the report is generally valid for five years.",
              "A newer roof, which many carriers price significantly better.",
              "Comparing carriers. Rates and deductible options vary a lot between companies, which is where an independent broker helps.",
            ],
          },
          {
            h: "What the hurricane deductible doesn't cover",
            p: [
              "Flooding, including storm surge, is excluded from homeowners policies and needs a separate flood policy with its own deductible. And in some coastal areas, a homeowners policy may exclude wind entirely, with wind coverage written separately, sometimes through Citizens Property Insurance. Check your declarations page so you know exactly what you have.",
            ],
          },
        ],
        faq: [
          {
            q: "Does the hurricane deductible apply to tropical storms?",
            a: "Only if the damage happens during a hurricane watch or warning period for Florida. Damage from a tropical storm with no hurricane watch or warning in effect is handled under your regular deductible.",
          },
          {
            q: "If two hurricanes hit in the same year, do I pay two hurricane deductibles?",
            a: "No, as long as you're with the same insurer. For the second storm you pay the greater of what's left of your hurricane deductible or your regular deductible.",
          },
          {
            q: "Can I change my hurricane deductible?",
            a: "Usually at renewal, and the options depend on your carrier and your home. Ask us to show you the premium for each option side by side.",
          },
          {
            q: "Does the hurricane deductible apply to flood damage?",
            a: "No. Flood damage, including storm surge, isn't covered by homeowners insurance at all. It needs a separate flood policy, which has its own deductible.",
          },
        ],
        relatedLabel: "Compare Florida home insurance",
      },
      es: {
        title: "Deducibles por Huracán en Florida, Explicados",
        description:
          "Cómo funcionan los deducibles por huracán en Florida: cómo se calculan, cuándo aplican, la regla de una vez por temporada y cómo elegir el adecuado.",
        intro:
          "Casi todas las pólizas de propietario y de condominio en Florida tienen dos deducibles: uno regular para la mayoría de los reclamos y un deducible por huracán aparte que suele ser mucho más alto. Saber cómo funciona el suyo antes de la temporada de tormentas puede ahorrarle una sorpresa costosa.",
        takeaways: [
          "El deducible por huracán normalmente es un porcentaje de la cobertura de su vivienda, no una cantidad fija.",
          "Aplica desde el momento en que se emite una vigilancia o advertencia de huracán para cualquier parte de Florida hasta 72 horas después de que termine la última.",
          "En Florida aplica una vez por año calendario con la misma aseguradora, no una vez por tormenta.",
          "No cubre inundaciones. La inundación es una póliza aparte con su propio deducible.",
        ],
        sections: [
          {
            h: "Qué es un deducible por huracán",
            p: [
              "El deducible regular de su póliza, a menudo llamado deducible de todos los demás riesgos, aplica a cosas como incendio, robo o una tubería rota. Los daños causados por un huracán usan en su lugar un deducible por huracán aparte. En la mayoría de las casas de Florida es un porcentaje de la cobertura de la vivienda (Cobertura A), así que aumenta a medida que aumenta el valor asegurado de su casa.",
            ],
          },
          {
            h: "De cuánto puede ser",
            p: [
              "Las aseguradoras de Florida están obligadas a ofrecer opciones de deducible por huracán de $500, 2%, 5% y 10% de la cobertura de la vivienda, aunque las opciones disponibles pueden depender de la casa y de la aseguradora. El porcentaje hace una gran diferencia:",
            ],
            list: [
              "Una casa asegurada por $350,000 con un deducible por huracán del 2%: usted paga los primeros $7,000 de daños por huracán.",
              "La misma casa con un deducible por huracán del 5%: usted paga los primeros $17,500.",
              "Con un deducible por huracán del 10%: usted paga los primeros $35,000.",
            ],
          },
          {
            h: "Cuándo aplica",
            p: [
              "Según la ley de Florida, el deducible por huracán aplica a las pérdidas por huracán durante un período específico: empieza cuando el Centro Nacional de Huracanes emite una vigilancia o advertencia de huracán para cualquier parte de Florida y termina 72 horas después de que se levanta la última vigilancia o advertencia de huracán para el estado. Los daños de una tormenta que nunca trae vigilancia ni advertencia de huracán, como muchas tormentas tropicales, se manejan con su deducible regular.",
            ],
          },
          {
            h: "Una vez por temporada, no una vez por tormenta",
            p: [
              "Florida aplica el deducible por huracán una vez por año calendario cuando usted se queda con la misma aseguradora. Si un segundo huracán daña su casa en el mismo año, usted paga la cantidad mayor entre la parte de su deducible por huracán que aún no ha usado y su deducible regular. No vuelve a empezar con un deducible por huracán completo en cada tormenta.",
            ],
          },
          {
            h: "Cómo elegir el deducible adecuado",
            p: [
              "Un deducible por huracán más alto reduce su prima, pero debe poder pagarlo después de una tormenta, al mismo tiempo que otros gastos como una vivienda temporal. Una buena regla es elegir un deducible que podría cubrir con sus ahorros. Su prestamista hipotecario también puede limitar qué tan alto puede ser.",
              "Otras formas de bajar su prima sin aumentar su riesgo:",
            ],
            list: [
              "Una inspección de mitigación de viento. Las aseguradoras de Florida deben ofrecer descuentos por características como ventanas de impacto, persianas contra huracanes, la forma del techo y conexiones más fuertes entre el techo y las paredes, y el informe generalmente es válido por cinco años.",
              "Un techo más nuevo, que muchas aseguradoras cotizan bastante mejor.",
              "Comparar aseguradoras. Las tarifas y las opciones de deducible varían mucho entre compañías, y ahí es donde ayuda un corredor independiente.",
            ],
          },
          {
            h: "Lo que no cubre el deducible por huracán",
            p: [
              "Las inundaciones, incluida la marejada ciclónica, están excluidas de las pólizas de propietario y necesitan una póliza de inundación aparte con su propio deducible. Y en algunas zonas costeras, una póliza de propietario puede excluir el viento por completo, y la cobertura de viento se emite por separado, a veces a través de Citizens Property Insurance. Revise su página de declaraciones para saber exactamente qué tiene.",
            ],
          },
        ],
        faq: [
          {
            q: "¿El deducible por huracán aplica a las tormentas tropicales?",
            a: "Solo si el daño ocurre durante un período de vigilancia o advertencia de huracán para Florida. Los daños de una tormenta tropical sin vigilancia ni advertencia de huracán vigente se manejan con su deducible regular.",
          },
          {
            q: "Si dos huracanes llegan el mismo año, ¿pago dos deducibles por huracán?",
            a: "No, siempre que esté con la misma aseguradora. En la segunda tormenta usted paga la cantidad mayor entre lo que queda de su deducible por huracán y su deducible regular.",
          },
          {
            q: "¿Puedo cambiar mi deducible por huracán?",
            a: "Normalmente al renovar, y las opciones dependen de su aseguradora y de su casa. Pídanos que le mostremos la prima de cada opción lado a lado.",
          },
          {
            q: "¿El deducible por huracán aplica a los daños por inundación?",
            a: "No. Los daños por inundación, incluida la marejada ciclónica, no están cubiertos por el seguro de propietario. Necesitan una póliza de inundación aparte, que tiene su propio deducible.",
          },
        ],
        relatedLabel: "Compare seguros de hogar en Florida",
      },
    },
  },

  /* ──────────────────────────────────────────────────────────────── */
  {
    slug: "florida-flood-insurance",
    related: "/home-insurance",
    copy: {
      en: {
        title: "Do I Need Flood Insurance in Florida?",
        description:
          "Why homeowners insurance doesn't cover flooding, who is required to carry flood insurance in Florida, NFIP vs. private flood, and the 30-day waiting period.",
        intro:
          "Florida is surrounded by water and gets heavy rain and storm surge, yet many homeowners don't realize their regular policy doesn't cover flooding at all. Here's how flood insurance works and how to decide if you need it.",
        takeaways: [
          "Homeowners, condo and renters policies don't cover flood damage, including storm surge.",
          "Flood insurance is required for many homes with a federally backed mortgage in a high-risk flood zone, and Citizens is phasing in a flood requirement for its policyholders.",
          "Floods happen outside high-risk zones too.",
          "National Flood Insurance Program policies generally take 30 days to start, so don't wait for a storm.",
        ],
        sections: [
          {
            h: "Your homeowners policy doesn't cover floods",
            p: [
              "Standard homeowners, condo and renters policies exclude flood damage: rising water from heavy rain, overflowing rivers or canals, and storm surge from a hurricane. Wind-driven rain coming through a damaged roof is generally a homeowners claim; water rising from the ground is a flood claim. Flood coverage is a separate policy.",
            ],
          },
          {
            h: "When flood insurance is required",
            p: [
              "If your home is in a high-risk flood zone (FEMA zones that start with A or V) and you have a mortgage from a federally regulated or insured lender, your lender will require flood insurance.",
              "Citizens Property Insurance Corporation, Florida's state-backed insurer, also requires flood coverage for its policyholders in high-risk flood zones, and it has been phasing in the requirement for its other policyholders by home value, reaching all Citizens policyholders in 2027. If you're with Citizens, ask us where your home falls.",
            ],
          },
          {
            h: "Low-risk zone doesn't mean no risk",
            p: [
              "According to FEMA, a meaningful share of flood insurance claims come from properties outside high-risk flood zones. Recent storms have flooded neighborhoods far from the coast, especially where heavy rain overwhelms drainage. Flood insurance in moderate- and low-risk zones is often much less expensive, which makes it worth pricing even when it isn't required.",
            ],
          },
          {
            h: "NFIP vs. private flood insurance",
            p: [
              "There are two main ways to buy flood insurance in Florida:",
            ],
            list: [
              "The National Flood Insurance Program (NFIP), backed by FEMA, covers homes up to $250,000 for the building and $100,000 for contents. Premiums are based on your individual property's flood risk.",
              "Private flood insurance can offer higher limits, coverage for temporary living expenses and sometimes shorter waiting periods. Mortgage lenders accept private policies that meet federal standards.",
            ],
          },
          {
            h: "Condo owners and renters",
            p: [
              "A condo association's flood policy, if it has one, covers the building. Your unit's interior items and your belongings need your own coverage. Renters can buy contents-only flood coverage for their belongings, which is often very affordable.",
            ],
          },
          {
            h: "Don't wait for a storm",
            p: [
              "NFIP policies generally have a 30-day waiting period before coverage starts. The main exceptions are when flood insurance is required as part of buying or refinancing a home, or after a flood map change. Insurers also stop writing new policies when a storm is approaching, so the best time to buy is well before hurricane season.",
            ],
          },
        ],
        faq: [
          {
            q: "Does homeowners insurance cover flooding from a hurricane?",
            a: "No. Wind damage from a hurricane is covered by your homeowners policy (subject to the hurricane deductible), but rising water and storm surge are flood damage, which needs a separate flood policy.",
          },
          {
            q: "How long does it take for flood insurance to start?",
            a: "NFIP policies generally take effect 30 days after purchase, with exceptions such as buying flood insurance when you close on a home. Some private flood policies have shorter waiting periods.",
          },
          {
            q: "How do I find out my flood zone?",
            a: "You can look up your address on FEMA's Flood Map Service Center, or give us your address and we'll check it for you when we quote.",
          },
          {
            q: "Does flood insurance cover my car?",
            a: "No. Flood damage to a car is covered by the Comprehensive coverage on your auto policy.",
          },
        ],
        relatedLabel: "Get a flood and home insurance quote",
      },
      es: {
        title: "¿Necesito Seguro contra Inundaciones en Florida?",
        description:
          "Por qué el seguro de propietario no cubre inundaciones, quién está obligado a tener seguro contra inundaciones en Florida, NFIP o privado, y el período de espera de 30 días.",
        intro:
          "Florida está rodeada de agua y recibe lluvias intensas y marejadas ciclónicas, pero muchos propietarios no saben que su póliza regular no cubre inundaciones en absoluto. Aquí le explicamos cómo funciona el seguro contra inundaciones y cómo decidir si lo necesita.",
        takeaways: [
          "Las pólizas de propietario, de condominio y de inquilino no cubren daños por inundación, incluida la marejada ciclónica.",
          "El seguro contra inundaciones es obligatorio para muchas casas con hipoteca respaldada por el gobierno federal en zonas de alto riesgo, y Citizens está implementando gradualmente un requisito de inundación para sus asegurados.",
          "Las inundaciones también ocurren fuera de las zonas de alto riesgo.",
          "Las pólizas del Programa Nacional de Seguro contra Inundaciones generalmente tardan 30 días en entrar en vigor, así que no espere a una tormenta.",
        ],
        sections: [
          {
            h: "Su póliza de propietario no cubre inundaciones",
            p: [
              "Las pólizas estándar de propietario, de condominio y de inquilino excluyen los daños por inundación: el agua que sube por lluvias intensas, el desbordamiento de ríos o canales y la marejada ciclónica de un huracán. La lluvia impulsada por el viento que entra por un techo dañado generalmente es un reclamo de la póliza de propietario; el agua que sube desde el suelo es un reclamo de inundación. La cobertura contra inundaciones es una póliza aparte.",
            ],
          },
          {
            h: "Cuándo es obligatorio el seguro contra inundaciones",
            p: [
              "Si su casa está en una zona de alto riesgo de inundación (las zonas de FEMA que empiezan con A o V) y tiene una hipoteca de un prestamista regulado o asegurado por el gobierno federal, su prestamista le exigirá seguro contra inundaciones.",
              "Citizens Property Insurance Corporation, la aseguradora respaldada por el estado de Florida, también exige cobertura contra inundaciones a sus asegurados en zonas de alto riesgo, y ha ido implementando el requisito para sus demás asegurados según el valor de la casa, hasta llegar a todos sus asegurados en 2027. Si está con Citizens, pregúntenos en qué caso está su casa.",
            ],
          },
          {
            h: "Zona de bajo riesgo no significa sin riesgo",
            p: [
              "Según FEMA, una parte importante de los reclamos de seguro contra inundaciones proviene de propiedades fuera de las zonas de alto riesgo. Tormentas recientes han inundado vecindarios lejos de la costa, sobre todo donde las lluvias intensas superan el drenaje. El seguro contra inundaciones en zonas de riesgo moderado y bajo suele costar mucho menos, por lo que vale la pena cotizarlo aunque no sea obligatorio.",
            ],
          },
          {
            h: "NFIP o seguro contra inundaciones privado",
            p: [
              "Hay dos formas principales de comprar seguro contra inundaciones en Florida:",
            ],
            list: [
              "El Programa Nacional de Seguro contra Inundaciones (NFIP), respaldado por FEMA, cubre casas hasta $250,000 para el edificio y $100,000 para el contenido. Las primas se basan en el riesgo de inundación de cada propiedad.",
              "El seguro contra inundaciones privado puede ofrecer límites más altos, cobertura de gastos de vivienda temporal y, a veces, períodos de espera más cortos. Los prestamistas hipotecarios aceptan pólizas privadas que cumplan los estándares federales.",
            ],
          },
          {
            h: "Dueños de condominio e inquilinos",
            p: [
              "La póliza de inundación de la asociación del condominio, si la tiene, cubre el edificio. Los elementos interiores de su unidad y sus pertenencias necesitan su propia cobertura. Los inquilinos pueden comprar cobertura contra inundaciones solo para sus pertenencias, que suele ser muy económica.",
            ],
          },
          {
            h: "No espere a una tormenta",
            p: [
              "Las pólizas del NFIP generalmente tienen un período de espera de 30 días antes de entrar en vigor. Las principales excepciones son cuando el seguro contra inundaciones se exige al comprar o refinanciar una casa, o después de un cambio en los mapas de inundación. Además, las aseguradoras dejan de emitir pólizas nuevas cuando se acerca una tormenta, así que el mejor momento para comprarlo es mucho antes de la temporada de huracanes.",
            ],
          },
        ],
        faq: [
          {
            q: "¿El seguro de propietario cubre las inundaciones por huracán?",
            a: "No. Los daños por viento de un huracán los cubre su póliza de propietario (sujetos al deducible por huracán), pero el agua que sube y la marejada ciclónica son daños por inundación, que necesitan una póliza aparte.",
          },
          {
            q: "¿Cuánto tarda en entrar en vigor el seguro contra inundaciones?",
            a: "Las pólizas del NFIP generalmente entran en vigor 30 días después de la compra, con excepciones como comprar el seguro al cerrar la compra de una casa. Algunas pólizas privadas tienen períodos de espera más cortos.",
          },
          {
            q: "¿Cómo sé en qué zona de inundación estoy?",
            a: "Puede buscar su dirección en el Centro de Servicio de Mapas de Inundación de FEMA, o darnos su dirección y la revisamos por usted al cotizar.",
          },
          {
            q: "¿El seguro contra inundaciones cubre mi auto?",
            a: "No. Los daños por inundación a un auto los cubre la Cobertura Integral (Comprehensive) de su póliza de auto.",
          },
        ],
        relatedLabel: "Cotice seguro de hogar e inundación",
      },
    },
  },

  /* ──────────────────────────────────────────────────────────────── */
  {
    slug: "florida-condo-insurance",
    related: "/home-insurance",
    copy: {
      en: {
        title: "Condo Insurance in Florida After the New Condo Safety Laws",
        description:
          "What Florida's condo safety laws mean for owners, what the association's policy covers vs. your HO-6, and why loss assessment coverage matters.",
        intro:
          "Since the 2021 condominium collapse in Surfside, Florida has passed new safety laws for condo buildings. They're changing association budgets, and with them what condo owners should look for in their own insurance.",
        takeaways: [
          "Many older condo buildings now need milestone structural inspections and structural reserve studies.",
          "That has raised association fees and led to special assessments in some buildings. Insurance doesn't pay for maintenance or reserves.",
          "The association's master policy covers the building; your HO-6 covers interior items, belongings and liability.",
          "Florida requires HO-6 policies to include at least $2,000 of loss assessment coverage, and many owners should carry more.",
        ],
        sections: [
          {
            h: "What changed after Surfside",
            p: [
              "After the Champlain Towers South collapse in June 2021, Florida passed condo safety laws starting in 2022. The main requirements for condo buildings three stories or taller:",
            ],
            list: [
              "A milestone structural inspection once the building reaches 30 years old (local governments can require it sooner, for example near salt water), and every 10 years after that.",
              "A structural integrity reserve study at least every 10 years, covering items like the roof, structure, fireproofing, plumbing, electrical, windows and waterproofing.",
              "Associations can no longer waive or underfund reserves for the structural items identified in that study.",
            ],
          },
          {
            h: "What it means for your budget",
            p: [
              "In some buildings, catching up on reserves and repairs has meant higher monthly fees or special assessments. It's important to know that insurance generally doesn't pay for these: repairs required by an inspection, deferred maintenance and reserve funding are the association's costs, passed on to owners.",
            ],
          },
          {
            h: "Who insures what",
            p: [
              "The association's master policy covers the building's structure and common elements. Florida law leaves certain items inside your unit out of the master policy, so they're yours to insure, including floor, wall and ceiling coverings, electrical fixtures, appliances, water heaters and water filters, built-in cabinets and countertops, and window treatments.",
              "Your condo policy (HO-6) covers those items, plus your personal belongings, your personal liability and additional living expenses if a covered loss forces you out of your unit. Your association's documents can change the details, so it's worth having us review them when we quote.",
            ],
          },
          {
            h: "Loss assessment coverage",
            p: [
              "When a covered loss to the building or common areas costs more than the master policy pays, for example because of the association's large hurricane deductible, the association can assess every owner for a share. Loss assessment coverage on your HO-6 can help pay your share, up to its limit.",
              "Florida requires every HO-6 policy to include at least $2,000 of loss assessment coverage. In a building with a large master-policy deductible, your share of a single hurricane claim can be far more than that, so many owners choose a higher limit. Some policies limit coverage for assessments that come from the master policy's deductible, so read the details or ask us.",
            ],
          },
          {
            h: "A quick checklist for condo owners",
            p: ["Before your next renewal:"],
            list: [
              "Get a copy of the association's master policy declarations and note its hurricane deductible.",
              "Ask the association about its milestone inspection, reserve study and any planned assessments.",
              "Check that your HO-6 covers the interior items Florida law leaves to unit owners.",
              "Consider raising your loss assessment limit.",
              "If you're on a lower floor, price flood coverage for your unit's contents.",
            ],
          },
        ],
        faq: [
          {
            q: "Does my condo insurance pay for special assessments?",
            a: "Only for assessments caused by a covered loss, such as storm damage to common areas, up to your loss assessment limit. Assessments for inspections, repairs, upgrades or required reserves generally aren't covered.",
          },
          {
            q: "How much loss assessment coverage do I need?",
            a: "Florida requires at least $2,000. A good starting point is to estimate your share of the association's hurricane deductible, which your association can tell you, and choose a limit that covers it.",
          },
          {
            q: "Do I need flood insurance in a condo?",
            a: "The association may insure the building against flood, but your unit's interior items and belongings need your own flood coverage. It matters most on lower floors.",
          },
          {
            q: "Which condo buildings need a milestone inspection?",
            a: "Generally condo buildings three stories or taller once they reach 30 years old, with re-inspections every 10 years. Local governments can require the first inspection sooner, for example for buildings near the coast.",
          },
        ],
        relatedLabel: "Get a Florida condo insurance quote",
      },
      es: {
        title: "Seguro de Condominio en Florida Tras las Nuevas Leyes de Seguridad",
        description:
          "Qué significan las leyes de seguridad de condominios de Florida para los dueños, qué cubre la póliza de la asociación frente a su HO-6 y por qué importa la cobertura de evaluación por pérdidas.",
        intro:
          "Desde el colapso del condominio en Surfside en 2021, Florida ha aprobado nuevas leyes de seguridad para los edificios de condominios. Están cambiando los presupuestos de las asociaciones y, con ellos, lo que los dueños de condominios deben buscar en su propio seguro.",
        takeaways: [
          "Muchos edificios de condominios antiguos ahora necesitan inspecciones estructurales periódicas y estudios de reservas estructurales.",
          "Eso ha subido las cuotas de las asociaciones y ha llevado a derramas especiales en algunos edificios. El seguro no paga mantenimiento ni reservas.",
          "La póliza maestra de la asociación cubre el edificio; su HO-6 cubre los elementos interiores, sus pertenencias y su responsabilidad civil.",
          "Florida exige que las pólizas HO-6 incluyan al menos $2,000 de cobertura de evaluación por pérdidas, y a muchos dueños les conviene tener más.",
        ],
        sections: [
          {
            h: "Qué cambió después de Surfside",
            p: [
              "Después del colapso de Champlain Towers South en junio de 2021, Florida aprobó leyes de seguridad para condominios a partir de 2022. Los principales requisitos para edificios de condominios de tres pisos o más:",
            ],
            list: [
              "Una inspección estructural periódica cuando el edificio cumple 30 años (los gobiernos locales pueden exigirla antes, por ejemplo cerca del agua salada), y cada 10 años después.",
              "Un estudio de reservas de integridad estructural al menos cada 10 años, que incluye elementos como el techo, la estructura, la protección contra incendios, la plomería, el sistema eléctrico, las ventanas y la impermeabilización.",
              "Las asociaciones ya no pueden renunciar a las reservas ni financiarlas por debajo de lo necesario para los elementos estructurales identificados en ese estudio.",
            ],
          },
          {
            h: "Qué significa para su presupuesto",
            p: [
              "En algunos edificios, ponerse al día con las reservas y las reparaciones ha significado cuotas mensuales más altas o derramas especiales. Es importante saber que el seguro generalmente no paga estos costos: las reparaciones exigidas por una inspección, el mantenimiento atrasado y el financiamiento de reservas son costos de la asociación que se trasladan a los dueños.",
            ],
          },
          {
            h: "Quién asegura qué",
            p: [
              "La póliza maestra de la asociación cubre la estructura del edificio y las áreas comunes. La ley de Florida deja fuera de la póliza maestra ciertos elementos dentro de su unidad, así que le corresponde a usted asegurarlos, incluidos los revestimientos de pisos, paredes y techos, los accesorios eléctricos, los electrodomésticos, los calentadores y filtros de agua, los gabinetes y encimeras empotrados y las cortinas o persianas.",
              "Su póliza de condominio (HO-6) cubre esos elementos, más sus pertenencias, su responsabilidad civil y los gastos adicionales de vivienda si una pérdida cubierta le obliga a salir de su unidad. Los documentos de su asociación pueden cambiar los detalles, así que vale la pena que los revisemos al cotizar.",
            ],
          },
          {
            h: "Cobertura de evaluación por pérdidas",
            p: [
              "Cuando una pérdida cubierta en el edificio o en las áreas comunes cuesta más de lo que paga la póliza maestra, por ejemplo por el alto deducible por huracán de la asociación, la asociación puede cobrar una parte a cada dueño. La cobertura de evaluación por pérdidas de su HO-6 puede ayudarle a pagar su parte, hasta su límite.",
              "Florida exige que toda póliza HO-6 incluya al menos $2,000 de cobertura de evaluación por pérdidas. En un edificio con un deducible alto en la póliza maestra, su parte de un solo reclamo por huracán puede ser mucho mayor, por lo que muchos dueños eligen un límite más alto. Algunas pólizas limitan la cobertura de las derramas que provienen del deducible de la póliza maestra, así que lea los detalles o pregúntenos.",
            ],
          },
          {
            h: "Una lista rápida para dueños de condominio",
            p: ["Antes de su próxima renovación:"],
            list: [
              "Pida una copia de las declaraciones de la póliza maestra de la asociación y anote su deducible por huracán.",
              "Pregunte a la asociación sobre su inspección estructural, su estudio de reservas y cualquier derrama prevista.",
              "Confirme que su HO-6 cubre los elementos interiores que la ley de Florida deja a cargo de los dueños.",
              "Considere aumentar su límite de evaluación por pérdidas.",
              "Si vive en un piso bajo, cotice cobertura contra inundaciones para el contenido de su unidad.",
            ],
          },
        ],
        faq: [
          {
            q: "¿Mi seguro de condominio paga las derramas especiales?",
            a: "Solo las derramas causadas por una pérdida cubierta, como daños por tormenta en las áreas comunes, hasta su límite de evaluación por pérdidas. Las derramas por inspecciones, reparaciones, mejoras o reservas obligatorias generalmente no están cubiertas.",
          },
          {
            q: "¿Cuánta cobertura de evaluación por pérdidas necesito?",
            a: "Florida exige al menos $2,000. Un buen punto de partida es calcular su parte del deducible por huracán de la asociación, que la asociación puede indicarle, y elegir un límite que la cubra.",
          },
          {
            q: "¿Necesito seguro contra inundaciones en un condominio?",
            a: "La asociación puede asegurar el edificio contra inundaciones, pero los elementos interiores de su unidad y sus pertenencias necesitan su propia cobertura contra inundaciones. Importa sobre todo en los pisos bajos.",
          },
          {
            q: "¿Qué edificios de condominios necesitan una inspección estructural periódica?",
            a: "Generalmente los edificios de condominios de tres pisos o más cuando cumplen 30 años, con nuevas inspecciones cada 10 años. Los gobiernos locales pueden exigir la primera inspección antes, por ejemplo en edificios cerca de la costa.",
          },
        ],
        relatedLabel: "Cotice su seguro de condominio en Florida",
      },
    },
  },

  /* ──────────────────────────────────────────────────────────────── */
  {
    slug: "florida-aca-open-enrollment",
    related: "/health-insurance",
    copy: {
      en: {
        title: "Florida ACA Open Enrollment: Dates and How to Get Help",
        description:
          "When Florida's Affordable Care Act Open Enrollment starts, the December 15 deadline for January 1 coverage, special enrollment periods and free help in English and Spanish.",
        intro:
          "Florida uses HealthCare.gov, the federal Health Insurance Marketplace, for Affordable Care Act (ACA) plans. Here's when you can enroll, what you'll need, and how to get help choosing a plan at no extra cost.",
        takeaways: [
          "Open Enrollment starts November 1.",
          "Enroll by December 15 for coverage that starts January 1. Check HealthCare.gov for this year's final deadline, since dates have changed in recent years.",
          "Outside Open Enrollment you need a qualifying life event to enroll.",
          "Enrolling through a licensed agent doesn't cost you more: the premium is the same.",
        ],
        sections: [
          {
            h: "How the Marketplace works in Florida",
            p: [
              "Marketplace plans are sold by private insurance companies but follow federal rules: they cover a standard set of essential health benefits, and you can't be turned down or charged more because of a pre-existing condition. Plans are grouped into metal levels (Bronze, Silver, Gold and Platinum) based on how costs are split between you and the plan.",
            ],
          },
          {
            h: "When you can enroll",
            p: [
              "Open Enrollment for the coming year starts on November 1. To have coverage that starts on January 1, enroll by December 15. HealthCare.gov publishes the final deadline for each year, and it has changed in recent years, so check it rather than counting on a January deadline.",
              "During Open Enrollment you can also switch plans or update your information. If you already have a Marketplace plan, review it every year: premiums, networks and your financial help can all change.",
            ],
          },
          {
            h: "Special Enrollment Periods",
            p: [
              "Outside Open Enrollment, you can enroll only after a qualifying life event, usually within 60 days of it. Common examples:",
            ],
            list: [
              "Losing other health coverage, such as a job-based plan or Medicaid.",
              "Moving to a new area where different plans are available.",
              "Getting married, or having or adopting a child.",
            ],
          },
          {
            h: "Financial help",
            p: [
              "Many Florida families qualify for premium tax credits that lower their monthly payment, and some also qualify for lower out-of-pocket costs on Silver plans. The amount depends on your household's expected income, household size and the federal rules for that year, which have changed recently. We'll calculate your exact amount for the current year before you choose a plan.",
              "If your income changes during the year, report it so your help is adjusted; otherwise you may owe money, or get money back, when you file your taxes.",
            ],
          },
          {
            h: "What to have ready",
            p: ["Enrollment goes faster if you have:"],
            list: [
              "Social Security numbers, or immigration documents, for everyone applying.",
              "An estimate of your household income for the coming year (recent pay stubs or last year's tax return help).",
              "Information about any coverage you have now, including job-based coverage you were offered.",
              "A list of your doctors and prescriptions, so we can check which plans include them.",
            ],
          },
          {
            h: "Free help, in English or Spanish",
            p: [
              "Licensed agents are paid by the insurance companies, so your premium is the same whether you enroll on your own or with us. We compare plans side by side, check that your doctors and prescriptions are covered, and help with the application and any follow-up documents, in English or Spanish.",
            ],
          },
        ],
        faq: [
          {
            q: "Does it cost more to enroll through an insurance agent?",
            a: "No. Marketplace premiums are the same whether you enroll on your own or through a licensed agent. Agents are paid by the insurance companies.",
          },
          {
            q: "What if I miss the Open Enrollment deadline?",
            a: "You'll need a qualifying life event, such as losing other coverage or moving, to enroll before the next Open Enrollment. Call us and we'll check whether you qualify.",
          },
          {
            q: "Do I have to re-enroll every year?",
            a: "Many plans renew automatically, but you should still review your coverage every Open Enrollment, because premiums, networks and your financial help can change from year to year.",
          },
          {
            q: "Can you help me in Spanish?",
            a: "Yes. Our whole team is bilingual and can walk you through every step of the application in Spanish.",
          },
        ],
        relatedLabel: "Get free help with Florida health insurance",
      },
      es: {
        title: "Inscripción Abierta del ACA en Florida: Fechas y Cómo Obtener Ayuda",
        description:
          "Cuándo empieza la Inscripción Abierta de la Ley de Cuidado de Salud Asequible en Florida, la fecha límite del 15 de diciembre para cobertura desde el 1 de enero, los períodos especiales y ayuda gratis en español.",
        intro:
          "Florida usa HealthCare.gov, el Mercado de Seguros Médicos federal, para los planes de la Ley de Cuidado de Salud Asequible (ACA). Aquí le explicamos cuándo puede inscribirse, qué necesita y cómo obtener ayuda para elegir un plan sin costo adicional.",
        takeaways: [
          "La Inscripción Abierta empieza el 1 de noviembre.",
          "Inscríbase a más tardar el 15 de diciembre para tener cobertura desde el 1 de enero. Revise HealthCare.gov para conocer la fecha límite final de este año, ya que las fechas han cambiado en los últimos años.",
          "Fuera de la Inscripción Abierta necesita un evento de vida que califique para inscribirse.",
          "Inscribirse con un agente con licencia no le cuesta más: la prima es la misma.",
        ],
        sections: [
          {
            h: "Cómo funciona el Mercado en Florida",
            p: [
              "Los planes del Mercado los venden compañías de seguros privadas, pero siguen reglas federales: cubren un conjunto estándar de beneficios de salud esenciales, y no se le puede negar la cobertura ni cobrar más por una condición preexistente. Los planes se agrupan en niveles (Bronce, Plata, Oro y Platino) según cómo se reparten los costos entre usted y el plan.",
            ],
          },
          {
            h: "Cuándo puede inscribirse",
            p: [
              "La Inscripción Abierta para el próximo año empieza el 1 de noviembre. Para tener cobertura desde el 1 de enero, inscríbase a más tardar el 15 de diciembre. HealthCare.gov publica la fecha límite final de cada año, y ha cambiado en los últimos años, así que revísela en lugar de contar con una fecha límite en enero.",
              "Durante la Inscripción Abierta también puede cambiar de plan o actualizar su información. Si ya tiene un plan del Mercado, revíselo cada año: las primas, las redes de médicos y su ayuda financiera pueden cambiar.",
            ],
          },
          {
            h: "Períodos de Inscripción Especial",
            p: [
              "Fuera de la Inscripción Abierta, solo puede inscribirse después de un evento de vida que califique, normalmente dentro de los 60 días siguientes. Ejemplos comunes:",
            ],
            list: [
              "Perder otra cobertura de salud, como un plan del trabajo o Medicaid.",
              "Mudarse a una zona nueva donde hay otros planes disponibles.",
              "Casarse, o tener o adoptar un hijo.",
            ],
          },
          {
            h: "Ayuda financiera",
            p: [
              "Muchas familias de Florida califican para créditos tributarios que reducen su pago mensual, y algunas también califican para costos de bolsillo más bajos en los planes Plata. La cantidad depende de los ingresos esperados de su hogar, el tamaño del hogar y las reglas federales de ese año, que han cambiado recientemente. Calcularemos su cantidad exacta para el año en curso antes de que elija un plan.",
              "Si sus ingresos cambian durante el año, repórtelo para que se ajuste su ayuda; de lo contrario, podría deber dinero o recibir un reembolso al declarar sus impuestos.",
            ],
          },
          {
            h: "Qué tener a mano",
            p: ["La inscripción es más rápida si tiene:"],
            list: [
              "Números de Seguro Social, o documentos de inmigración, de todas las personas que solicitan.",
              "Un cálculo de los ingresos de su hogar para el próximo año (ayudan los talones de pago recientes o la declaración de impuestos del año pasado).",
              "Información sobre cualquier cobertura que tenga ahora, incluida la cobertura que le ofrezca su trabajo.",
              "Una lista de sus médicos y medicamentos, para revisar qué planes los incluyen.",
            ],
          },
          {
            h: "Ayuda gratis, en español o inglés",
            p: [
              "A los agentes con licencia les pagan las compañías de seguros, así que su prima es la misma si se inscribe por su cuenta o con nosotros. Comparamos planes lado a lado, confirmamos que sus médicos y medicamentos estén cubiertos y le ayudamos con la solicitud y cualquier documento posterior, en español o inglés.",
            ],
          },
        ],
        faq: [
          {
            q: "¿Cuesta más inscribirse con un agente de seguros?",
            a: "No. Las primas del Mercado son las mismas si se inscribe por su cuenta o con un agente con licencia. A los agentes les pagan las compañías de seguros.",
          },
          {
            q: "¿Qué pasa si no me inscribo antes de la fecha límite?",
            a: "Necesitará un evento de vida que califique, como perder otra cobertura o mudarse, para inscribirse antes de la próxima Inscripción Abierta. Llámenos y revisamos si califica.",
          },
          {
            q: "¿Tengo que volver a inscribirme cada año?",
            a: "Muchos planes se renuevan automáticamente, pero aun así debe revisar su cobertura en cada Inscripción Abierta, porque las primas, las redes y su ayuda financiera pueden cambiar de un año a otro.",
          },
          {
            q: "¿Pueden ayudarme en español?",
            a: "Sí. Todo nuestro equipo es bilingüe y puede guiarle en cada paso de la solicitud en español.",
          },
        ],
        relatedLabel: "Obtenga ayuda gratis con su seguro de salud",
      },
    },
  },
];

export const guideBySlug = (slug: string) => GUIDES.find((g) => g.slug === slug);
export const guideSlugs = () => GUIDES.map((g) => ({ slug: g.slug }));
