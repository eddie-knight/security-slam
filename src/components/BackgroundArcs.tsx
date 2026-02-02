import React from "react";

export const BackgroundArcs: React.FC = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        background: "var(--gf-color-background, #000000)",
        pointerEvents: "none",
        overflow: "hidden"
      }}
    >
      <svg
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0
        }}
      >
        <defs>
          <filter id="arc-glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          d="M-100,200 Q400,100 1100,500"
          className="arc arc-1"
          fill="none"
          stroke="var(--gf-color-accent, #e879f9)"
          strokeWidth="2"
          filter="url(#arc-glow)"
          opacity="0.5"
        />
        <path
          d="M-100,800 Q500,400 1100,900"
          className="arc arc-2"
          fill="none"
          stroke="var(--gf-color-accent, #e879f9)"
          strokeWidth="2"
          filter="url(#arc-glow)"
          opacity="0.3"
        />
        <path
          d="M200,-100 Q800,500 200,1100"
          className="arc arc-3"
          fill="none"
          stroke="var(--gf-color-accent, #e879f9)"
          strokeWidth="2"
          filter="url(#arc-glow)"
          opacity="0.2"
        />
      </svg>
      <style>{`
        .arc {
          animation: arc-drift 20s infinite alternate ease-in-out;
        }
        .arc-2 {
          animation-delay: -5s;
        }
        .arc-3 {
          animation-delay: -10s;
        }
        @keyframes arc-drift {
          from {
            transform: translate(-2%, -2%) rotate(-1deg);
          }
          to {
            transform: translate(2%, 2%) rotate(1deg);
          }
        }
      `}</style>
    </div>
  );
};
