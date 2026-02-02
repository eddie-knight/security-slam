import React from "react";
import { Link } from "react-router-dom";
import { TextSection } from "../components/TextSection";
import { SectionCard } from "../components/SectionCard";
import { siteConfig } from "../config/site";

export const HomePage: React.FC = () => {
  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        width: "100%"
      }}
    >
      <TextSection
        title="Welcome"
        subtitle="A config-driven website template"
        paragraphs={[
          "This front page is built from placeholder content. Edit the home sections in the code or add a home sections array to site config to drive it from config."
        ]}
        centered={true}
        textShadow={true}
        maxWidth="900px"
        lastParagraphMargin="var(--gf-space-xl)"
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "var(--gf-space-lg)",
          marginBottom: "var(--gf-space-xl)"
        }}
      >
        <SectionCard
          title="Blog"
          description="Template includes a blog index and individual post pages. Add or edit posts in src/config/site.ts."
        >
          {siteConfig.blog.enabled && (
            <Link
              to="/blog"
              style={{
                color: "var(--gf-color-accent)",
                textDecoration: "none",
                marginTop: "var(--gf-space-md)",
                display: "inline-block"
              }}
            >
              View blog →
            </Link>
          )}
        </SectionCard>
        <SectionCard
          title="Articles"
          description="Secondary (non-blog) pages like About or Terms. Configure paths and content in site config."
        >
          {siteConfig.articles.length > 0 && (
            <Link
              to={siteConfig.articles[0].path}
              style={{
                color: "var(--gf-color-accent)",
                textDecoration: "none",
                marginTop: "var(--gf-space-md)",
                display: "inline-block"
              }}
            >
              Read more →
            </Link>
          )}
        </SectionCard>
        <SectionCard
          title="Contact"
          description="One or more contact pages with HubSpot forms. Set portal and form IDs in site config."
        >
          {siteConfig.contactPages.length > 0 && (
            <Link
              to={siteConfig.contactPages[0].path}
              style={{
                color: "var(--gf-color-accent)",
                textDecoration: "none",
                marginTop: "var(--gf-space-md)",
                display: "inline-block"
              }}
            >
              Get in touch →
            </Link>
          )}
        </SectionCard>
      </div>

      <section
        style={{
          padding: "var(--gf-space-xl)",
          backgroundColor: "var(--gf-color-surface)",
          borderRadius: "var(--gf-radius-xl)",
          boxShadow: "var(--gf-shadow-surface)",
          backdropFilter: "var(--gf-glass-blur)",
          WebkitBackdropFilter: "var(--gf-glass-blur)",
          border: "1px solid var(--gf-color-border-strong)",
          textAlign: "center"
        }}
      >
        <h2>Customize everything</h2>
        <p
          style={{
            color: "var(--gf-color-text)",
            lineHeight: 1.8,
            fontSize: "1.25rem",
            maxWidth: "700px",
            margin: "0 auto var(--gf-space-lg)"
          }}
        >
          Change site name, tagline, nav, footer, blog posts, articles, and
          contact forms in <code>src/config/site.ts</code>. Adjust colors and
          spacing in <code>src/theme.tsx</code> and <code>src/global.css</code>.
        </p>
      </section>
    </div>
  );
};
