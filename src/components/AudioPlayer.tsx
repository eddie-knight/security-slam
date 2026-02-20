import React, { useState } from "react";

export interface AudioPlayerProps {
  src: string;
  label?: string;
  inline?: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, label, inline = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{
        display: inline ? "inline-flex" : "flex",
        alignItems: "center",
        gap: "var(--gf-space-sm)",
        marginLeft: inline ? "var(--gf-space-md)" : "0"
      }}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        title={label || "Play audio"}
        style={{
          background: "var(--gf-color-accent-soft)",
          border: "1px solid var(--gf-color-accent)",
          borderRadius: "50%",
          width: inline ? "32px" : "40px",
          height: inline ? "32px" : "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          fontSize: inline ? "1rem" : "1.2rem",
          transition: "transform 0.2s ease, background-color 0.2s ease",
          padding: 0
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.backgroundColor = "var(--gf-color-accent)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.backgroundColor = "var(--gf-color-accent-soft)";
        }}
      >
        🎧
      </button>
      {isOpen && (
        <audio
          controls
          autoPlay
          style={{
            height: inline ? "32px" : "40px",
            maxWidth: inline ? "250px" : "400px"
          }}
        >
          <source src={src} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
};
