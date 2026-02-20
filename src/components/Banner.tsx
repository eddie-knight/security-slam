import React from "react";

export interface BannerProps {
  message: string;
  isVisible: boolean;
  onDismiss: () => void;
}

export const Banner: React.FC<BannerProps> = ({
  message,
  isVisible,
  onDismiss
}) => {
  if (!isVisible) {
    return null;
  }

  return (
    <div
      style={{
        backgroundColor: "var(--gf-color-complement)",
        color: "#000",
        padding: "var(--gf-space-md)",
        textAlign: "center",
        position: "relative",
        fontSize: "0.95rem",
        fontWeight: 500
      }}
    >
      <span>{message}</span>
      <button
        onClick={onDismiss}
        type="button"
        aria-label="Dismiss banner"
        style={{
          position: "absolute",
          right: "var(--gf-space-md)",
          top: "50%",
          transform: "translateY(-50%)",
          background: "transparent",
          border: "none",
          color: "#000",
          fontSize: "1.5rem",
          cursor: "pointer",
          padding: "0.25rem 0.5rem",
          lineHeight: 1,
          fontWeight: "bold"
        }}
      >
        ×
      </button>
    </div>
  );
};
