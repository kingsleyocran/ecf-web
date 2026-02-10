export type NavLink = {
  title: string;
  href: string;
  subPages?: Array<{ title: string; href: string }>;
};

export const navLinks: NavLink[] = [
  {
    title: "Who We Are",
    href: "/about",
  },
  {
    title: "Technologies",
    href: "/technologies",
  },
  {
    title: "Our Programs",
    href: "/programs",
  },
  {
    title: "Resources",
    href: "/resources",
  },
  // {
  //   title: "Apply",
  //   href: "/apply",
  //   subPages: [
  //     {
  //       title: "African Climate Innovation Challenge",
  //       href: "/acic",
  //     },
  //     {
  //       title: "Solidarity Fund",
  //       href: "/sf",
  //     },
  //     {
  //       title: "Climate Research Fund for African Students",
  //       href: "/crf",
  //     },
  //   ],
  // },
  // {
  //   title: "What’s new",
  //   href: "/blogs",
  // },
];

export const termPrivacyList = [
  { title: "Terms", href: "/terms" },
  { title: "Privacy", href: "/privacy" },
];

export const socialLinks = {
  // facebook: "https://www.facebook.com/AYCFund",
  instagram: "https://www.instagram.com/ecfrontiers/",
  twitter: "https://twitter.com/ecfrontiers",
  linkedin: "https://www.linkedin.com/company/emerging-climate-frontiers",
};

// List of African countries
export const africanCountries = [
  "Algeria",
  "Angola",
  "Benin",
  "Botswana",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cameroon",
  "Central African Republic",
  "Chad",
  "Comoros",
  "Côted Ivoire",
  "Democratic Republic of Congo",
  "Djibouti",
  "Egypt",
  "Equatorial Guinea",
  "Eritrea",
  "Eswatini",
  "Ethiopia",
  "Gabon",
  "Gambia",
  "Ghana",
  "Guinea",
  "Guinea-Bissau",
  "Kenya",
  "Lesotho",
  "Liberia",
  "Libya",
  "Madagascar",
  "Malawi",
  "Mali",
  "Mauritania",
  "Mauritius",
  "Morocco",
  "Mozambique",
  "Namibia",
  "Niger",
  "Nigeria",
  "Rwanda",
  "Republic of Congo",
  "Sao Tome and Principe",
  "Senegal",
  "Seychelles",
  "Sierra Leone",
  "Somalia",
  "South Africa",
  "South Sudan",
  "Sudan",
  "Swaziland",
  "Tanzania",
  "Togo",
  "Tunisia",
  "Uganda",
  "Western Sahara",
  "Zambia",
  "Zimbabwe",
];
