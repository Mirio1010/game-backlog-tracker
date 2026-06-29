import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import imageSrc from "../../assets/homepage/carousel/videogames.jpg";
import dashboardSrc from "../../assets/homepage/carousel/dashboard-preview.jpg";
import backlogSrc from "../../assets/homepage/carousel/backlog-preview.jpg";
import statsSrc from "../../assets/homepage/carousel/stats-preview.jpg";

import { GlowEffect } from "../motion-primitives/glow-effect";

const slides = [
  {
    src: imageSrc,
    alt: "Video game collection",
  },
  {
    src: dashboardSrc,
    alt: "Dashboard preview",
  },
  {
    src: backlogSrc,
    alt: "Backlog page preview",
  },
  {
    src: statsSrc,
    alt: "Stats page preview",
  },
];

const ProductPreviewCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const activeSlide = slides[activeIndex];

  return (
    <div className="relative">
      <GlowEffect
        colors={["#f93816", "#8b5cf6", "#f59e0b", "#f93816"]}
        mode="rotate"
        blur="stronger"
        scale={0.93}
        duration={4}
        className="opacity-35"
      />

      <div
        className="relative z-10 aspect-video w-full overflow-hidden rounded-2xl bg-black"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={activeSlide.src}
            src={activeSlide.src}
            alt={activeSlide.alt}
            className="absolute inset-0 h-full w-full bg-black object-contain"
            initial={{ opacity: 0, scale: 1.01, x: 18 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.99, x: -18 }}
            transition={{
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/5" />

        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-black/45 px-3 py-2 backdrop-blur-md">
          {slides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              aria-label={`Go to preview ${index + 1}`}
              onClick={() => setActiveIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "w-6 bg-primary"
                  : "w-1.5 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPreviewCarousel;
