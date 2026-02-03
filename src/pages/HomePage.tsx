import React from "react";
import { Link } from "react-router-dom";
import { TextSection } from "../components/TextSection";
import { SectionCard } from "../components/SectionCard";
import { Carousel } from "../components/Carousel";
import { LinkCard } from "../components/LinkCard";
import { siteConfig } from "../config/site";
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
              "Run by the CNCF Technical Advisory Group for Security & Compliance, the Slam is a month-long community effort with a library of support resources, advisors on Slack, and plaques and badges for participating projects and contributors.",
               "The Slam Library will soon be available with the most up-to-date guides and resources. Register now to recieve updates as the event draws nearer!"
            ]}
            centered={false}
            maxWidth="700px"
            lastParagraphMargin="var(--gf-space-xl)"
          />
          <div style={{ marginTop: "var(--gf-space-lg)", textAlign: "center" }}>
          <Link
            to="/slam26/register"
            style={{
              display: "inline-block",
              padding: "var(--gf-space-md) var(--gf-space-xl)",
              background: "linear-gradient(135deg, #5ce0e8 0%, #29bfc7 50%, #159aa1 100%)",
              color: "#fff",
              fontWeight: 600,
              textDecoration: "none",
              borderRadius: "var(--gf-radius-lg)",
              boxShadow: "var(--gf-shadow-surface)",
              transition: "filter 0.2s, transform 0.2s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.filter = "brightness(1.1)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.filter = "none";
              e.currentTarget.style.transform = "none";
            }}
          >
            Register now
          </Link>
          </div>
        </div>
      </div>

      {siteConfig.pastSlamReports.length > 0 && (
        <section
          style={{
            marginBottom: "var(--gf-space-xl)",
            textAlign: "center"
          }}
        >
          <h2 style={{ marginBottom: "var(--gf-space-md)" }}>Past Slam reports</h2>
          <p
            style={{
              color: "var(--gf-color-text-subtle)",
              fontSize: "1.1rem",
              marginBottom: "var(--gf-space-lg)",
              maxWidth: "700px",
              marginLeft: "auto",
              marginRight: "auto",
              lineHeight: 1.7
            }}
          >
            Past Security Slams have been a great success: projects and contributors have leveled up their security hygiene, and the community has learned from each iteration. By getting more people involved and sharing what works, we elevate the whole ecosystem. Read the transparency reports from previous events on the CNCF site.
          </p>
          <div className="past-reports-grid">
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
