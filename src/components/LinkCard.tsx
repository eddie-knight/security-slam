import React from "react";

export interface LinkCardProps {
  title: string;
  description: string;
  href: string;
  ariaLabel?: string;
}

export const LinkCard: React.FC<LinkCardProps> = ({
  title,
  description,
  href,
  ariaLabel
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel ?? title}
      className="link-card"
      style={{
        display: "block",
        padding: "var(--gf-space-xl)",
        backgroundColor: "var(--gf-color-surface)",
        borderRadius: "var(--gf-radius-xl)",
        boxShadow: "var(--gf-shadow-surface)",
        backdropFilter: "var(--gf-glass-blur)",
        WebkitBackdropFilter: "var(--gf-glass-blur)",
        border: "1px solid var(--gf-color-border-strong)",
        textDecoration: "none",
        color: "inherit",
        cursor: "pointer"
      }}
    >
      <h3 style={{ marginTop: 0, marginBottom: "var(--gf-space-md)" }}>{title}</h3>
      <p
        style={{
          color: "var(--gf-color-text)",
          lineHeight: 1.7,
          fontSize: "1.1rem",
          margin: 0
        }}
      >
        {description}
      </p>
    </a>
  );
};
