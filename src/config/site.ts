/**
 * Site configuration: single source of truth for identity, footer,
 * content sections, and contact pages. Edit this file to
 * customize content without changing component logic. Header nav is derived
 * from a fixed Home link plus enabled content sections (inNav !== false).
 */

export type FooterLink = {
  href: string;
  label: string;
};

export type HubSpotConfig = {
  portalId: string;
  formId: string;
  region: string;
};

export type ContactPageConfig = {
  path: string;
  title: string;
  description?: string;
  hubspot?: HubSpotConfig;
};

export type ContentSectionConfig = {
  enabled: boolean;
  label?: string;
  /** If true or omitted when enabled, section index appears in header nav. Set false to hide. */
  inNav?: boolean;
};

export type PastSlamReport = {
  href: string;
  label: string;
  description?: string;
};

export type NavLink = {
  path: string;
  label: string;
  children?: NavLink[];
};

export type SiteConfig = {
  siteName: string;
  tagline: string;
  preregistrationUrl?: string;
  footer: {
    copyrightText: string;
    links: FooterLink[];
  };
  contentSections: Record<string, ContentSectionConfig>;
  customNavLinks?: NavLink[];
  contactPages: ContactPageConfig[];
  pastSlamReports: PastSlamReport[];
};

export const siteConfig: SiteConfig = {
  siteName: "Security Slam",
  tagline: "February 20 – March 20, 2026",
  preregistrationUrl: "",

  footer: {
    copyrightText: "",
    links: [
      { href: "https://contribute.cncf.io/community/tags/security-and-compliance/", label: "CNCF TAG Security & Compliance" },
      { href: "https://openssf.org", label: "OpenSSF" },
      { href: "https://sonatype.com", label: "Sonatype" },
      { href: "https://events.linuxfoundation.org/kubecon-cloudnativecon-europe/", label: "KubeCon Europe" }
    ]
  },

  // Content sections: add a directory under src/content/<key>/ and set enabled.
  // Index at /<key> (card grid), detail at /<key>/:slug or at item.path from frontmatter.
  // Section index appears in header nav when enabled and inNav !== false.
  contentSections: {
    slam26: { enabled: true, label: "Slam26" },
    library: { enabled: true, label: "Library", inNav: false },
    blog: { enabled: false, label: "Blog" }
  },

  customNavLinks: [
    {
      path: "/slam26",
      label: "Slam26",
      children: [
        { path: "/slam26", label: "Overview" },
        { path: "/library", label: "Library" },
        { path: "/slam26/participating-projects", label: "Participating Projects" }
      ]
    }
  ],

  contactPages: [
    {
      path: "/contact",
      title: "Contact",
      description: "Send a message using the form below. Replace the placeholder HubSpot portal and form IDs in site config with your own to connect a real form.",
      hubspot: {
        portalId: "0000000",
        formId: "00000000-0000-0000-0000-000000000000",
        region: "na1"
      }
    }
  ],

  pastSlamReports: [
    { href: "https://www.cncf.io/reports/security-slam-2023/", label: "Security Slam 2023" },
    { href: "https://www.cncf.io/reports/lightning-round-at-security-slam-2023/", label: "Lightning Round at Security Slam 2023" },
    { href: "https://www.cncf.io/reports/security-slam-north-america-2022/", label: "Security Slam North America 2022" },
    { href: "https://www.cncf.io/reports/security-slam-2025/", label: "Security Slam 2025" }
  ]
};
