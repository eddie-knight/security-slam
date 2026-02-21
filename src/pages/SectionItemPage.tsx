import React, { useState, useEffect } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { HubSpotForm } from "../components/HubSpotForm";
import { ProjectCard } from "../components/ProjectCard";
import { markdownComponents } from "../components/markdownComponents";
import {
  getSectionItemBySlug,
  getSectionItemByPath,
  type ProjectInfo
} from "../content/sections";

export interface SectionItemPageProps {
  section: string;
  path?: string;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export const SectionItemPage: React.FC<SectionItemPageProps> = ({
  section,
  path: pathProp
}) => {
  const { slug: slugParam } = useParams<{ slug: string }>();
  const item = pathProp
    ? getSectionItemByPath(section, pathProp)
    : slugParam
      ? getSectionItemBySlug(section, slugParam)
      : undefined;

  const [shuffledProjects, setShuffledProjects] = useState<ProjectInfo[]>([]);

  useEffect(() => {
    if (item?.projects) {
      setShuffledProjects(shuffleArray(item.projects));
    }
  }, [item]);

  if (!item) {
    return <Navigate to={pathProp ? "/" : `/${section}`} replace />;
  }

  return (
    <article
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "var(--gf-space-xl)",
        width: "100%"
      }}
    >
      <h1
        style={{
          fontSize: "2.5rem",
          fontWeight: 700,
          marginBottom: "var(--gf-space-md)",
          color: "var(--gf-color-accent)",
          lineHeight: 1.2
        }}
      >
        {item.title}
      </h1>
      {item.description && (
        <p
          style={{
            color: "var(--gf-color-text-subtle)",
            fontSize: "1.1rem",
            marginBottom: "var(--gf-space-lg)",
            lineHeight: 1.6
          }}
        >
          {item.description}
        </p>
      )}
      {shuffledProjects.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "var(--gf-space-xl)",
            marginBottom: "var(--gf-space-2xl)"
          }}
        >
          {shuffledProjects.map((project, index) => (
            <ProjectCard
              key={index}
              name={project.name}
              advisor={project.advisor}
              repoUrl={project.repoUrl}
              logoUrl={project.logoUrl}
            />
          ))}
        </div>
      )}
      {item.body.trim() && (
        <div
          className="library-article-body"
          style={{
            color: "var(--gf-color-text)",
            lineHeight: 1.8,
            fontSize: "1.1rem",
            marginBottom: section === "library" ? "var(--gf-space-2xl)" : (item.hubspot ? "var(--gf-space-xl)" : 0)
          }}
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{item.body}</ReactMarkdown>
        </div>
      )}
      {section === "library" && (
        <div
          style={{
            marginBottom: item.hubspot ? "var(--gf-space-2xl)" : "var(--gf-space-xl)",
            padding: "var(--gf-space-xl)",
            backgroundColor: "var(--gf-color-surface)",
            borderRadius: "var(--gf-radius-xl)",
            border: "2px solid var(--gf-color-accent)",
            textAlign: "center"
          }}
        >
          <h3
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              marginBottom: "var(--gf-space-md)",
              color: "var(--gf-color-accent)"
            }}
          >
            Completed This Badge?
          </h3>
          <p
            style={{
              color: "var(--gf-color-text-subtle)",
              marginBottom: "var(--gf-space-lg)",
              lineHeight: 1.6
            }}
          >
            If you're a project maintainer and you've completed this badge, submit your completion for evaluation.
          </p>
          <Link
            to="/slam26/submit-completion"
            style={{
              display: "inline-block",
              padding: "var(--gf-space-md) var(--gf-space-xl)",
              backgroundColor: "var(--gf-color-accent)",
              color: "var(--gf-color-background)",
              borderRadius: "var(--gf-radius-lg)",
              fontWeight: 600,
              fontSize: "1.1rem",
              textDecoration: "none",
              transition: "all 0.2s ease",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
            }}
          >
            Submit Badge Completion
          </Link>
        </div>
      )}
      {item.hubspot && (
        <div style={{ marginTop: "var(--gf-space-xl)" }}>
          <HubSpotForm
            portalId={item.hubspot.portalId}
            formId={item.hubspot.formId}
            region={item.hubspot.region}
          />
        </div>
      )}
    </article>
  );
};
