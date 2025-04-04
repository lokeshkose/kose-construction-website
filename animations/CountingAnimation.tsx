'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface CountingAnimationProps {
  start: number;
  end: number;
  duration?: number;
  suffix?: string;
  decimalPlaces?: number; // New prop to control decimal places
}

export default function CountingAnimation({
  start,
  end,
  duration = 3,
  suffix = '',
  decimalPlaces = 0 // Default to 0 decimal places (integer)
}: CountingAnimationProps) {
  const [count, setCount] = useState(start);

  useEffect(() => {
    if (start === end) return;

    const step = (end - start) / (duration * 1000 / 50); // Adjust step size for smooth animation

    const interval = setInterval(() => {
      setCount((prev) => {
        const nextValue = prev + step;
        return nextValue >= end ? end : nextValue;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [start, end, duration]);

  return (
    <motion.div
      style={{ fontSize: '2.3rem', fontWeight: 'bold' }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1.2 }}
      transition={{ duration: 0.8 }}
    >
      {count.toFixed(decimalPlaces)}{suffix}
    </motion.div>
  );
}
