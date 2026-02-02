import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { BackgroundArcs } from "./components/BackgroundArcs";
import { HomePage } from "./pages/HomePage";
import { BlogIndexPage } from "./pages/BlogIndexPage";
import { BlogPostPage } from "./pages/BlogPostPage";
import { ArticlePage } from "./pages/ArticlePage";
import { ContactPage } from "./pages/ContactPage";
import { useTheme } from "./theme";
import { siteConfig } from "./config/site";

export const App: React.FC = () => {
  useTheme();

  return (
    <BrowserRouter>
      <div
        className="slam-theme"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          fontFamily: "var(--gf-font-body)",
          background: "var(--gf-color-background)",
          color: "var(--gf-color-text)",
          position: "relative"
        }}
      >
        <BackgroundArcs />
        <Header />
        <main
          className="main-content"
          style={{
            flex: 1,
            padding: "var(--gf-space-lg)",
            paddingTop: "var(--gf-space-xl)"
          }}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            {siteConfig.blog.enabled && (
              <>
                <Route path="/blog" element={<BlogIndexPage />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />
              </>
            )}
            {siteConfig.articles.map((article) => (
              <Route
                key={article.path}
                path={article.path}
                element={<ArticlePage />}
              />
            ))}
            {siteConfig.contactPages.map((contact) => (
              <Route
                key={contact.path}
                path={contact.path}
                element={<ContactPage />}
              />
            ))}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};
