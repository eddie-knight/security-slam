import React, { useState, useRef, useEffect } from "react";
import { sponsorLogos } from "../content/sponsorLogos";

export const LogoBar: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const isUserInteractingRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastScrollPositionRef = useRef<number>(0);
  const scrollSpeed = 0.5; // pixels per frame

  if (sponsorLogos.length === 0) return null;

  // Triple logos for seamless infinite scroll (3x length)
  const duplicatedLogos = [...sponsorLogos, ...sponsorLogos, ...sponsorLogos];

  // Sync ref with state
  useEffect(() => {
    isUserInteractingRef.current = isUserInteracting;
  }, [isUserInteracting]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const autoScroll = () => {
      if (!container || isUserInteractingRef.current) {
        animationFrameRef.current = requestAnimationFrame(autoScroll);
        return;
      }

      const scrollWidth = container.scrollWidth;
      const oneSetWidth = scrollWidth / 3;
      const currentScroll = container.scrollLeft;

      let newScroll = currentScroll + scrollSpeed;

      if (newScroll >= oneSetWidth) {
        newScroll = newScroll - oneSetWidth;
      }

      container.scrollLeft = newScroll;

      animationFrameRef.current = requestAnimationFrame(autoScroll);
    };

    // Only tick while the bar is on screen; an always-on rAF loop costs a
    // layout read + scroll write per frame for the whole visit.
    const observer = new IntersectionObserver(([entry]) => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = entry.isIntersecting ? requestAnimationFrame(autoScroll) : null;
    });
    observer.observe(container);

    return () => {
      observer.disconnect();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [scrollSpeed]);

  const handleUserInteraction = () => {
    setIsUserInteracting(true);

    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }

    resumeTimeoutRef.current = setTimeout(() => {
      setIsUserInteracting(false);
    }, 2500);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      lastScrollPositionRef.current = container.scrollLeft;
    }
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheelNative = (e: WheelEvent) => {
      const deltaX = e.deltaX || (e.shiftKey ? e.deltaY : 0);
      if (Math.abs(deltaX) < 0.1) return;

      handleUserInteraction();

      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      const maxDeltaPerEvent = 15;
      const cappedDelta = Math.sign(deltaX) * Math.min(Math.abs(deltaX), maxDeltaPerEvent);

      const scrollWidth = container.scrollWidth;
      const oneSetWidth = scrollWidth / 3;

      let newScroll = container.scrollLeft + cappedDelta;

      if (newScroll >= oneSetWidth) {
        newScroll = newScroll - oneSetWidth;
      } else if (newScroll < 0) {
        newScroll = 0;
      }

      container.scrollLeft = newScroll;
      lastScrollPositionRef.current = newScroll;
    };

    container.addEventListener("wheel", handleWheelNative, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheelNative);
    };
  }, [handleUserInteraction]);

  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <section
      id="logo-bar"
      className="logo-bar"
      style={{
        marginBottom: "var(--gf-space-xl)",
        marginTop: "var(--gf-space-xl)"
      }}
    >
      <style>{`
        #logo-bar div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div
        ref={scrollContainerRef}
        onMouseDown={handleUserInteraction}
        onTouchStart={handleUserInteraction}
        onTouchMove={handleUserInteraction}
        style={{
          overflowX: "auto",
          overflowY: "hidden",
          scrollBehavior: "auto",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          paddingBottom: "var(--gf-space-lg)",
          paddingTop: "var(--gf-space-lg)",
          width: "100vw",
          marginLeft: "calc(-50vw + 50%)",
          paddingLeft: "var(--gf-space-xl)",
          paddingRight: "var(--gf-space-xl)"
        }}
      >
        <div className="logo-bar__track">
          {duplicatedLogos.map((src, index) => (
            <img
              key={index}
              src={src}
              alt="Sponsor"
              className="logo-bar__img"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
