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

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  body: string;
};

export type BlogConfig = {
  enabled: boolean;
  posts: BlogPost[];
};

export type ArticleConfig = {
  path: string;
  title: string;
  body: string;
};

export type SiteConfig = {
  siteName: string;
  tagline: string;
  nav: NavItem[];
  footer: {
    copyrightText: string;
    links: FooterLink[];
  };
  blog: BlogConfig;
  articles: ArticleConfig[];
  contactPages: ContactPageConfig[];
};

export const siteConfig: SiteConfig = {
  siteName: "Site Name",
  tagline: "Your tagline here",

  nav: [
    { path: "/", label: "Home" },
    { path: "/blog", label: "Blog" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" }
  ],

  footer: {
    copyrightText: `© ${new Date().getFullYear()} Site Name. All rights reserved.`,
    links: [
      { href: "https://github.com", label: "GitHub" },
      { href: "https://linkedin.com", label: "LinkedIn" }
    ]
  },

  blog: {
    enabled: true,
    posts: [
      {
        slug: "welcome",
        title: "Welcome to the template",
        date: "2025-01-15",
        excerpt: "A short introduction to this website template and how to customize it.",
        body: "<p>This is a placeholder blog post. Edit <code>src/config/site.ts</code> to add your own posts. Each post has a slug, title, date, excerpt, and body (plain text or HTML).</p><p>You can later switch to markdown by adding a loader (e.g. vite-plugin-md or react-markdown) and sourcing blog content from files.</p>"
      },
      {
        slug: "getting-started",
        title: "Getting started",
        date: "2025-01-10",
        excerpt: "Quick steps to run and customize the template.",
        body: "<p>Run <code>npm install</code> and <code>npm run dev</code> to start the dev server. Change the site name, tagline, nav, and content in <code>src/config/site.ts</code>. Customize colors and spacing in <code>src/theme.tsx</code> and <code>src/global.css</code>.</p>"
      }
    ]
  },

  articles: [
    {
      path: "/about",
      title: "About",
      body: "<p>This is a placeholder about page. Edit the <code>articles</code> array in <code>src/config/site.ts</code> to add or change secondary (non-blog) article content. Use the same structure for pages like Terms, Privacy, or any static content.</p>"
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
  ]
};
