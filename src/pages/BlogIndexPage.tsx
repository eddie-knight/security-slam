import React from "react";
import { Link } from "react-router-dom";
import { SectionCard } from "../components/SectionCard";
import { blogPosts } from "../content/blog";

export const BlogIndexPage: React.FC = () => {
  const posts = blogPosts;

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
        Blog
      </h1>
      <p
        style={{
          color: "var(--gf-color-text-subtle)",
          fontSize: "1.25rem",
          marginBottom: "var(--gf-space-xl)",
          lineHeight: 1.6
        }}
      >
        All posts. Add markdown files under <code>src/content/blog/</code> to add or change posts.
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--gf-space-lg)"
        }}
      >
        {posts.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            style={{
              textDecoration: "none",
              color: "inherit"
            }}
          >
            <SectionCard
              title={post.title}
              description={post.excerpt}
            >
              <p
                style={{
                  color: "var(--gf-color-text-subtle)",
                  fontSize: "0.9rem",
                  marginTop: "var(--gf-space-md)",
                  marginBottom: 0
                }}
              >
                {post.date}
              </p>
            </SectionCard>
          </Link>
        ))}
      </div>
    </div>
  );
};
