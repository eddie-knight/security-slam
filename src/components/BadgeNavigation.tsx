import React from "react";
import { Link } from "react-router-dom";

export const BadgeNavigation: React.FC = () => {
  const badges = ["Mechanizer", "Chronicler", "Defender", "Cleaner", "Inspector"];

  return (
    <section
      style={{
        marginBottom: "var(--gf-space-xl)",
        paddingTop: "var(--gf-space-md)",
        paddingBottom: "var(--gf-space-md)"
      }}
    >
      <h2
        style={{
          marginTop: 0,
          marginBottom: "var(--gf-space-lg)",
        }}
      >
        Learn about Each Badge
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "var(--gf-space-xl)",
          maxWidth: "1400px",
          margin: "0 auto",
          justifyItems: "center"
        }}
      >
        {badges.map((badge) => (
          <Link
            key={badge}
            to={`/library/${badge.toLowerCase()}`}
            style={{
              textDecoration: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "var(--gf-space-md)",
              transition: "transform 0.2s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <img
              src={`/badge-icons/${badge.toLowerCase()}.png`}
              alt={`${badge} Badge`}
              style={{
                width: "100%",
                maxWidth: "180px",
                height: "auto",
                objectFit: "contain"
              }}
            />
            <span
              style={{
                fontSize: "1.1rem",
                fontWeight: 600,
                color: "var(--gf-color-text)"
              }}
            >
              {badge}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};
