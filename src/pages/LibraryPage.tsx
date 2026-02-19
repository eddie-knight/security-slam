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

  const hasFilter = selectedTag !== null && selectedTag !== "";
  const articlesToShow = hasFilter
    ? libraryArticles.filter((a) => a.tags.includes(selectedTag!))
    : libraryArticles;
  const showEmptyFilter = hasFilter && articlesToShow.length === 0;
  const showEmptyLibrary = !hasFilter && libraryArticles.length === 0;

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
        <>
          {/* Badge Category Navigation */}
          <section
            style={{
              marginBottom: "var(--gf-space-xl)",
              paddingTop: "var(--gf-space-md)",
              paddingBottom: "var(--gf-space-md)"
            }}
          >
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: 600,
                marginTop: 0,
                marginBottom: "var(--gf-space-lg)",
                color: "var(--gf-color-text)"
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
              {/* Badge icons */}
              {["Defender", "Chronicler", "Cleaner", "Inspector", "Mechanizer"].map((badge) => (
                tags.includes(badge) && (
                  <Link
                    key={badge}
                    to={`/library/${badge.toLowerCase()}`}
                    style={{
                      textDecoration: "none",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "var(--gf-space-sm)",
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
                )
              ))}
            </div>

            {/* Other category circles - separate container */}
            {tags.filter((tag) => !["Defender", "Chronicler", "Cleaner", "Inspector", "Mechanizer"].includes(tag)).length > 0 && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "var(--gf-space-lg)",
                  justifyContent: "center",
                  marginTop: "var(--gf-space-xl)"
                }}
              >
                {tags.filter((tag) => !["Defender", "Chronicler", "Cleaner", "Inspector", "Mechanizer"].includes(tag)).map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setTagFilter(tag)}
                    style={{
                      textDecoration: "none",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "var(--gf-space-sm)",
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                      transition: "transform 0.2s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    <div
                      style={{
                        width: "120px",
                        height: "120px",
                        borderRadius: "50%",
                        backgroundColor: "var(--gf-color-accent-soft)",
                        border: "2px solid var(--gf-color-accent)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "var(--gf-space-sm)"
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.85rem",
                          fontWeight: 600,
                          color: "var(--gf-color-accent)",
                          textAlign: "center",
                          lineHeight: 1.2
                        }}
                      >
                        {tag}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </section>
        </>
      )}

      {showEmptyLibrary || showEmptyFilter ? (
        <p style={{ color: "var(--gf-color-text-subtle)" }}>
          {showEmptyLibrary
            ? "No library articles yet."
            : "No articles match this filter."}
        </p>
      ) : (
        <>
          {hasFilter && selectedTag && (
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: 600,
                marginBottom: "var(--gf-space-md)",
                color: "var(--gf-color-accent)"
              }}
            >
              {selectedTag}
            </h2>
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--gf-space-lg)"
            }}
          >
            {articlesToShow.map((article) => (
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
        </>
      )}
    </div>
  );
};
