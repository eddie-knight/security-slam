import React from "react";
import { Link } from "react-router-dom";
import { TextSection } from "../components/TextSection";
import { SectionCard } from "../components/SectionCard";
import { Carousel } from "../components/Carousel";
import { siteConfig } from "../config/site";
import { blogPosts } from "../content/blog";
import { carouselImages } from "../content/carousel";

export const HomePage: React.FC = () => {
  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        width: "100%"
      }}
    >
      <div className="home-welcome-row">
        {carouselImages.length > 0 && (
          <div className="home-welcome-carousel">
            <Carousel
              images={carouselImages}
              autoAdvanceMs={5000}
              ariaLabel="Slam photos"
            />
          </div>
        )}
        <div className="home-welcome-text">
          <TextSection
            title="Welcome"
            paragraphs={[
              "Security Slam helps projects understand and improve their security posture.",
              "Run by the CNCF Technical Advisory Group for Security & Compliance, the Slam is a month-long community effort with a library of support resources, advisors on Slack, and plaques and badges for participating projects and contributors.",
              "Explore Slam26 for the 2026 event details, browse the Slam Library for guides and how-tos, and check the blog for announcements."
            ]}
            centered={false}
            maxWidth="700px"
            lastParagraphMargin="var(--gf-space-xl)"
          />
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "var(--gf-space-lg)",
          marginBottom: "var(--gf-space-xl)"
        }}
      >
        <SectionCard
          title="Slam26"
          description="The 2026 event at KubeCon + CloudNativeCon Europe. Dates, format, and how to participate."
        >
          <Link
            to="/slam26"
            style={{
              color: "var(--gf-color-accent)",
              textDecoration: "none",
              marginTop: "var(--gf-space-md)",
              display: "inline-block"
            }}
          >
            Read more →
          </Link>
        </SectionCard>
        {siteConfig.library.enabled && (
          <SectionCard
            title="Slam Library"
            description="Support resources to accelerate security hygiene goals."
          >
            <Link
              to="/library"
              style={{
                color: "var(--gf-color-accent)",
                textDecoration: "none",
                marginTop: "var(--gf-space-md)",
                display: "inline-block"
              }}
            >
              Browse library →
            </Link>
          </SectionCard>
        )}
        {siteConfig.blog.enabled && (
          <SectionCard
            title="Blog"
            description="Announcements and updates about the Security Slam."
          >
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
          </SectionCard>
        )}
      </div>

      {siteConfig.blog.enabled && blogPosts.length > 0 && (
        <section style={{ marginBottom: "var(--gf-space-xl)" }}>
          <h2 style={{ marginBottom: "var(--gf-space-md)" }}>Latest from the blog</h2>
          <p
            style={{
              color: "var(--gf-color-text-subtle)",
              fontSize: "1.1rem",
              marginBottom: "var(--gf-space-lg)",
              maxWidth: "700px"
            }}
          >
            Announcements and updates.
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--gf-space-lg)"
            }}
          >
            {blogPosts.slice(0, 3).map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <SectionCard title={post.title} description={post.excerpt}>
                  <p
                    style={{
                      color: "var(--gf-color-text-subtle)",
                      fontSize: "0.9rem",
                      marginTop: "var(--gf-space-md)",
                      marginBottom: 0
                    }}
                  >
                    {post.date}
                  </p>
                </SectionCard>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
