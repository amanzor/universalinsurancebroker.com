"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Building2,
  Truck,
  Briefcase,
  ChefHat,
  HardHat,
  Shield,
  Building,
  Wrench,
  Umbrella,
  Phone,
  ArrowRight,
  FileCheck,
  MapPin,
  Users,
  Car,
  Scale,
  Lock,
  FileText,
  Store,
  ClipboardList,
  Search,
  RefreshCw,
  CircleCheck,
  ChevronDown,
} from "lucide-react";
import { cn, asset } from "@/lib/utils";
import { COMPANY } from "@/lib/constants";
import { useLang, useT, useLocalizePath } from "@/lib/useLang";
import { faq } from "@/lib/content/commercial-insurance";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

// Products a client can buy / quote entirely online.
// Add another object here to drop a new tile + button into the "Get Your
// Business Insured Online Now!" grid — no other changes needed.
const onlineProducts = [
  {
    icon: Shield,
    title: { en: "General Liability", es: "Responsabilidad General" },
    description: {
      en: "Powered by Coterie Insurance — get a fast, affordable General Liability quote online in minutes.",
      es: "Con la tecnología de Coterie Insurance — obtenga en minutos una cotización de Responsabilidad General rápida y económica en línea.",
    },
    buttonLabel: { en: "Coterie Insurance", es: "Coterie Insurance" },
    href: "https://app.coterieinsurance.com/quote?p=universalinsurancebroker%40gmail.com",
  },
  {
    icon: FileCheck,
    title: { en: "Surety & Fidelity Bonds", es: "Fianzas de Garantía y Fidelidad" },
    description: {
      en: "Powered by Propeller — apply and get your bond issued in minutes, with the widest selection of instant-issue bonds on the market.",
      es: "Con la tecnología de Propeller — solicite y obtenga su fianza emitida en minutos, con la mayor selección de fianzas de emisión inmediata del mercado.",
    },
    buttonLabel: { en: "Bond Quote/Purchase", es: "Cotizar/Comprar Fianza" },
    href: "https://universalbrokers.propeller.insure/axelerator-public/",
  },
];

const policyTypes = [
  {
    icon: Truck,
    title: { en: "Commercial Auto & Fleet", es: "Auto Comercial y Flotas" },
    description: {
      en: "Any type of commercial auto, fleet and non-fleet with no experience requirement. Only A-rated carriers for fleets.",
      es: "Cualquier tipo de auto comercial, con o sin flota, sin requisito de experiencia. Solo aseguradoras con calificación A para flotas.",
    },
  },
  {
    icon: Briefcase,
    title: { en: "Professional Liability", es: "Responsabilidad Profesional" },
    description: {
      en: "Doctors malpractice, Errors & Omissions, and all professional liabilities with top-rated carriers.",
      es: "Negligencia médica, Errores y Omisiones (E&O) y todo tipo de responsabilidad profesional con aseguradoras de primer nivel.",
    },
  },
  {
    icon: ChefHat,
    title: { en: "Restaurants & Bars", es: "Restaurantes y Bares" },
    description: {
      en: "Liquor liability and full commercial package policies at the lowest rates.",
      es: "Responsabilidad por venta de alcohol y pólizas comerciales completas con las tarifas más bajas.",
    },
  },
  {
    icon: HardHat,
    title: { en: "Workers Compensation", es: "Compensación Laboral" },
    description: {
      en: "Available for every occupation with flexible pay plans. Can merge with ADP payroll.",
      es: "Disponible para todas las ocupaciones con planes de pago flexibles. Se puede integrar con la nómina de ADP.",
    },
  },
  {
    icon: Shield,
    title: { en: "General Liability", es: "Responsabilidad General" },
    description: {
      en: "Instant quotes from Hiscox and Next Insurance.",
      es: "Cotizaciones instantáneas de Hiscox y Next Insurance.",
    },
  },
  {
    icon: Building,
    title: { en: "Commercial Property", es: "Propiedad Comercial" },
    description: {
      en: "Package or standalone policies. Dedicated team for large accounts.",
      es: "Pólizas combinadas o independientes. Equipo dedicado para cuentas grandes.",
    },
  },
  {
    icon: Wrench,
    title: { en: "Contractors Equipment", es: "Equipo de Contratistas" },
    description: {
      en: "Floater policies for all tools and equipment covering job sites and vehicles.",
      es: "Pólizas flotantes para todas sus herramientas y equipos, con cobertura en obras y vehículos.",
    },
  },
  {
    icon: Umbrella,
    title: { en: "Umbrella Policies", es: "Pólizas Paraguas" },
    description: {
      en: "Personal and commercial umbrellas with the nation's largest umbrella carrier.",
      es: "Pólizas paraguas personales y comerciales con la aseguradora de pólizas paraguas más grande del país.",
    },
  },
  {
    icon: Building2,
    title: { en: "Car Dealer Insurance", es: "Seguro para Concesionarios" },
    description: {
      en: "Garage keeper and bond available with 100+ carriers including A+ to B rated options.",
      es: "Cobertura de garage keeper y fianzas disponibles con más de 100 aseguradoras, con opciones de calificación A+ a B.",
    },
  },
];

// "Which coverage does my business need?" — situation → coverage guide.
const coverageGuide = [
  {
    icon: MapPin,
    situation: {
      en: "Customers or vendors visit your location",
      es: "Clientes o proveedores visitan su local",
    },
    coverage: { en: "General Liability", es: "Responsabilidad Civil General" },
    description: {
      en: "Generally covers claims that your business caused bodily injury or property damage to someone else, like a customer slipping on a wet floor. Many landlords and clients ask for it before you sign a lease or contract.",
      es: "Generalmente cubre reclamaciones porque su negocio causó lesiones corporales o daños a la propiedad de otra persona, como un cliente que se resbala en un piso mojado. Muchos arrendadores y clientes la piden antes de firmar un contrato de arrendamiento o de servicios.",
    },
  },
  {
    icon: Building,
    situation: {
      en: "You own or lease a building, equipment or inventory",
      es: "Es dueño o arrienda un local, equipos o inventario",
    },
    coverage: { en: "Commercial Property", es: "Propiedad Comercial" },
    description: {
      en: "Helps protect your building, furniture, equipment and stock. In Florida, windstorm deductibles may be a percentage of the insured value, and flood is generally excluded and purchased separately, so it pays to review both.",
      es: "Ayuda a proteger su local, mobiliario, equipos e inventario. En Florida, los deducibles por tormenta de viento pueden ser un porcentaje del valor asegurado, y las inundaciones generalmente están excluidas y se contratan por separado, por lo que conviene revisar ambos puntos.",
    },
  },
  {
    icon: Users,
    situation: { en: "You have employees", es: "Tiene empleados" },
    coverage: { en: "Workers' Compensation", es: "Compensación Laboral" },
    description: {
      en: "Generally pays for medical care and lost wages when an employee is hurt on the job, and is required for many Florida employers (see below).",
      es: "Generalmente paga la atención médica y los salarios perdidos cuando un empleado se lesiona en el trabajo, y es obligatoria para muchos empleadores en Florida (vea más abajo).",
    },
  },
  {
    icon: Car,
    situation: {
      en: "Your business owns or uses vehicles",
      es: "Su negocio tiene o usa vehículos",
    },
    coverage: { en: "Commercial Auto", es: "Auto Comercial" },
    description: {
      en: "Covers cars, vans and trucks used for work. If employees drive their own cars on company errands, hired and non-owned auto coverage can help fill the gap.",
      es: "Cubre autos, camionetas y camiones que se usan para trabajar. Si sus empleados usan sus propios autos para diligencias de la empresa, la cobertura de autos alquilados y no propios puede ayudar a cubrir ese vacío.",
    },
  },
  {
    icon: Scale,
    situation: {
      en: "You give advice or provide professional services",
      es: "Ofrece asesoría o servicios profesionales",
    },
    coverage: {
      en: "Professional Liability (E&O)",
      es: "Responsabilidad Profesional (E&O)",
    },
    description: {
      en: "Generally covers claims that a mistake, oversight or missed deadline in your work caused a client a financial loss — something general liability typically doesn't cover.",
      es: "Generalmente cubre reclamaciones porque un error, descuido o plazo incumplido en su trabajo le causó una pérdida económica a un cliente — algo que la responsabilidad civil general normalmente no cubre.",
    },
  },
  {
    icon: Lock,
    situation: {
      en: "You store customer data or take payments",
      es: "Guarda datos de clientes o recibe pagos",
    },
    coverage: { en: "Cyber Liability", es: "Responsabilidad Cibernética" },
    description: {
      en: "Can help with the costs of responding to a data breach or cyberattack, such as notifying customers, restoring systems and defending claims, depending on the policy.",
      es: "Puede ayudar con los costos de responder a una filtración de datos o un ciberataque, como notificar a los clientes, restaurar sistemas y defenderse de reclamaciones, según la póliza.",
    },
  },
  {
    icon: FileText,
    situation: {
      en: "A contract, landlord or client requires proof of insurance",
      es: "Un contrato, arrendador o cliente exige prueba de seguro",
    },
    coverage: {
      en: "Certificates & Additional Insured",
      es: "Certificados y Asegurado Adicional",
    },
    description: {
      en: "We issue certificates of insurance and, when your policy allows, add the other party as an additional insured so you can start the job or move in without delays.",
      es: "Emitimos certificados de seguro y, cuando su póliza lo permite, incluimos a la otra parte como asegurado adicional para que pueda empezar el trabajo o mudarse sin demoras.",
    },
  },
];

const industries = [
  {
    icon: HardHat,
    title: { en: "Contractors & Trades", es: "Contratistas y Oficios" },
    description: {
      en: "General liability, workers' comp, commercial auto and equipment floaters for roofers, electricians, plumbers, HVAC, landscapers and general contractors — plus the certificates job sites ask for.",
      es: "Responsabilidad civil general, compensación laboral, auto comercial y pólizas flotantes de equipo para techadores, electricistas, plomeros, técnicos de aire acondicionado, jardineros y contratistas generales — además de los certificados que piden en las obras.",
    },
  },
  {
    icon: ChefHat,
    title: { en: "Restaurants & Bars", es: "Restaurantes y Bares" },
    description: {
      en: "Package policies that can combine property, general liability and liquor liability if you serve alcohol, with options such as equipment breakdown and food spoilage depending on the carrier.",
      es: "Pólizas combinadas que pueden incluir propiedad, responsabilidad civil general y responsabilidad por venta de alcohol si sirve bebidas alcohólicas, con opciones como avería de equipos y pérdida de alimentos según la aseguradora.",
    },
  },
  {
    icon: Store,
    title: { en: "Retail Stores", es: "Tiendas y Comercios" },
    description: {
      en: "Coverage for your storefront, inventory and customer foot traffic, often through a Business Owner's Policy that can also include business income protection.",
      es: "Cobertura para su local, su inventario y el flujo de clientes, con frecuencia mediante una Póliza para Dueños de Negocio (BOP) que también puede incluir protección por pérdida de ingresos.",
    },
  },
  {
    icon: Truck,
    title: { en: "Trucking & Transportation", es: "Transporte y Camiones" },
    description: {
      en: "Commercial auto for single trucks and fleets, with options like cargo coverage and help with the filings some operations need, depending on what you haul and where.",
      es: "Auto comercial para un solo camión o flotas completas, con opciones como cobertura de carga y ayuda con los registros que algunas operaciones necesitan, según lo que transporte y por dónde.",
    },
  },
  {
    icon: Briefcase,
    title: { en: "Professional Offices", es: "Oficinas Profesionales" },
    description: {
      en: "Professional liability, cyber and office coverage for consultants, accountants, real estate and insurance professionals, medical and other service offices.",
      es: "Responsabilidad profesional, cobertura cibernética y cobertura para oficinas de consultores, contadores, profesionales de bienes raíces y seguros, consultorios médicos y otros negocios de servicios.",
    },
  },
  {
    icon: Building2,
    title: { en: "Auto Dealers", es: "Concesionarios de Autos" },
    description: {
      en: "Garage liability, garagekeepers coverage for customer vehicles in your care, dealer bonds and coverage for your lot and inventory.",
      es: "Responsabilidad de garaje, cobertura garagekeepers para los vehículos de clientes bajo su cuidado, fianzas para concesionarios y cobertura para su lote e inventario.",
    },
  },
];

const quoteSteps = [
  {
    icon: ClipboardList,
    title: { en: "One application", es: "Una sola solicitud" },
    description: {
      en: "Tell us about your business once — what you do, revenue, employees, vehicles and locations. No need to fill out a separate form for every company.",
      es: "Cuéntenos sobre su negocio una sola vez — a qué se dedica, ingresos, empleados, vehículos y ubicaciones. No necesita llenar un formulario distinto para cada compañía.",
    },
  },
  {
    icon: Search,
    title: { en: "We shop many carriers", es: "Comparamos muchas aseguradoras" },
    description: {
      en: "As an independent broker, we compare options from 100+ carriers and explain the differences in coverage, deductibles and exclusions — not just the price.",
      es: "Como corredor independiente, comparamos opciones de más de 100 aseguradoras y le explicamos las diferencias en cobertura, deducibles y exclusiones — no solo el precio.",
    },
  },
  {
    icon: FileCheck,
    title: { en: "Bind and get your certificates", es: "Contrate y reciba sus certificados" },
    description: {
      en: "Once you choose a policy, we help you put coverage in place and send the certificates of insurance your landlords, clients or general contractors request.",
      es: "Cuando elija una póliza, le ayudamos a activar la cobertura y le enviamos los certificados de seguro que le pidan sus arrendadores, clientes o contratistas generales.",
    },
  },
  {
    icon: RefreshCw,
    title: { en: "Review every year", es: "Revisión cada año" },
    description: {
      en: "As you hire, buy equipment, add vehicles or take on bigger contracts, we review your coverage at renewal so it keeps up with your business.",
      es: "A medida que contrata personal, compra equipos, agrega vehículos o consigue contratos más grandes, revisamos su cobertura en cada renovación para que crezca con su negocio.",
    },
  },
];

const copy = {
  en: {
    heroTitle: "Commercial & Business Insurance",
    heroSubtitle:
      "Comprehensive coverage for every type of business — from startups to established enterprises",
    ctaTitle: "Protect Your Business Today",
    ctaText:
      "Our commercial lines team will build a custom insurance package for your business. Get started with a free consultation.",
    ctaButton: "Get a Commercial Quote",
    onlineTitle: "Get Your Business Insured Online Now!",
    onlineText:
      "Buy coverage directly online — fast quotes, instant issue, no waiting. Choose a product below to get started in minutes.",
    linesTitle: "Our Commercial Lines",
    linesText:
      "provides tailored commercial insurance solutions for businesses of all sizes. Explore our coverage options below.",
    guideTitle: "Which Coverage Does My Business Need?",
    guideText:
      "Every business is different, but most coverage needs start with a few simple questions. Find the situations that describe your business — most companies fit more than one.",
    guideNeed: "Consider:",
    wcTitle: "Workers' Compensation in Florida",
    wcP1:
      "Workers' compensation generally pays for medical treatment and a portion of lost wages when an employee is injured on the job, and it can help protect your business from lawsuits over workplace injuries.",
    wcP2:
      "Florida law requires many employers to carry it. As a general rule:",
    wcBullets: [
      "Construction businesses generally need coverage with one or more employees.",
      "Most non-construction businesses generally need coverage once they have four or more employees, full-time or part-time.",
      "Different rules apply to agricultural employers, and some business owners or corporate officers may qualify for an exemption with the state.",
    ],
    wcP3:
      "Because the rules have exceptions and depend on your industry and how your business is set up, it's best to confirm your requirements with an agent. We place workers' comp for virtually every occupation, offer flexible pay plans and can coordinate with ADP payroll.",
    industriesTitle: "Industries We Serve",
    industriesText:
      "From one-person startups to growing companies with fleets and crews, we insure businesses across Florida. A few of the industries we work with most:",
    stepsTitle: "How Quoting Works with an Independent Broker",
    stepsText:
      "Buying business insurance directly means repeating the same paperwork with each company. Working with a broker is simpler:",
    stepsLocal:
      "Our licensed agents work with business owners throughout Florida from our offices in Boca Raton, Lehigh Acres, Homestead and Hialeah, and our team speaks English and Spanish.",
    stepsCta: "Start a commercial quote",
    faqTitle: "Common Questions",
    faqText: "Quick answers about business insurance in Florida.",
    faqMore: "See more answers on our FAQ page",
  },
  es: {
    heroTitle: "Seguros Comerciales y para Negocios",
    heroSubtitle:
      "Cobertura integral para todo tipo de negocio — desde empresas nuevas hasta compañías establecidas",
    ctaTitle: "Proteja su Negocio Hoy",
    ctaText:
      "Nuestro equipo de líneas comerciales diseñará un paquete de seguros a la medida de su negocio. Comience con una consulta gratuita.",
    ctaButton: "Cotizar Seguro Comercial",
    onlineTitle: "¡Asegure su Negocio en Línea Ahora!",
    onlineText:
      "Compre su cobertura directamente en línea — cotizaciones rápidas, emisión inmediata, sin esperas. Elija un producto a continuación y comience en minutos.",
    linesTitle: "Nuestras Líneas Comerciales",
    linesText:
      "ofrece soluciones de seguros comerciales a la medida para negocios de todos los tamaños. Explore nuestras opciones de cobertura a continuación.",
    guideTitle: "¿Qué Cobertura Necesita mi Negocio?",
    guideText:
      "Cada negocio es diferente, pero la mayoría de las necesidades de cobertura empiezan con unas pocas preguntas sencillas. Identifique las situaciones que describen su negocio — la mayoría de las empresas encajan en más de una.",
    guideNeed: "Considere:",
    wcTitle: "Compensación Laboral en Florida",
    wcP1:
      "La compensación laboral generalmente paga el tratamiento médico y una parte de los salarios perdidos cuando un empleado se lesiona en el trabajo, y puede ayudar a proteger a su negocio de demandas por accidentes laborales.",
    wcP2:
      "La ley de Florida exige que muchos empleadores la tengan. Como regla general:",
    wcBullets: [
      "Las empresas de construcción generalmente necesitan cobertura con uno o más empleados.",
      "La mayoría de los negocios que no son de construcción generalmente necesitan cobertura a partir de cuatro o más empleados, a tiempo completo o parcial.",
      "Se aplican reglas diferentes a los empleadores agrícolas, y algunos dueños de negocio o directivos de la empresa podrían calificar para una exención ante el estado.",
    ],
    wcP3:
      "Como las reglas tienen excepciones y dependen de su industria y de cómo está constituido su negocio, lo mejor es confirmar sus requisitos con un agente. Colocamos pólizas de compensación laboral para prácticamente todas las ocupaciones, ofrecemos planes de pago flexibles y podemos coordinar con la nómina de ADP.",
    industriesTitle: "Industrias que Atendemos",
    industriesText:
      "Desde emprendedores que trabajan solos hasta empresas en crecimiento con flotas y cuadrillas, aseguramos negocios en toda Florida. Algunas de las industrias con las que más trabajamos:",
    stepsTitle: "Cómo Funciona la Cotización con un Corredor Independiente",
    stepsText:
      "Comprar un seguro comercial directamente significa repetir el mismo papeleo con cada compañía. Trabajar con un corredor es más sencillo:",
    stepsLocal:
      "Nuestros agentes con licencia atienden a dueños de negocio en toda Florida desde nuestras oficinas en Boca Raton, Lehigh Acres, Homestead y Hialeah, y nuestro equipo habla inglés y español.",
    stepsCta: "Comience una cotización comercial",
    faqTitle: "Preguntas Frecuentes",
    faqText: "Respuestas rápidas sobre seguros para negocios en Florida.",
    faqMore: "Vea más respuestas en nuestra página de preguntas frecuentes",
  },
};

function FaqItem({
  id,
  question,
  answer,
}: {
  id: string;
  question: string;
  answer: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonId = `${id}-question`;
  const panelId = `${id}-answer`;

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <h3>
        <button
          type="button"
          id={buttonId}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="flex w-full items-center justify-between py-5 text-left transition hover:text-primary-700"
        >
          <span className="text-lg font-medium text-primary-900 pr-4">
            {question}
          </span>
          <ChevronDown
            aria-hidden="true"
            className={cn(
              "h-5 w-5 flex-shrink-0 text-primary-500 transition-transform duration-300",
              isOpen && "rotate-180"
            )}
          />
        </button>
      </h3>
      {/* Answer stays in the DOM (hidden when closed) so it is always crawlable. */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!isOpen}
      >
        <p className="pb-5 text-gray-600 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

export default function CommercialInsurancePage() {
  const lang = useLang();
  const t = useT(copy);
  const lp = useLocalizePath();

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-900 to-primary-800 text-white py-24 md:py-32">
        <div
          className="absolute inset-0 opacity-5"
          style={{ backgroundImage: `url(${asset("/images/pattern.svg")})` }}
        />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 "
          >
            {t.heroTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto"
          >
            {t.heroSubtitle}
          </motion.p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={0}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6 ">
              {t.ctaTitle}
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              {t.ctaText}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href={lp("/quotes")}
                className={cn(
                  "inline-flex items-center gap-2 bg-primary-900 text-white px-8 py-4 rounded-full",
                  "font-semibold text-lg hover:bg-primary-800 transition-colors"
                )}
              >
                {t.ctaButton}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href={`tel:${COMPANY.phone.replace(/[^0-9]/g, "")}`}
                className={cn(
                  "inline-flex items-center gap-2 border-2 border-primary-900/30 text-primary-900 px-8 py-4 rounded-full",
                  "font-semibold text-lg hover:bg-primary-900/5 transition-colors"
                )}
              >
                <Phone className="w-5 h-5" />
                {COMPANY.phone}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Buy Online — merged General Liability + Bonds */}
      <section className="relative overflow-hidden py-20 md:py-28 bg-gradient-to-br from-primary-950 via-primary-900 to-primary-950">
        {/* decorative glow accents */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-primary-400/10 blur-3xl" />

        <div className="container relative mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={0}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              {t.onlineTitle}
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              {t.onlineText}
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
            {onlineProducts.map((product, i) => (
              <motion.div
                key={product.title.en}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                custom={i + 1}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group flex w-full flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-8 text-center shadow-lg backdrop-blur-sm transition-colors hover:border-white/20 hover:bg-white/10 sm:w-[340px]"
              >
                <div className="silver-icon-3d mb-5 flex h-16 w-16 items-center justify-center rounded-2xl">
                  <product.icon className="h-8 w-8 text-primary-900" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">
                  {product.title[lang]}
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-gray-300">
                  {product.description[lang]}
                </p>
                <a
                  href={product.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-silver-3d mt-auto inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 font-semibold text-primary-900 transition-all duration-300"
                >
                  {product.buttonLabel[lang]}
                  <ArrowRight className="h-5 w-5" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Policy Types Grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={0}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6">
              {t.linesTitle}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {COMPANY.name} {t.linesText}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {policyTypes.map((policy, i) => (
              <motion.div
                key={policy.title.en}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                custom={i + 1}
                className={cn(
                  "bg-white rounded-2xl shadow-lg p-8 border border-gray-100",
                  "hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                )}
              >
                <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-5">
                  <policy.icon className="w-7 h-7 text-primary-700" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {policy.title[lang]}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {policy.description[lang]}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Which coverage does my business need? */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={0}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6">
              {t.guideTitle}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t.guideText}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {coverageGuide.map((item, i) => (
              <motion.div
                key={item.coverage.en}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                custom={(i % 2) + 1}
                className="flex gap-5 bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-primary-700" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {item.situation[lang]}
                  </h3>
                  <p className="text-sm font-semibold text-primary-700 mb-3">
                    {t.guideNeed} {item.coverage[lang]}
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description[lang]}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workers' compensation in Florida */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={0}
            className="max-w-3xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <HardHat className="w-7 h-7 text-primary-700" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary-900">
                {t.wcTitle}
              </h2>
            </div>
            <div className="space-y-5 text-lg text-gray-600 leading-relaxed">
              <p>{t.wcP1}</p>
              <p>{t.wcP2}</p>
              <ul className="space-y-3">
                {t.wcBullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <CircleCheck className="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <p>{t.wcP3}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Industries we serve */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={0}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6">
              {t.industriesTitle}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t.industriesText}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {industries.map((industry, i) => (
              <motion.div
                key={industry.title.en}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                custom={(i % 3) + 1}
                className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
              >
                <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-5">
                  <industry.icon className="w-7 h-7 text-primary-700" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {industry.title[lang]}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {industry.description[lang]}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How quoting works with a broker */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={0}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6">
              {t.stepsTitle}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t.stepsText}
            </p>
          </motion.div>

          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {quoteSteps.map((step, i) => (
              <motion.li
                key={step.title.en}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                custom={i + 1}
                className="relative bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
              >
                <span className="absolute top-6 right-6 text-sm font-bold text-accent-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-5">
                  <step.icon className="w-7 h-7 text-primary-700" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {step.title[lang]}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description[lang]}
                </p>
              </motion.li>
            ))}
          </ol>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={0}
            className="text-center mt-12"
          >
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              {t.stepsLocal}
            </p>
            <Link
              href={lp("/quotes")}
              className={cn(
                "inline-flex items-center gap-2 bg-primary-900 text-white px-8 py-4 rounded-full",
                "font-semibold text-lg hover:bg-primary-800 transition-colors"
              )}
            >
              {t.stepsCta}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Common questions */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={0}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6">
              {t.faqTitle}
            </h2>
            <p className="text-lg text-gray-600">{t.faqText}</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={1}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 px-6 md:px-8"
          >
            {faq[lang].map((item, i) => (
              <FaqItem
                key={`${lang}-${i}`}
                id={`commercial-faq-${i}`}
                question={item.q}
                answer={item.a}
              />
            ))}
          </motion.div>

          <div className="text-center mt-8">
            <Link
              href={lp("/faq")}
              className="inline-flex items-center gap-2 font-semibold text-primary-800 hover:text-primary-600 transition-colors"
            >
              {t.faqMore}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
