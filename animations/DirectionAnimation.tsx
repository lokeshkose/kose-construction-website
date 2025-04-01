// 'use client';

// import { motion } from 'framer-motion';
// import { useEffect, useState, useRef } from 'react';

// interface DirectionAnimationProps {
//   start: number;  // The starting position value
//   end: number;    // The ending position value
//   duration?: number;  // Duration of the animation in seconds (optional)
//   direction: 'topToBottom' | 'bottomToTop' | 'leftToRight' | 'rightToLeft'; // Direction of the animation
//   children: React.ReactNode;  // Content to animate
//   id: string;  // Unique id for each element
// }

// export default function DirectionAnimation({
//   start,
//   end,
//   duration = 2,  // Default duration is 2 seconds if not provided
//   direction,
//   children,
//   id,
// }: DirectionAnimationProps) {
//   const [isInView, setIsInView] = useState(false);
//   const elementRef = useRef<HTMLDivElement>(null);
//   let initial = {};
//   let animate = {};
//   let transition = {
//     duration: duration,
//     ease: 'easeInOut',
//   };

//   // Determine the direction and set initial and animate properties accordingly
//   switch (direction) {
//     case 'topToBottom':
//       initial = { y: start };
//       animate = { y: isInView ? end : start };
//       break;
//     case 'bottomToTop':
//       initial = { y: start };
//       animate = { y: isInView ? end : start };
//       break;
//     case 'leftToRight':
//       initial = { x: start };
//       animate = { x: isInView ? end : start };
//       break;
//     case 'rightToLeft':
//       initial = { x: start };
//       animate = { x: isInView ? end : start };
//       break;
//     default:
//       break;
//   }

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting && !isInView) {
//           setIsInView(true); // Set in view only once
//         }
//       },
//       { threshold: 0.2 } // Trigger when 40% of the element is in view
//     );

//     if (elementRef.current) {
//       observer.observe(elementRef.current);
//     }

//     return () => {
//       if (elementRef.current) {
//         observer.unobserve(elementRef.current);
//       }
//     };
//   }, [isInView]);

//   return (
//     <motion.div
//       id={id}
//       ref={elementRef}
//       initial={initial}
//       animate={animate}
//       transition={transition}
//     >
//       {children}
//     </motion.div>
//   );
// }


import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

interface DirectionAnimationProps {
  start: number;
  end: number;
  duration?: number;
  direction: 'topToBottom' | 'bottomToTop' | 'leftToRight' | 'rightToLeft';
  children: React.ReactNode;
  id: string;
}

export default function DirectionAnimation({
  start,
  end,
  duration = 2,
  direction,
  children,
  id,
}: DirectionAnimationProps) {
  const [isInView, setIsInView] = useState(false);
  const [startValue, setStartValue] = useState(start);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Adjust start position for mobile screens
    const getStartValue = () => (window.innerWidth < 768 ? start / 2 : start);
    setStartValue(getStartValue());
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true);
        }
      },
      { threshold: 0.05 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [isInView]);

  const initial = direction.includes('left') || direction.includes('right') ? { x: startValue } : { y: startValue };
  const animate = direction.includes('left') || direction.includes('right') ? { x: isInView ? end : startValue } : { y: isInView ? end : startValue };

  return (
    <motion.div ref={elementRef} id={id} initial={initial} animate={animate} transition={{ duration, ease: 'easeInOut' }}>
      {children}
    </motion.div>
  );
}
