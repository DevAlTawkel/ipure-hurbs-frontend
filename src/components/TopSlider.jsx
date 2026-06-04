"use client";

import React, { useEffect, useState, useRef } from "react";
import "./TopSlider.css";

const TopSlider = ({ slides = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isTransitioning = useRef(false);

  const carouselSlides = [...slides, slides[0]];

  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      if (!isTransitioning.current) {
        isTransitioning.current = true;
        setCurrentIndex((prev) => prev + 1);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [slides]);

  const handleTransitionEnd = () => {
    if (currentIndex === slides.length) {
      setCurrentIndex(0);
    }
    isTransitioning.current = false;
  };

  return (
    <div className="TopSlider-wrapper">
      <div
        className="TopSlider-track"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition:
            currentIndex === 0 && !isTransitioning.current
              ? "none"
              : "transform 0.6s ease-in-out",
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {carouselSlides.map((slide, index) => (
          <div key={index} className="TopSlider-slide">
            {slide}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSlider;