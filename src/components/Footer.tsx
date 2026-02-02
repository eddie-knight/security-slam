import React from "react";
import { siteConfig } from "../config/site";

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        padding: "var(--gf-space-lg)",
        borderTop: "1px solid var(--gf-color-border-strong)",
        backgroundColor: "var(--gf-color-surface)",
        backdropFilter: "var(--gf-glass-blur)",
        WebkitBackdropFilter: "var(--gf-glass-blur)",
        marginTop: "auto"
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          textAlign: "center",
          color: "var(--gf-color-text-subtle)",
          fontSize: "0.875rem"
        }}
      >
        <p>{siteConfig.footer.copyrightText}</p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "var(--gf-space-md)",
            marginTop: "var(--gf-space-md)",
            flexWrap: "wrap"
          }}
        >
          {siteConfig.footer.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "var(--gf-color-text-subtle)",
                textDecoration: "none",
                transition: "color 0.2s"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--gf-color-accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--gf-color-text-subtle)";
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};
