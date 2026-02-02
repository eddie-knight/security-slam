/**
 * Site configuration: single source of truth for identity, nav, footer,
 * blog, articles, and contact pages. Edit this file to customize content
 * without changing component logic.
 */

export type NavItem = {
  path: string;
  label: string;
};

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

export type BlogConfig = {
  enabled: boolean;
};

export type LibraryConfig = {
  enabled: boolean;
};

export type ArticleConfig = {
  path: string;
  title: string;
  body: string;
};

export type PastSlamReport = {
  href: string;
  label: string;
  description?: string;
};

export type SiteConfig = {
  siteName: string;
  tagline: string;
  preregistrationUrl?: string;
  nav: NavItem[];
  footer: {
    copyrightText: string;
    links: FooterLink[];
  };
  blog: BlogConfig;
  library: LibraryConfig;
  articles: ArticleConfig[];
  contactPages: ContactPageConfig[];
  pastSlamReports: PastSlamReport[];
};

export const siteConfig: SiteConfig = {
  siteName: "Security Slam",
  tagline: "February 20 – March 20, 2026",
  preregistrationUrl: "",

  nav: [
    { path: "/", label: "Home" },
    { path: "/blog", label: "Blog" },
    { path: "/library", label: "Slam Library" },
    { path: "/slam26", label: "Slam26" }
  ],

  library: {
    enabled: true
  },

  footer: {
    copyrightText: "",
    links: [
      { href: "https://github.com/cncf/tag-security", label: "CNCF TAG Security" },
      { href: "https://openssf.org", label: "OpenSSF" },
      { href: "https://sonatype.com", label: "Sonatype" },
      { href: "https://ostif.org", label: "OSTIF" },
      { href: "https://events.linuxfoundation.org/kubecon-cloudnativecon-europe/", label: "KubeCon Europe" }
    ]
  },

  blog: {
    enabled: false
  },

  articles: [
    {
      path: "/slam26",
      title: "Security Slam 2026",
      body: "<p>The Security Slam is a CNCF community activity run by the Technical Advisory Group for Security & Compliance. Now in its fifth iteration, the Slam helps projects understand and improve their high-level security posture.</p><p>\"Security hygiene is something every project should do—and every project can do it with a bit of guidance. It's everyday stuff, like the equivalent of brushing your teeth. After you learn it once, you can easily do it every day.\" — Christopher \"CRob\" Robinson, OpenSSF CTO & Chief Architect</p><h2>Key dates</h2><ul><li><strong>Friday, February 20, 2026</strong> — Event objectives announced; Slam Library opens</li><li><strong>Friday, March 20, 2026</strong> — Final scoring submissions close; scoring begins</li><li><strong>Thursday, March 26, 2026</strong> — Awards on the KubeCon Project Pavilion Stage</li></ul><h2>2026 format</h2><p>The 2026 event runs approximately one month (February 20 – March 20), leading up to KubeCon + CloudNativeCon Europe. Key elements:</p><ul><li><strong>Slam Library</strong> — A library of support resources (hosted on this site) to accelerate execution of the more complex goals</li><li><strong>Advisors</strong> — Available via a dedicated CNCF Slack channel all month for clarifications and questions on security hygiene</li><li><strong>Plaques & badges</strong> — Participating projects receive custom plaques; individual contributors receive badges corresponding to the project's completed goals</li><li><strong>Cyber Resilience Act (CRA)</strong> — Advisors and material will be available on CRA this year</li></ul><h2>Who can participate</h2><p>Previously restricted to CNCF projects, the Slam now uses the LFX Insights dashboard: if your project is published to LFX Insights by the closing date, you qualify. Projects from outside the CNCF and Linux Foundation are invited to participate.</p><h2>Partners</h2><p>The 2026 Security Slam is in partnership with Sonatype, OpenSSF, and OSTIF.</p><h2>History</h2><p>Past events have included incentives such as Google's 2022 donations for milestone-reaching projects or the 2025 LEGO prizes for top contributors. The 2023 event gave projects iron-on badges and framed plaques; that format had the most statistically significant results and inspired this year's structure. Maintainers have reported real wins—for example, work done during a prior Slam (pinning workflow versions) paid off when a GitHub action was later compromised.</p><p>Explore the <a href=\"/library\">Slam Library</a> for support resources. Pre-register to receive reminders and instructions for the 2026 event.</p>"
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
