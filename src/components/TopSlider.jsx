"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import './TopSlider.css'

const TopSlider = ({ slides = [] }) => {

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!slides.length || slides.length === 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [slides.length]);

    if (!slides.length) return null;

    return (
        <div className='background-white-400 width-100 display-flex align-items-center justify-content-center TopSlider-main-container'>
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{
                        duration: 0.4,
                        ease: "easeInOut",
                    }}
                    className="width-100 display-flex align-items-center justify-content-center manrope font-500 size-12 color-black-black"
                >
                    {slides[currentIndex]}
                </motion.div>
            </AnimatePresence>
        </div>
    )
}

export default TopSlider