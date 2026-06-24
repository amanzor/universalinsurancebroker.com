export const COMPANY = {
  name: "Universal Insurance Brokers",
  shortName: "UIB",
  tagline: "All Your Insurance Policies Under One Roof",
  phone: "(239) 204-2208",
  phoneNew: "(239) 240-2208",
  textOnly: "(786) 636-1030",
  doralPhone: "(786) 261-6222",
  spitzerPhone: "(305) 704-7374",
  email: "universalinsurancebroker@gmail.com",
  adminEmail: "admin@universalinsurancebroker.com",
  hours: "9:30 AM - 7:00 PM",
  social: {
    facebook: "https://facebook.com/universalinsuranceassociate",
    twitter: "https://twitter.com/UniversalInsur3",
    instagram: "https://instagram.com/universalinsurancebroker/",
  },
  locations: [
    { name: "Boca Raton Office", address: "3200 N Federal Hwy Suite 224", city: "Boca Raton", state: "FL", zip: "33431" },
    { name: "Lehigh Acres Office", address: "111 Lee Blvd", city: "Lehigh Acres", state: "FL", zip: "33936" },
    { name: "Spitzer Homestead", address: "30101 S Dixie Hwy", city: "Homestead", state: "FL", zip: "33033" },
  ],
};

export const TEAM = [
  { name: "Alberto Manzor", role: "CEO", email: "admin@universalinsurancebroker.com", image: "/images/team/alberto.jpg" },
  { name: "Randy Diaz", role: "COO", email: "randy@universalinsurancebroker.com", image: "/images/team/randy.jpg" },
  { name: "Uriel Rendon", role: "Marketing Manager", email: "uri@universalinsurancebroker.com", image: "/images/team/uriel.jpg" },
  { name: "Amanda Montano", role: "Customer Service", email: "amanda@universalinsurancebroker.com", image: "/images/team/amanda.jpg" },
  { name: "Lazaro Reigosa", role: "Commercial Lines", email: "lazaro@universalinsurancebroker.com", image: "/images/team/lazaro.jpg" },
  { name: "Jorge Castro", role: "Franchisee", email: "doral@universalinsurancebroker.com", image: "/images/team/jorge.jpg" },
];

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Insurance", href: "#", children: [
    { label: "Auto Insurance", href: "/auto-insurance" },
    { label: "Commercial Insurance", href: "/commercial-insurance" },
    { label: "Home Insurance", href: "/home-insurance" },
    { label: "Health Insurance", href: "/health-insurance" },
  ]},
  { label: "About Us", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];
