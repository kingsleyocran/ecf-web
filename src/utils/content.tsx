export type NavLink = {
  title: string;
  tKey: string;
  href: string;
  subPages?: Array<{ title: string; tKey: string; href: string }>;
  clickable?: boolean;
};

export const languages = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "es", label: "Español" },
];

export const navLinks: NavLink[] = [
  {
    title: "Who We Are",
    tKey: "nav.whoWeAre",
    href: "/about",
    clickable: true,
    subPages: [
      { title: "Mission & Vision", tKey: "nav.subWhoWeAre.missionVision", href: "/about#mission-vision" },
      { title: "How We Work", tKey: "nav.subWhoWeAre.howWeWork", href: "/about#how-we-work" },
      { title: "Milestones", tKey: "nav.subWhoWeAre.milestones", href: "/about#milestones" },
      { title: "Our Team", tKey: "nav.subWhoWeAre.ourTeam", href: "/about#our-team" },
    ],
  },
  {
    title: "Programs",
    tKey: "nav.programs",
    href: "/programs",
    subPages: [
      { title: "Solar Radiation Management", tKey: "nav.subPrograms.srm", href: "/programs/srm" },
      { title: "Artificial Intelligence", tKey: "nav.subPrograms.ai", href: "/programs/ai" },
      { title: "Carbon Dioxide Removal", tKey: "nav.subPrograms.cdr", href: "/programs/cdr" },
    ],
  },
  {
    title: "Resources",
    tKey: "nav.resources",
    href: "/resources",
    subPages: [
      { title: "Reports", tKey: "nav.subResources.reports", href: "/resources/reports" },
      { title: "Articles", tKey: "nav.subResources.articles", href: "/resources/articles" },
      { title: "Newsletters", tKey: "nav.subResources.newsletters", href: "/resources/newsletters" },
      { title: "Op-eds", tKey: "nav.subResources.opeds", href: "/resources/opeds" },
    ],
  },
  {
    title: "News & Events",
    tKey: "nav.newsEvents",
    href: "/news-and-events",
    subPages: [
      { title: "Latest News", tKey: "nav.subNewsEvents.latestNews", href: "/news-and-events/latest-news" },
      { title: "Videos & Podcasts", tKey: "nav.subNewsEvents.videosPodcasts", href: "/news-and-events/videos-podcasts" },
      { title: "Events", tKey: "nav.subNewsEvents.events", href: "/news-and-events/events" },
    ],
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

export const footerExtraLinks = [
  { title: "Careers", tKey: "nav.careers", href: "/careers" },
];

export const termPrivacyList = [
  { title: "Terms", tKey: "footer.terms", href: "/terms" },
  { title: "Privacy", tKey: "footer.privacy", href: "/privacy" },
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
