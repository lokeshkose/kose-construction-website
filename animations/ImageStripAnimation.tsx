"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface ImageStripeEffectProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  stripCount?: number;
  duration?: number;
}

const ImageStripeEffect: React.FC<ImageStripeEffectProps> = ({
  src,
  alt,
  width,
  height,
  stripCount = 20,
  duration = 3,
}) => {
  return (
    <div
      style={{
        position: "relative",
        width,
        height,
        overflow: "hidden",
        display: "flex",
      }}
    >
      {Array.from({ length: stripCount }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ height: "0%" }}
          animate={{ height: "100%" }}
          transition={{
            delay: i * (duration / stripCount),
            duration: duration / stripCount,
            ease: "easeOut",
          }}
          style={{
            position: "absolute",
            top: 0,
            left: `${(i * width) / stripCount}px`, // Exact pixel-based positioning
            width: `${width / stripCount + 0.5}px`, // Slightly increased width to remove gaps
            height: "100%",
            clipPath: `polygon(0 100%, 100% 100%, 100% 0, 0 0)`, // Ensures full height expansion
            transform: "scaleX(1.02)", // Slight scaling to prevent gaps
          }}
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            style={{
              objectFit: "cover",
              objectPosition: `${(i * 100) / stripCount}% center`,
              width: "100%",
              height: "100%",
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default ImageStripeEffect;
