import React from "react";
import { Link, Navigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { SectionCard } from "../components/SectionCard";
import { siteConfig } from "../config/site";
import {
  getSectionIndexItem,
  getSectionListItems
} from "../content/sections";

export interface SectionIndexPageProps {
  section: string;
}

export const SectionIndexPage: React.FC<SectionIndexPageProps> = ({ section }) => {
  const config = siteConfig.contentSections[section];
  if (!config?.enabled) {
    return <Navigate to="/" replace />;
  }

  const indexItem = getSectionIndexItem(section);
  const listItems = getSectionListItems(section);
  const title = config.label ?? section;

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        width: "100%"
      }}
    >
      {indexItem ? (
        <article
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: "0 var(--gf-space-xl)",
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
            {indexItem.title}
          </h1>
          {indexItem.description && (
            <p
              style={{
                color: "var(--gf-color-text-subtle)",
                fontSize: "1.1rem",
                marginBottom: "var(--gf-space-lg)",
                lineHeight: 1.6
              }}
            >
              {indexItem.description}
            </p>
          )}
          <div
            className="library-article-body"
            style={{
              color: "var(--gf-color-text)",
              lineHeight: 1.8,
              fontSize: "1.1rem",
              marginBottom: listItems.length > 0 ? "var(--gf-space-2xl)" : 0
            }}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{indexItem.body}</ReactMarkdown>
          </div>
        </article>
      ) : (
        <>
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: 700,
              marginBottom: "var(--gf-space-md)",
              color: "var(--gf-color-accent)",
              lineHeight: 1.2
            }}
          >
            {title}
          </h1>
          {listItems.length === 0 && (
            <p
              style={{
                color: "var(--gf-color-text-subtle)",
                fontSize: "1.25rem",
                marginBottom: "var(--gf-space-xl)",
                lineHeight: 1.6
              }}
            >
              Add markdown files under <code>src/content/{section}/</code> to add or change items.
            </p>
          )}
        </>
      )}

      {listItems.length > 0 && (
        <>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 600,
              marginBottom: "var(--gf-space-md)",
              color: "var(--gf-color-text)",
              lineHeight: 1.3
            }}
          >
            {indexItem ? "More" : title}
          </h2>
          <div className="past-reports-grid">
            {listItems.map((item) => {
              const href = item.path ?? `/${section}/${item.slug}`;
              return (
                <Link
                  key={item.slug}
                  to={href}
                  style={{
                    textDecoration: "none",
                    color: "inherit"
                  }}
                >
                  <SectionCard
                    title={item.title}
                    description={item.description ?? ""}
                  />
                </Link>
              );
            })}
          </div>
        </>
      )}

      {!indexItem && listItems.length === 0 && (
        <p style={{ color: "var(--gf-color-text-subtle)" }}>No items yet.</p>
      )}
    </div>
  );
};
