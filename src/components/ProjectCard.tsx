import React from "react";

export interface ProjectCardProps {
  name: string;
  advisor: string;
  repoUrl: string;
  logoUrl: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  name,
  advisor,
  repoUrl,
  logoUrl
}) => {
  return (
    <a
      href={repoUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        textDecoration: "none",
        color: "inherit",
        display: "block",
        borderRadius: "var(--gf-radius-xl)",
        overflow: "hidden",
        border: "1px solid var(--gf-color-border-strong)",
        transition: "transform 0.2s, box-shadow 0.2s",
        boxShadow: "var(--gf-shadow-surface)"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "var(--gf-shadow-surface-strong)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "var(--gf-shadow-surface)";
      }}
    >
      {/* Logo section with white background */}
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "var(--gf-space-xl)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "180px"
        }}
      >
        <img
          src={logoUrl}
          alt={`${name} logo`}
          style={{
            maxWidth: "100%",
            maxHeight: "140px",
            objectFit: "contain"
          }}
        />
      </div>

      {/* Info section with dark grey background */}
      <div
        style={{
          backgroundColor: "var(--gf-color-surface)",
          padding: "var(--gf-space-xl)"
        }}
      >
        <h3
          style={{
            marginTop: 0,
            marginBottom: "var(--gf-space-sm)",
            color: "var(--gf-color-text)",
            fontSize: "1.3rem"
          }}
        >
          {name}
        </h3>
        <p
          style={{
            margin: 0,
            color: "var(--gf-color-text-subtle)",
            fontSize: "1rem"
          }}
        >
          Security Advisor: <strong>{advisor}</strong>
        </p>
      </div>
    </a>
  );
};
