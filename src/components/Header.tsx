import React from "react";
import { Link, useLocation } from "react-router-dom";
import { siteConfig } from "../config/site";

export const Header: React.FC = () => {
  const location = useLocation();

  const linkStyle = (path: string): React.CSSProperties => ({
    color: "var(--gf-color-text)",
    textDecoration: "none",
    padding: "0.5rem 1rem",
    borderRadius: "var(--gf-radius-lg)",
    transition: "background-color 0.2s",
    backgroundColor: location.pathname === path ? "var(--gf-color-accent-soft)" : "transparent"
  });

  return (
    <header
      className="site-header"
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "var(--gf-space-xl)",
        width: "100%"
      }}
    >
      <section
        id="hero"
        style={{
          minHeight: "30vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center"
        }}
      >
        <h1
          style={{
            fontSize: "3.5rem",
            fontWeight: 700,
            marginBottom: 0,
            color: "var(--gf-color-text)",
            lineHeight: 1.1,
            maxWidth: "900px"
          }}
        >
          {siteConfig.siteName}
        </h1>
        <p
          style={{
            fontSize: "2rem",
            color: "var(--gf-color-text-subtle)",
            marginTop: "0.5rem",
            marginBottom: "var(--gf-space-lg)",
            lineHeight: 1.6
          }}
        >
          {siteConfig.tagline}
        </p>
        <nav
          style={{
            display: "flex",
            gap: "var(--gf-space-md)",
            alignItems: "center",
            marginTop: "var(--gf-space-md)",
            flexWrap: "wrap",
            justifyContent: "center"
          }}
        >
          {siteConfig.nav.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={linkStyle(item.path)}
              onMouseEnter={(e) => {
                if (location.pathname !== item.path) {
                  e.currentTarget.style.backgroundColor = "var(--gf-color-accent-soft)";
                }
              }}
              onMouseLeave={(e) => {
                if (location.pathname !== item.path) {
                  e.currentTarget.style.backgroundColor = "transparent";
                }
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </section>
    </header>
  );
};
