import React from "react";
import { useParams, Navigate } from "react-router-dom";
import { siteConfig } from "../config/site";

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug
    ? siteConfig.blog.posts.find((p) => p.slug === slug)
    : undefined;

  if (!post) {
    return <Navigate to="/blog" replace />;
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
        {post.title}
      </h1>
      <p
        style={{
          color: "var(--gf-color-text-subtle)",
          fontSize: "1rem",
          marginBottom: "var(--gf-space-xl)"
        }}
      >
        {post.date}
      </p>
      <div
        className="blog-post-body"
        style={{
          color: "var(--gf-color-text)",
          lineHeight: 1.8,
          fontSize: "1.25rem"
        }}
        dangerouslySetInnerHTML={{ __html: post.body }}
      />
    </article>
  );
};
