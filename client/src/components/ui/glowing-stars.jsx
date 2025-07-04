"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "../../lib/utils";

export const GlowingStarsBackgroundCard = ({ className, children }) => {
  const [mouseEnter, setMouseEnter] = useState(false);

  return (
    <div
      onMouseEnter={() => {
        setMouseEnter(true);
      }}
      onMouseLeave={() => {
        setMouseEnter(false);
      }}
      className={cn(
        "p-6 w-full max-w-md h-full bg-gradient-to-br rounded-2xl border shadow-lg backdrop-blur-sm transition-all duration-300 from-white/90 to-gray-100/90 border-gray-200/50 hover:shadow-xl",
        className
      )}
    >
      <div className="flex justify-center items-center">
        <Illustration mouseEnter={mouseEnter} />
      </div>
      <div className="px-2 pb-2">{children}</div>
    </div>
  );
};

export const GlowingStarsDescription = ({ className, children }) => {
  return (
    <p
      className={cn(
        "text-sm leading-relaxed text-gray-600 max-w-[16rem]",
        className
      )}
    >
      {children}
    </p>
  );
};

export const GlowingStarsTitle = ({ className, children }) => {
  return (
    <h3 className={cn("mb-2 text-xl font-bold text-gray-800", className)}>
      {children}
    </h3>
  );
};

export const Illustration = ({ mouseEnter }) => {
  const stars = 108;
  const columns = 18;

  const [glowingStars, setGlowingStars] = useState([]);

  const highlightedStars = useRef([]);

  useEffect(() => {
    const interval = setInterval(() => {
      highlightedStars.current = Array.from({ length: 15 }, () =>
        Math.floor(Math.random() * stars)
      );
      setGlowingStars([...highlightedStars.current]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="p-1 w-full h-32"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: `1px`,
      }}
    >
      {[...Array(stars)].map((_, starIdx) => {
        const isGlowing = glowingStars.includes(starIdx);
        const delay = (starIdx % 10) * 0.1;
        const staticDelay = starIdx * 0.01;
        return (
          <div
            key={`matrix-col-${starIdx}`}
            className="flex relative justify-center items-center"
          >
            <Star
              isGlowing={mouseEnter ? true : isGlowing}
              delay={mouseEnter ? staticDelay : delay}
            />
            {mouseEnter && <Glow delay={staticDelay} />}
            <AnimatePresence mode="wait">
              {isGlowing && <Glow delay={delay} />}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

const Star = ({ isGlowing, delay }) => {
  return (
    <motion.div
      key={delay}
      initial={{
        scale: 2,
      }}
      animate={{
        scale: isGlowing ? [1, 1.2, 2.5, 2.2, 1.5] : 1,
        background: isGlowing ? "#8b5cf6" : "#cbd5e1",
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        delay: delay,
      }}
      className={cn("relative z-20 rounded-full bg-slate-300 h-[1px] w-[1px]")}
    ></motion.div>
  );
};

const Glow = ({ delay }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        delay: delay,
      }}
      exit={{
        opacity: 0,
      }}
      className="absolute left-1/2 -translate-x-1/2 z-10 h-[4px] w-[4px] rounded-full bg-purple-500 blur-[1px] shadow-2xl shadow-purple-400"
    />
  );
};
