import React from "react";
import { Link, useLocation } from "react-router-dom";
import { siteConfig } from "../config/site";
import logoColorUrl from "../public/logo/logo-color.png";

export const Header: React.FC = () => {
  const location = useLocation();

  const contentSectionNav = Object.entries(siteConfig.contentSections)
    .filter(([, config]) => config.enabled && config.inNav !== false)
    .map(([section, config]) => ({
      path: `/${section}`,
      label: config.label ?? section
    }));
  const fullNav = [{ path: "/", label: "Home" }, ...contentSectionNav];

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
        padding: "var(--gf-space-md) var(--gf-space-xl)",
        width: "100%"
      }}
    >
      <section
        id="hero"
        className="site-header-inner"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "var(--gf-space-md)",
          textAlign: "center"
        }}
      >
        <div
          className="site-header-brand"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "var(--gf-space-md)"
          }}
        >
          <Link
            to="/"
            style={{ display: "block" }}
            aria-label={`${siteConfig.siteName} home`}
          >
            <img
              src={logoColorUrl}
              alt={siteConfig.siteName}
              style={{
                maxHeight: "80px",
                width: "auto",
                objectFit: "contain",
                display: "block"
              }}
            />
          </Link>
          <p
            style={{
              fontSize: "1.1rem",
              color: "var(--gf-color-text-subtle)",
              margin: 0,
              lineHeight: 1.4
            }}
          >
            {siteConfig.tagline}
          </p>
        </div>
        <nav
          style={{
            display: "flex",
            gap: "var(--gf-space-md)",
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "center"
          }}
        >
          {fullNav.map((item) => (
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
