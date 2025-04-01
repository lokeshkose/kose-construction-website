'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface CountingAnimationProps {
  start: number;  // Start value of the count
  end: number;    // End value of the count
  duration?: number;  // Duration of the animation in seconds (optional)
}

export default function CountingAnimation({
  start,
  end,
  duration = 3,
  suffix  // Default duration is 3 seconds if not provided
}: any) {
  const [count, setCount] = useState(start);

  useEffect(() => {
    // Animate the count from start to end
    const intervalTime = (duration * 1000) / (end - start); // Calculate interval time for smoothness

    const interval = setInterval(() => {
      setCount((prev: any) => (prev < end ? prev + 1 : end)); // Increment count
    }, intervalTime);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [start, end, duration]);

  return (
    <motion.div
      style={{ fontSize: '3rem', fontWeight: 'bold' }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1.2 }}
      transition={{ duration: 0.5 }}
    >
      {count}{suffix}
    </motion.div>
  );
}
