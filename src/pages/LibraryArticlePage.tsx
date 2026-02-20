import React from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { markdownComponents } from "../components/markdownComponents";
import { getLibraryArticle, getArticlesByTag } from "../content/library";
import { SectionCard } from "../components/SectionCard";

export const LibraryArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getLibraryArticle(slug) : undefined;

  if (!article) {
    return <Navigate to="/library" replace />;
  }

  // Check if this is a badge page
  const isBadgePage = article.badge !== undefined;
  const badgeArticles = isBadgePage && article.badge
    ? getArticlesByTag(article.badge)
    : [];

  return (
    <article
      style={{
        maxWidth: isBadgePage ? "1200px" : "900px",
        margin: "0 auto",
        padding: "var(--gf-space-xl)",
        width: "100%"
      }}
    >
      {/* Badge icon for badge pages */}
      {isBadgePage && article.badge && (
        <div style={{ textAlign: "center", marginBottom: "var(--gf-space-lg)" }}>
          <img
            src={`/badge-icons/${article.badge.toLowerCase()}.png`}
            alt={`${article.badge} Badge`}
            style={{
              width: "200px",
              height: "200px",
              objectFit: "contain"
            }}
          />
        </div>
      )}

      {/* Article image for regular articles */}
      {!isBadgePage && article.image && (
        <div style={{ textAlign: "center", marginBottom: "var(--gf-space-lg)" }}>
          <img
            src={article.image}
            alt={article.title}
            style={{
              maxWidth: "50%",
              height: "auto",
              objectFit: "contain"
            }}
          />
        </div>
      )}

      <h1
        style={{
          fontSize: "2.5rem",
          fontWeight: 700,
          marginBottom: "var(--gf-space-md)",
          color: "var(--gf-color-accent)",
          lineHeight: 1.2
        }}
      >
        {article.title}
      </h1>
      {article.description && (
        <p
          style={{
            color: "var(--gf-color-text-subtle)",
            fontSize: "1.1rem",
            marginBottom: "var(--gf-space-lg)",
            lineHeight: 1.6
          }}
        >
          {article.description}
        </p>
      )}
      <div
        className="library-article-body"
        style={{
          color: "var(--gf-color-text)",
          lineHeight: 1.8,
          fontSize: "1.1rem",
          marginBottom: isBadgePage ? "var(--gf-space-xl)" : "0"
        }}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{article.body}</ReactMarkdown>
      </div>

      {/* Display badge articles if this is a badge page */}
      {isBadgePage && badgeArticles.length > 0 && (
        <div style={{ marginTop: "var(--gf-space-xl)" }}>
          <h2
            style={{
              fontSize: "1.75rem",
              fontWeight: 600,
              marginBottom: "var(--gf-space-lg)",
              color: "var(--gf-color-accent)"
            }}
          >
            Resources
          </h2>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--gf-space-lg)"
            }}
          >
            {badgeArticles.map((badgeArticle) => (
              <Link
                key={badgeArticle.slug}
                to={`/library/${badgeArticle.slug}`}
                style={{
                  textDecoration: "none",
                  color: "inherit"
                }}
              >
                <SectionCard
                  title={badgeArticle.title}
                  description={badgeArticle.description ?? ""}
                >
                  {badgeArticle.tags.length > 0 && (
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "0.5rem",
                        marginTop: "var(--gf-space-md)"
                      }}
                    >
                      {badgeArticle.tags.map((t) => (
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
        </div>
      )}
    </article>
  );
};
