import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { BadgeNavigation } from "../components/BadgeNavigation";
import { LibraryArticleList } from "../components/LibraryArticleList";
import { markdownComponents } from "../components/markdownComponents";
import { libraryIndex } from "../content/library";

export const LibraryPage: React.FC = () => {

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

      {/* Badge Category Navigation */}
      <BadgeNavigation />

      {/* Article list with tag filters */}
      <LibraryArticleList title="Filter Posts by Tag" />
    </div>
  );
};
