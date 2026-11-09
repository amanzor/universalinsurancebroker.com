export const COMPANY = {
  name: "Universal Insurance Brokers",
  shortName: "UIB",
  tagline: "All Your Insurance Policies Under One Roof",
  phone: "(239) 204-2208",
  phoneNew: "(239) 240-2208",
  textOnly: "(786) 636-1030",
  doralPhone: "(305) 341-0938",
  spitzerPhone: "(305) 704-7374",
  /** Public email shown on the site and in Google's business data. */
  email: "quotes@universalinsurancebroker.com",
  /**
   * Where website form submissions are delivered (via FormSubmit). Kept on the
   * already-activated Gmail inbox; switching it to another address requires
   * clicking FormSubmit's one-time activation email sent to that address.
   */
  leadInbox: "universalinsurancebroker@gmail.com",
  adminEmail: "admin@universalinsurancebroker.com",
  /** Phone hours (top bar). */
  hours: "9:30 AM - 7:00 PM",
  /** Hialeah walk-in hours; keep identical to the Hialeah Google Business Profile. */
  walkInHours: "9:30 AM - 5:30 PM",
  social: {
    facebook: "https://facebook.com/universalinsuranceassociate",
    twitter: "https://twitter.com/UniversalInsur3",
    instagram: "https://instagram.com/universalinsurancebroker/",
  },
  /*
   * Hialeah is the walk-in office (Mon–Fri, COMPANY.walkInHours). The other
   * locations are staffed by appointment only. Keep each address and phone
   * identical to its Google Business Profile.
   */
  locations: [
    { name: "Hialeah Office", nameEs: "Oficina de Hialeah", address: "1943 W 68th St", city: "Hialeah", state: "FL", zip: "33014", phone: "(239) 204-2208", appointmentOnly: false },
    { name: "Doral Office", nameEs: "Oficina de Doral", address: "2500 NW 79th Ave Suite 266", city: "Doral", state: "FL", zip: "33122", phone: "(305) 341-0938", appointmentOnly: true },
    { name: "Spitzer Homestead", nameEs: "Spitzer Homestead", address: "30101 S Dixie Hwy", city: "Homestead", state: "FL", zip: "33033", phone: "(305) 704-7374", appointmentOnly: true },
    { name: "Boca Raton Office", nameEs: "Oficina de Boca Raton", address: "3200 N Federal Hwy Suite 224", city: "Boca Raton", state: "FL", zip: "33431", phone: "(239) 204-2208", appointmentOnly: true },
    { name: "Lehigh Acres Office", nameEs: "Oficina de Lehigh Acres", address: "111 Lee Blvd", city: "Lehigh Acres", state: "FL", zip: "33936", phone: "(239) 204-2208", appointmentOnly: true },
  ],
};

// Online quote portal used by every "Get a Quote" call to action.
export const QUOTE_URL =
  "https://cfd97c1e-303d-4132-818d-6cff751e4bde.quotes.iwantinsurance.com/welcome.aspx?AspxAutoDetectCookieSupport=1";

export const TEAM = [
  { name: "Alberto Manzor", role: "CEO", roleEs: "Director Ejecutivo", email: "admin@universalinsurancebroker.com", image: "/images/team/alberto.jpg" },
  { name: "Randy Diaz", role: "COO", roleEs: "Director de Operaciones", email: "randy@universalinsurancebroker.com", image: "/images/team/randy.jpg" },
  { name: "Uriel Rendon", role: "Marketing Manager", roleEs: "Gerente de Mercadeo", email: "uri@universalinsurancebroker.com", image: "/images/team/uriel.jpg" },
  { name: "Amanda Montano", role: "Customer Service", roleEs: "Servicio al Cliente", email: "amanda@universalinsurancebroker.com", image: "/images/team/amanda.jpg" },
  { name: "Lazaro Reigosa", role: "Commercial Lines", roleEs: "Líneas Comerciales", email: "lazaro@universalinsurancebroker.com", image: "/images/team/lazaro.jpg" },
  { name: "Jorge Castro", role: "Franchisee", roleEs: "Franquiciado", email: "doral@universalinsurancebroker.com", image: "/images/team/jorge.jpg" },
];

// Nav labels in both languages; hrefs are English paths and are localized
// at render time (see useLocalizePath).
export const NAV_LINKS: {
  label: { en: string; es: string };
  href: string;
  children?: { label: { en: string; es: string }; href: string }[];
}[] = [
  { label: { en: "Home", es: "Inicio" }, href: "/" },
  { label: { en: "Insurance", es: "Seguros" }, href: "#", children: [
    { label: { en: "Auto Insurance", es: "Seguro de Auto" }, href: "/auto-insurance" },
    { label: { en: "Commercial Insurance", es: "Seguro Comercial" }, href: "/commercial-insurance" },
    { label: { en: "Home Insurance", es: "Seguro de Hogar" }, href: "/home-insurance" },
    { label: { en: "Health Insurance", es: "Seguro de Salud" }, href: "/health-insurance" },
  ]},
  { label: { en: "About Us", es: "Nosotros" }, href: "/about" },
  { label: { en: "Locations", es: "Oficinas" }, href: "/locations" },
  { label: { en: "FAQ", es: "Preguntas" }, href: "/faq" },
  { label: { en: "Contact", es: "Contacto" }, href: "/contact" },
];
