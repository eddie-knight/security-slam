import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { SectionCard } from "../components/SectionCard";
import { markdownComponents } from "../components/markdownComponents";
import {
  libraryArticles,
  libraryIndex,
  getAllTags
} from "../content/library";

export const LibraryPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedTag = searchParams.get("tag");
  const tags = getAllTags();

  const displayTags = selectedTag === null ? tags : tags.filter((t) => t === selectedTag);
  const hasFilter = selectedTag !== null && selectedTag !== "";

  const setTagFilter = (tag: string | null) => {
    if (tag === null) {
      searchParams.delete("tag");
    } else {
      searchParams.set("tag", tag);
    }
    setSearchParams(searchParams, { replace: true });
  };

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
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
        {libraryIndex?.title ?? "Slam Library"}
      </h1>
      {libraryIndex ? (
        <>
          {libraryIndex.description && (
            <p
              style={{
                color: "var(--gf-color-text-subtle)",
                fontSize: "1.25rem",
                marginBottom: "var(--gf-space-lg)",
                lineHeight: 1.6
              }}
            >
              {libraryIndex.description}
            </p>
          )}
          {libraryIndex.body.trim() && (
            <div
              className="library-article-body"
              style={{
                color: "var(--gf-color-text)",
                lineHeight: 1.8,
                fontSize: "1.1rem",
                marginBottom: "var(--gf-space-xl)"
              }}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                {libraryIndex.body}
              </ReactMarkdown>
            </div>
          )}
        </>
      ) : (
        <p>Error Loading content/library/index.md</p>
      )}

      {tags.length > 0 && (
        <section
          style={{
            marginBottom: "var(--gf-space-xl)"
          }}
        >
          <h2
            style={{
              fontSize: "1.125rem",
              fontWeight: 600,
              marginBottom: "var(--gf-space-sm)",
              color: "var(--gf-color-text-subtle)"
            }}
          >
            Filter by tag
          </h2>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "var(--gf-space-sm)",
              alignItems: "center"
            }}
          >
            <button
              type="button"
              onClick={() => setTagFilter(null)}
              style={{
                fontSize: "0.9rem",
                padding: "0.35rem 0.75rem",
                borderRadius: "var(--gf-radius-lg)",
                border: "1px solid var(--gf-color-accent)",
                backgroundColor: hasFilter ? "transparent" : "var(--gf-color-accent-soft)",
                color: "var(--gf-color-accent)",
                cursor: "pointer",
                fontWeight: hasFilter ? 500 : 600
              }}
            >
              All
            </button>
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setTagFilter(tag)}
                style={{
                  fontSize: "0.9rem",
                  padding: "0.35rem 0.75rem",
                  borderRadius: "var(--gf-radius-lg)",
                  border: "1px solid var(--gf-color-accent)",
                  backgroundColor: selectedTag === tag ? "var(--gf-color-accent-soft)" : "transparent",
                  color: "var(--gf-color-accent)",
                  cursor: "pointer",
                  fontWeight: selectedTag === tag ? 600 : 500
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </section>
      )}

      {displayTags.length === 0 ? (
        <p style={{ color: "var(--gf-color-text-subtle)" }}>
          {tags.length === 0
            ? "No library articles yet."
            : "No articles match this filter."}
        </p>
      ) : (
        displayTags.map((tag) => (
          <section
            key={tag}
            style={{
              marginBottom: "var(--gf-space-xl)"
            }}
          >
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: 600,
                marginBottom: "var(--gf-space-md)",
                color: "var(--gf-color-accent)"
              }}
            >
              {tag}
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--gf-space-lg)"
              }}
            >
              {libraryArticles
                .filter((a) => a.tags.includes(tag))
                .map((article) => (
                  <Link
                    key={article.slug}
                    to={`/library/${article.slug}`}
                    style={{
                      textDecoration: "none",
                      color: "inherit"
                    }}
                  >
                    <SectionCard
                      title={article.title}
                      description={article.description ?? ""}
                    >
                      {article.tags.length > 0 && (
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "0.5rem",
                            marginTop: "var(--gf-space-md)"
                          }}
                        >
                          {article.tags.map((t) => (
                            <span
                              key={t}
                              style={{
                                fontSize: "0.8rem",
                                padding: "0.2rem 0.5rem",
                                borderRadius: "var(--gf-radius-lg)",
                                backgroundColor: "var(--gf-color-accent-soft)",
                                color: "var(--gf-color-accent)"
                              }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </SectionCard>
                  </Link>
                ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
};
