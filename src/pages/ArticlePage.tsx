import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { siteConfig } from "../config/site";

export const ArticlePage: React.FC = () => {
  const location = useLocation();
  const article = siteConfig.articles.find((a) => a.path === location.pathname);

  if (!article) {
    return <Navigate to="/" replace />;
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
          marginBottom: "var(--gf-space-xl)",
          color: "var(--gf-color-accent)",
          lineHeight: 1.2
        }}
      >
        {article.title}
      </h1>
      <div
        className="article-body"
        style={{
          color: "var(--gf-color-text)",
          lineHeight: 1.8,
          fontSize: "1.25rem"
        }}
        dangerouslySetInnerHTML={{ __html: article.body }}
      />
    </article>
  );
};
