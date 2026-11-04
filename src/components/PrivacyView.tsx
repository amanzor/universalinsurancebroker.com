"use client";

import Link from "next/link";
import { COMPANY } from "@/lib/constants";
import { useLocalizePath, useT } from "@/lib/useLang";

/** Shown on the page; update it whenever the policy text changes. */
const LAST_UPDATED = { en: "November 4, 2026", es: "4 de noviembre de 2026" };

type Section = { h: string; p?: string[]; list?: string[] };

const copy: { en: { title: string; intro: string; updated: string; sections: Section[]; contactTitle: string; contactText: string }; es: { title: string; intro: string; updated: string; sections: Section[]; contactTitle: string; contactText: string } } = {
  en: {
    title: "Privacy Policy",
    updated: "Last updated",
    intro: `This Privacy Policy explains how ${COMPANY.name} ("we", "us") collects, uses and shares information when you visit universalinsurancebroker.com (the "Site") or contact us through it. By using the Site, you agree to this policy.`,
    sections: [
      {
        h: "Information you give us",
        p: ["When you fill out a form on the Site, call, text or email us, we collect the information you choose to provide. Depending on the form, this may include:"],
        list: [
          "Your name, phone number, email address and mailing or property address",
          "Date of birth",
          "Details about the property, vehicle, business or coverage you want to insure (for example, year built, current insurance carrier and type of ownership)",
          "Any message or remarks you send us",
        ],
      },
      {
        h: "Information collected automatically",
        p: [
          "We use Google Analytics to understand how visitors use the Site — for example, which pages are viewed, how visitors arrive, the general location (city/region), device and browser type, and actions such as clicking a phone number, a quote button or submitting a form. Google Analytics uses cookies and similar technologies to collect this information. It does not give us your name or contact details.",
          "Our web host may also keep standard server logs (such as IP address, browser type and the pages requested) for security and to keep the Site running.",
        ],
      },
      {
        h: "How we use your information",
        list: [
          "To prepare insurance quotes, compare options and contact you about them",
          "To respond to your questions and requests",
          "To service policies you obtain through us",
          "To understand and improve the Site and our services",
          "To comply with legal and regulatory obligations",
        ],
      },
      {
        h: "How we share information",
        p: ["We do not sell your personal information. We share it only as needed to serve you:"],
        list: [
          "With insurance carriers, wholesalers and agencies we work with, so they can provide quotes and issue coverage you request",
          "With service providers that help us operate the Site and our business — for example, FormSubmit (which delivers website form submissions to our email), our website host, and Google (analytics and embedded maps)",
          "When required by law, regulation, court order or to protect our rights and the safety of others",
        ],
      },
      {
        h: "Third-party sites and tools",
        p: [
          "Some buttons on the Site take you to quoting tools operated by third parties (for example, our online quote portal and partner quoting tools for general liability and surety bonds) and to social media sites. Our location pages include embedded Google Maps. Those services are governed by their own privacy policies, and we are not responsible for their practices.",
        ],
      },
      {
        h: "Your choices",
        list: [
          "You can choose not to submit forms and contact us by phone instead.",
          "You can block or delete cookies in your browser settings.",
          "You can opt out of Google Analytics with Google's browser add-on at tools.google.com/dlpage/gaoptout.",
          "You can ask us to update or correct the information you gave us, or to stop contacting you, by using the contact details below.",
        ],
      },
      {
        h: "Data security and retention",
        p: [
          "We use reasonable administrative and technical measures to protect the information we receive. No method of transmission over the internet or electronic storage is completely secure, so we cannot guarantee absolute security. We keep information for as long as needed to provide our services and to meet legal, regulatory and record-keeping requirements.",
        ],
      },
      {
        h: "Children's privacy",
        p: ["The Site is intended for adults. We do not knowingly collect personal information online from children under 13."],
      },
      {
        h: "Changes to this policy",
        p: ["We may update this policy from time to time. The \"Last updated\" date at the top shows when it was last changed."],
      },
    ],
    contactTitle: "Contact us",
    contactText: "If you have questions about this policy or your information, contact us:",
  },
  es: {
    title: "Política de Privacidad",
    updated: "Última actualización",
    intro: `Esta Política de Privacidad explica cómo ${COMPANY.name} ("nosotros") recopila, usa y comparte información cuando usted visita universalinsurancebroker.com (el "Sitio") o se comunica con nosotros a través de él. Al usar el Sitio, usted acepta esta política.`,
    sections: [
      {
        h: "Información que usted nos proporciona",
        p: ["Cuando completa un formulario en el Sitio, o nos llama, nos envía un mensaje de texto o un correo electrónico, recopilamos la información que usted decide compartir. Según el formulario, puede incluir:"],
        list: [
          "Su nombre, número de teléfono, correo electrónico y dirección postal o de la propiedad",
          "Fecha de nacimiento",
          "Detalles sobre la propiedad, el vehículo, el negocio o la cobertura que desea asegurar (por ejemplo, año de construcción, aseguradora actual y tipo de propiedad)",
          "Cualquier mensaje o comentario que nos envíe",
        ],
      },
      {
        h: "Información recopilada automáticamente",
        p: [
          "Usamos Google Analytics para entender cómo los visitantes usan el Sitio; por ejemplo, qué páginas visitan, cómo llegan, la ubicación general (ciudad/región), el tipo de dispositivo y navegador, y acciones como hacer clic en un número de teléfono, en un botón de cotización o enviar un formulario. Google Analytics usa cookies y tecnologías similares para recopilar esta información. No nos proporciona su nombre ni sus datos de contacto.",
          "Nuestro proveedor de alojamiento web también puede guardar registros estándar del servidor (como la dirección IP, el tipo de navegador y las páginas solicitadas) por seguridad y para mantener el Sitio en funcionamiento.",
        ],
      },
      {
        h: "Cómo usamos su información",
        list: [
          "Para preparar cotizaciones de seguros, comparar opciones y comunicarnos con usted sobre ellas",
          "Para responder a sus preguntas y solicitudes",
          "Para dar servicio a las pólizas que obtenga a través de nosotros",
          "Para entender y mejorar el Sitio y nuestros servicios",
          "Para cumplir con obligaciones legales y regulatorias",
        ],
      },
      {
        h: "Cómo compartimos la información",
        p: ["No vendemos su información personal. Solo la compartimos cuando es necesario para atenderle:"],
        list: [
          "Con las aseguradoras, mayoristas y agencias con las que trabajamos, para que puedan ofrecerle cotizaciones y emitir la cobertura que usted solicite",
          "Con proveedores de servicios que nos ayudan a operar el Sitio y nuestro negocio; por ejemplo, FormSubmit (que entrega los formularios del sitio web a nuestro correo), nuestro proveedor de alojamiento web y Google (analítica y mapas integrados)",
          "Cuando lo exija la ley, una regulación u orden judicial, o para proteger nuestros derechos y la seguridad de otras personas",
        ],
      },
      {
        h: "Sitios y herramientas de terceros",
        p: [
          "Algunos botones del Sitio le llevan a herramientas de cotización operadas por terceros (por ejemplo, nuestro portal de cotización en línea y herramientas de socios para responsabilidad general y fianzas) y a redes sociales. Nuestras páginas de oficinas incluyen mapas de Google integrados. Esos servicios se rigen por sus propias políticas de privacidad y no somos responsables de sus prácticas.",
        ],
      },
      {
        h: "Sus opciones",
        list: [
          "Puede optar por no enviar formularios y llamarnos por teléfono.",
          "Puede bloquear o eliminar las cookies en la configuración de su navegador.",
          "Puede desactivar Google Analytics con el complemento de Google para navegadores en tools.google.com/dlpage/gaoptout.",
          "Puede pedirnos que actualicemos o corrijamos la información que nos dio, o que dejemos de contactarle, usando los datos de contacto a continuación.",
        ],
      },
      {
        h: "Seguridad y conservación de los datos",
        p: [
          "Usamos medidas administrativas y técnicas razonables para proteger la información que recibimos. Ningún método de transmisión por internet ni de almacenamiento electrónico es completamente seguro, por lo que no podemos garantizar una seguridad absoluta. Conservamos la información durante el tiempo necesario para prestar nuestros servicios y cumplir con los requisitos legales, regulatorios y de registros.",
        ],
      },
      {
        h: "Privacidad de los menores",
        p: ["El Sitio está dirigido a adultos. No recopilamos a sabiendas información personal en línea de menores de 13 años."],
      },
      {
        h: "Cambios a esta política",
        p: ["Podemos actualizar esta política ocasionalmente. La fecha de \"Última actualización\" al inicio indica cuándo se modificó por última vez."],
      },
    ],
    contactTitle: "Contáctenos",
    contactText: "Si tiene preguntas sobre esta política o sobre su información, comuníquese con nosotros:",
  },
};

export default function PrivacyView() {
  const t = useT(copy);
  const lp = useLocalizePath();
  const updated = useT(LAST_UPDATED);
  const tel = `tel:${COMPANY.phone.replace(/\D/g, "")}`;

  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 pt-32 pb-16 text-white">
        <div className="mx-auto max-w-3xl px-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{t.title}</h1>
          <p className="mt-4 text-primary-100">
            {t.updated}: {updated}
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-6 py-14 text-gray-700">
        <p className="text-lg leading-relaxed">{t.intro}</p>

        {t.sections.map((s) => (
          <section key={s.h} className="mt-10">
            <h2 className="text-2xl font-bold text-primary-900">{s.h}</h2>
            {s.p?.map((para) => (
              <p key={para.slice(0, 40)} className="mt-3 leading-relaxed">
                {para}
              </p>
            ))}
            {s.list && (
              <ul className="mt-3 list-disc space-y-2 pl-6 leading-relaxed marker:text-primary-400">
                {s.list.map((li) => (
                  <li key={li.slice(0, 40)}>{li}</li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <section className="mt-10 rounded-2xl bg-gray-50 p-6">
          <h2 className="text-2xl font-bold text-primary-900">{t.contactTitle}</h2>
          <p className="mt-3">{t.contactText}</p>
          <ul className="mt-3 space-y-1">
            <li className="font-semibold text-primary-900">{COMPANY.name}</li>
            <li>
              {COMPANY.locations[0].address}, {COMPANY.locations[0].city}, {COMPANY.locations[0].state}{" "}
              {COMPANY.locations[0].zip}
            </li>
            <li>
              <a href={tel} className="text-primary-700 hover:underline">
                {COMPANY.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${COMPANY.email}`} className="text-primary-700 hover:underline">
                {COMPANY.email}
              </a>
            </li>
            <li>
              <Link href={lp("/contact")} className="text-primary-700 hover:underline">
                {lp("/contact") === "/contact" ? "Contact page" : "Página de contacto"}
              </Link>
            </li>
          </ul>
        </section>
      </article>
    </main>
  );
}
