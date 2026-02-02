import React from "react";
import { Link } from "react-router-dom";
import { TextSection } from "../components/TextSection";
import { SectionCard } from "../components/SectionCard";
import { Carousel } from "../components/Carousel";
import { LinkCard } from "../components/LinkCard";
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
            title="Improving Open Source Security at the Source"
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

      {siteConfig.pastSlamReports.length > 0 && (
        <section style={{ marginBottom: "var(--gf-space-xl)" }}>
          <h2 style={{ marginBottom: "var(--gf-space-md)" }}>Past Slam reports</h2>
          <p
            style={{
              color: "var(--gf-color-text-subtle)",
              fontSize: "1.1rem",
              marginBottom: "var(--gf-space-lg)",
              maxWidth: "700px"
            }}
          >
            Transparency reports from previous Security Slam events on the CNCF site.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "var(--gf-space-lg)"
            }}
          >
            {siteConfig.pastSlamReports.map((report) => (
              <LinkCard
                key={report.href}
                title={report.label}
                description={report.description ?? "Read the transparency report on the CNCF site."}
                href={report.href}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
