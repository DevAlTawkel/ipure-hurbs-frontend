"use client";

import React, { useState, useEffect } from "react";
import "./TopSlider.css";

const TopSlider = ({ slides = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides]);

  return (
    <div className="TopSlider-wrapper">
      <div className="TopSlider-slide">
        <span key={currentIndex} className="TopSlider-text">
          {slides[currentIndex]}
        </span>
      </div>
    </div>
  );
};

export default TopSlider;