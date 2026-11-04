// FAQ content, shared by the FAQ page and its FAQPage structured data.
import type { Lang } from "@/lib/i18n";

export type FaqCategory = { category: string; questions: { q: string; a: string }[] };

export const faqs: FaqCategory[] = [
  {
    category: "General",
    questions: [
      {
        q: "What types of insurance do you offer?",
        a: "We offer a comprehensive range of insurance products including Auto Insurance, Home Insurance, Commercial Insurance, and Health Insurance. As independent brokers, we work with 100+ carriers to find you the best coverage at the lowest rates.",
      },
      {
        q: "How long has Universal Insurance Brokers been in business?",
        a: "Universal Insurance Brokers has been proudly serving Florida since 2016. With over 10 years of experience in the insurance industry, we've built strong relationships with carriers and a deep understanding of our clients' needs.",
      },
      {
        q: "What areas do you serve?",
        a: "We serve all of Florida with office locations in Boca Raton, Lehigh Acres, Homestead, and Hialeah. We can also assist clients remotely via phone and email.",
      },
      {
        q: "What makes you different from other insurance agencies?",
        a: "As independent brokers, we're not tied to any single insurance company. We shop 100+ carriers to find you the best coverage at the most competitive price. We also offer 100% satisfaction guaranteed with free rate revisions anytime.",
      },
    ],
  },
  {
    category: "Auto Insurance",
    questions: [
      {
        q: "How fast can I get an auto insurance quote?",
        a: "You can get a real price on your auto insurance in under 10 minutes! We provide on-the-spot quotes by comparing rates from 100+ carriers simultaneously.",
      },
      {
        q: "What factors affect my auto insurance rate?",
        a: "Several factors determine your rate including your driving record, age, vehicle type, location, credit score, coverage limits, and deductible choices. We help you understand each factor and find the best rate.",
      },
      {
        q: "Can you help if I have a poor driving record?",
        a: "Absolutely! Because we work with multiple carriers, we can often find competitive rates even for drivers with accidents, tickets, or DUI/DWI on their records. We specialize in finding coverage for all driver profiles.",
      },
      {
        q: "Do I need an SR-22?",
        a: "If you've had your license suspended or been convicted of certain offenses, you may need an SR-22 filing. We can help you obtain SR-22 insurance quickly and affordably.",
      },
    ],
  },
  {
    category: "Home Insurance",
    questions: [
      {
        q: "What does homeowners insurance cover?",
        a: "Standard homeowners insurance typically covers your dwelling, personal property, liability, and additional living expenses if your home becomes uninhabitable. We can also add endorsements for flood, hurricane, and other specific coverages.",
      },
      {
        q: "Do I need flood insurance in Florida?",
        a: "While not always required, flood insurance is highly recommended in Florida. Standard homeowners policies do not cover flood damage. We can help you determine your flood risk and find affordable flood coverage.",
      },
      {
        q: "Do you offer renters insurance?",
        a: "Yes! We offer renters insurance that protects your personal belongings and provides liability coverage. It's affordable and highly recommended for all tenants.",
      },
    ],
  },
  {
    category: "Commercial Insurance",
    questions: [
      {
        q: "What types of businesses do you insure?",
        a: "We provide coverage for over 10,000 business types including restaurants, contractors, retail stores, offices, trucking companies, and many more. No matter your industry, we can find the right coverage.",
      },
      {
        q: "What commercial policies do you offer?",
        a: "We offer General Liability, Workers' Compensation, Commercial Auto, Business Property, Professional Liability (E&O), Commercial Umbrella, and Business Owners Policy (BOP) among others.",
      },
      {
        q: "How quickly can I get a commercial insurance quote?",
        a: "Many commercial quotes can be provided same-day. More complex risks may take 24-48 hours as we shop multiple carriers to ensure you get the best coverage and pricing.",
      },
    ],
  },
  {
    category: "Health Insurance",
    questions: [
      {
        q: "Is there really no cost for your health insurance services?",
        a: "That's correct! Through the Affordable Care Act (ACA), our health insurance advisory services are provided at zero cost to you. We help you navigate the marketplace and find the plan that fits your needs and budget.",
      },
      {
        q: "When can I enroll in health insurance?",
        a: "Open enrollment typically runs from November 1 to January 15 each year. However, you may qualify for a Special Enrollment Period due to life events such as marriage, birth of a child, loss of coverage, or moving.",
      },
      {
        q: "Can you help me with Medicare?",
        a: "Yes, we can help you understand your Medicare options including Medicare Advantage, Medicare Supplement (Medigap), and Part D prescription drug plans.",
      },
    ],
  },
  {
    category: "Billing & Claims",
    questions: [
      {
        q: "What payment methods do you accept?",
        a: "Payment methods vary by carrier but typically include credit/debit cards, electronic bank transfers (EFT), checks, and online payment portals. We'll help you set up the most convenient payment option.",
      },
      {
        q: "How do I file a claim?",
        a: "You can contact your insurance carrier directly or call our office and we'll guide you through the claims process. We're here to advocate for you every step of the way.",
      },
      {
        q: "Can I change my coverage mid-policy?",
        a: "Yes! You can make changes to your coverage at any time. Contact us and we'll help you adjust your policy to meet your current needs. We also offer free rate revisions anytime.",
      },
    ],
  },
];

export const faqsEs: FaqCategory[] = [
  {
    category: "General",
    questions: [
      {
        q: "¿Qué tipos de seguro ofrecen?",
        a: "Ofrecemos una amplia variedad de productos de seguro, incluidos Seguro de Auto, Seguro de Hogar, Seguro Comercial y Seguro de Salud. Como corredores independientes, trabajamos con más de 100 aseguradoras para encontrarle la mejor cobertura a las tarifas más bajas.",
      },
      {
        q: "¿Desde cuándo opera Universal Insurance Brokers?",
        a: "Universal Insurance Brokers se enorgullece de servir a Florida desde 2016. Con más de 10 años de experiencia en la industria de seguros, hemos construido sólidas relaciones con las aseguradoras y un profundo conocimiento de las necesidades de nuestros clientes.",
      },
      {
        q: "¿Qué áreas atienden?",
        a: "Atendemos todo el estado de Florida, con oficinas en Boca Raton, Lehigh Acres, Homestead y Hialeah. También podemos atender a nuestros clientes a distancia por teléfono y correo electrónico.",
      },
      {
        q: "¿Qué los diferencia de otras agencias de seguros?",
        a: "Como corredores independientes, no estamos atados a ninguna compañía de seguros. Comparamos más de 100 aseguradoras para encontrarle la mejor cobertura al precio más competitivo. Además, le ofrecemos 100% de satisfacción garantizada con revisiones de tarifa gratuitas en cualquier momento.",
      },
    ],
  },
  {
    category: "Seguro de Auto",
    questions: [
      {
        q: "¿Qué tan rápido puedo obtener una cotización de seguro de auto?",
        a: "¡Puede obtener un precio real de su seguro de auto en menos de 10 minutos! Le damos cotizaciones al instante comparando simultáneamente las tarifas de más de 100 aseguradoras.",
      },
      {
        q: "¿Qué factores influyen en la tarifa de mi seguro de auto?",
        a: "Varios factores determinan su tarifa, entre ellos su historial de manejo, su edad, el tipo de vehículo, su ubicación, su puntaje de crédito, los límites de cobertura y el deducible que elija. Le ayudamos a entender cada factor y a encontrar la mejor tarifa.",
      },
      {
        q: "¿Pueden ayudarme si tengo un mal historial de manejo?",
        a: "¡Por supuesto! Como trabajamos con múltiples aseguradoras, a menudo podemos encontrar tarifas competitivas incluso para conductores con accidentes, multas o un DUI/DWI (manejar bajo la influencia de alcohol o drogas) en su historial. Nos especializamos en encontrar cobertura para todo tipo de conductor.",
      },
      {
        q: "¿Necesito un SR-22?",
        a: "Si le suspendieron la licencia o fue condenado por ciertas infracciones, es posible que necesite presentar un SR-22. Podemos ayudarle a obtener un seguro con SR-22 de forma rápida y económica.",
      },
    ],
  },
  {
    category: "Seguro de Hogar",
    questions: [
      {
        q: "¿Qué cubre el seguro de hogar?",
        a: "Un seguro de hogar estándar normalmente cubre la vivienda, sus bienes personales, la responsabilidad civil y los gastos de vida adicionales si su casa queda inhabitable. También podemos agregar endosos para inundación, huracán y otras coberturas específicas.",
      },
      {
        q: "¿Necesito seguro contra inundaciones en Florida?",
        a: "Aunque no siempre es obligatorio, el seguro contra inundaciones es muy recomendable en Florida. Las pólizas de hogar estándar no cubren los daños por inundación. Podemos ayudarle a determinar su riesgo de inundación y a encontrar una cobertura contra inundaciones asequible.",
      },
      {
        q: "¿Ofrecen seguro para inquilinos?",
        a: "¡Sí! Ofrecemos seguro para inquilinos que protege sus pertenencias personales e incluye cobertura de responsabilidad civil. Es económico y muy recomendable para todos los inquilinos.",
      },
    ],
  },
  {
    category: "Seguro Comercial",
    questions: [
      {
        q: "¿Qué tipos de negocios aseguran?",
        a: "Ofrecemos cobertura para más de 10,000 tipos de negocios, incluidos restaurantes, contratistas, tiendas minoristas, oficinas, compañías de transporte de carga y muchos más. Sin importar su industria, podemos encontrar la cobertura adecuada.",
      },
      {
        q: "¿Qué pólizas comerciales ofrecen?",
        a: "Ofrecemos, entre otras, Responsabilidad Civil General, Compensación Laboral, Auto Comercial, Propiedad Comercial, Responsabilidad Civil Profesional (E&O, Errores y Omisiones), Póliza Paraguas Comercial y Póliza para Dueños de Negocios (BOP).",
      },
      {
        q: "¿Qué tan rápido puedo obtener una cotización de seguro comercial?",
        a: "Muchas cotizaciones comerciales se pueden entregar el mismo día. Los riesgos más complejos pueden tardar de 24 a 48 horas, ya que comparamos varias aseguradoras para asegurarnos de que obtenga la mejor cobertura y el mejor precio.",
      },
    ],
  },
  {
    category: "Seguro de Salud",
    questions: [
      {
        q: "¿De verdad sus servicios de seguro de salud no tienen costo?",
        a: "¡Así es! A través de la Ley de Cuidado de Salud Asequible (ACA), nuestros servicios de asesoría en seguros de salud no tienen ningún costo para usted. Le ayudamos a navegar el Mercado de Seguros Médicos y a encontrar el plan que se ajuste a sus necesidades y a su presupuesto.",
      },
      {
        q: "¿Cuándo puedo inscribirme en un seguro de salud?",
        a: "La inscripción abierta normalmente va del 1 de noviembre al 15 de enero de cada año. Sin embargo, usted podría calificar para un Período de Inscripción Especial por eventos de vida como matrimonio, el nacimiento de un hijo, la pérdida de cobertura o una mudanza.",
      },
      {
        q: "¿Pueden ayudarme con Medicare?",
        a: "Sí, podemos ayudarle a entender sus opciones de Medicare, incluidos Medicare Advantage, Medicare Suplementario (Medigap) y los planes de medicamentos recetados de la Parte D.",
      },
    ],
  },
  {
    category: "Pagos y Reclamaciones",
    questions: [
      {
        q: "¿Qué métodos de pago aceptan?",
        a: "Los métodos de pago varían según la aseguradora, pero normalmente incluyen tarjetas de crédito/débito, transferencias bancarias electrónicas (EFT), cheques y portales de pago en línea. Le ayudaremos a configurar la opción de pago más conveniente.",
      },
      {
        q: "¿Cómo presento una reclamación?",
        a: "Puede comunicarse directamente con su aseguradora o llamar a nuestra oficina y le guiaremos en el proceso de reclamación. Estamos aquí para defender sus intereses en cada paso del camino.",
      },
      {
        q: "¿Puedo cambiar mi cobertura antes de que termine la póliza?",
        a: "¡Sí! Puede hacer cambios a su cobertura en cualquier momento. Comuníquese con nosotros y le ayudaremos a ajustar su póliza a sus necesidades actuales. También ofrecemos revisiones de tarifa gratuitas en cualquier momento.",
      },
    ],
  },
];

export const faqsByLang: Record<Lang, FaqCategory[]> = { en: faqs, es: faqsEs };
