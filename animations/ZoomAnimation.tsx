'use client';

import { motion } from 'framer-motion';

interface ZoomInEffectProps {
  src: string;
  alt: string;
  duration?: number;
  startScale?: number;
  endScale?: number;
  opacityStart?: number;
  opacityEnd?: number;
  id?: string;
}

export default function ZoomInEffect({
  src,
  alt,
  duration = 1.5,
  startScale = 0.8,
  endScale = 1,
  opacityStart = 0,
  opacityEnd = 1,
  id,
}: ZoomInEffectProps) {
  return (
    <motion.img
      id={id}
      src={src}
      alt={alt}
      initial={{ opacity: opacityStart, scale: startScale }}
      whileInView={{ opacity: opacityEnd, scale: endScale }}
      transition={{
        duration: duration,
        ease: 'easeInOut',
      }}
      viewport={{ once: true, amount: 0.3 }} // Trigger when 30% of the element is visible
      style={{
        width: '100%',
        height: 'auto',
        objectFit: 'cover',
      }}
    />
  );
}
