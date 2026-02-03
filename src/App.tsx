import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { BackgroundArcs } from "./components/BackgroundArcs";
import { HomePage } from "./pages/HomePage";
import { ContactPage } from "./pages/ContactPage";
import { SectionIndexPage } from "./pages/SectionIndexPage";
import { SectionItemPage } from "./pages/SectionItemPage";
import { useTheme } from "./theme";
import { siteConfig } from "./config/site";
import { getSectionItems } from "./content/sections";

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
            {Object.entries(siteConfig.contentSections).map(
              ([section, config]) =>
                config.enabled && (
                  <React.Fragment key={section}>
                    <Route
                      path={`/${section}`}
                      element={<SectionIndexPage section={section} />}
                    />
                    {getSectionItems(section)
                      .filter((item) => item.path)
                      .map((item) => (
                        <Route
                          key={item.path}
                          path={item.path}
                          element={
                            <SectionItemPage
                              section={section}
                              path={item.path}
                            />
                          }
                        />
                      ))}
                    <Route
                      path={`/${section}/:slug`}
                      element={<SectionItemPage section={section} />}
                    />
                  </React.Fragment>
                )
            )}
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
