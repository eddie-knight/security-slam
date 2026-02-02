import React, { createContext, useContext, useMemo } from "react";

export type AppTheme = {
  mode: "slam";
  colors: {
    background: string;
    surface: string;
    surfaceSubtle: string;
    text: string;
    textSubtle: string;
    accent: string;
    accentSoft: string;
    borderStrong: string;
    buttonText?: string;
  };
  radii: {
    lg: string;
    xl: string;
    pill: string;
  };
  shadows: {
    surface: string;
    surfaceStrong: string;
  };
  spacing: {
    md: string;
    lg: string;
    xl: string;
  };
  typography: {
    body: string;
    mono: string;
  };
};

const slamTheme: AppTheme = {
  mode: "slam",
  colors: {
    background: "#000000",
    surface: "rgba(30, 27, 75, 0.65)",
    surfaceSubtle: "rgba(30, 27, 75, 0.4)",
    text: "#f5f3ff",
    textSubtle: "#a78bfa",
    accent: "#e879f9",
    accentSoft: "rgba(232, 121, 249, 0.2)",
    borderStrong: "rgba(167, 139, 250, 0.3)",
    buttonText: "#ffffff"
  },
  radii: {
    lg: "0.75rem",
    xl: "1rem",
    pill: "999px"
  },
  shadows: {
    surface:
      "0 8px 32px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(232, 121, 249, 0.2)",
    surfaceStrong:
      "0 12px 48px rgba(0, 0, 0, 0.9), 0 0 20px rgba(232, 121, 249, 0.4)"
  },
  spacing: {
    md: "1.25rem",
    lg: "2rem",
    xl: "2.5rem"
  },
  typography: {
    body: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace"
  }
};

type ThemeContextValue = {
  theme: AppTheme;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export type ThemeProviderProps = {
  children: React.ReactNode;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const theme = useMemo<AppTheme>(() => slamTheme, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme
    }),
    [theme]
  );

  const cssVariables: React.CSSProperties = {
    "--gf-color-background": theme.colors.background,
    "--gf-color-surface": theme.colors.surface,
    "--gf-color-surface-subtle": theme.colors.surfaceSubtle,
    "--gf-color-text": theme.colors.text,
    "--gf-color-text-subtle": theme.colors.textSubtle,
    "--gf-color-accent": theme.colors.accent,
    "--gf-color-accent-soft": theme.colors.accentSoft,
    "--gf-color-border-strong": theme.colors.borderStrong,
    "--gf-color-button-text": theme.colors.buttonText || theme.colors.text,
    "--gf-radius-lg": theme.radii.lg,
    "--gf-radius-xl": theme.radii.xl,
    "--gf-radius-pill": theme.radii.pill,
    "--gf-shadow-surface": theme.shadows.surface,
    "--gf-shadow-surface-strong": theme.shadows.surfaceStrong,
    "--gf-space-md": theme.spacing.md,
    "--gf-space-lg": theme.spacing.lg,
    "--gf-space-xl": theme.spacing.xl,
    "--gf-font-body": theme.typography.body,
    "--gf-font-mono": theme.typography.mono,
    "--gf-accent-glow": "rgba(232, 121, 249, 0.4)",
    "--gf-glass-blur": "blur(12px)",
    "--gf-gradient-brand":
      "linear-gradient(180deg, #e879f9, #a855f7, #6366f1, #3730a3)"
  } as React.CSSProperties;

  return (
    <ThemeContext.Provider value={value}>
      <div className="template-root" style={cssVariables}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
};
