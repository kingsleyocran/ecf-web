import { useRef, ReactNode, Children, cloneElement, isValidElement, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";
import { wrap } from "@motionone/utils";

interface ParallaxMarqueeProps {
  children: ReactNode;
  baseVelocity?: number;
  className?: string;
}

/**
 * ParallaxMarquee - A velocity-based infinite scrolling marquee component
 *
 * @param children - Content to scroll (can be images, text, or any React nodes)
 * @param baseVelocity - Base scrolling speed in pixels per second (negative for left-to-right, positive for right-to-left). Default: -100
 * @param className - Additional CSS classes for the container
 */
function ParallaxMarquee({
  children,
  baseVelocity = -100,
  className = "",
}: ParallaxMarqueeProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);

  // Measure the width of one set of children
  useEffect(() => {
    const measureWidth = () => {
      if (contentRef.current) {
        // Measure the width of the first group (one complete set of children)
        const firstGroup = contentRef.current.children[0] as HTMLElement;
        if (firstGroup) {
          setContentWidth(firstGroup.offsetWidth);
        }
      }
    };

    measureWidth();
    window.addEventListener('resize', measureWidth);
    return () => window.removeEventListener('resize', measureWidth);
  }, [children]);

  // Transform scroll velocity into a multiplier factor
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  // Use pixel-based wrapping with measured width
  const x = useTransform(baseX, (v) => {
    if (contentWidth === 0) return 0;
    return wrap(0, -contentWidth, v);
  });

  const directionFactor = useRef<number>(1);

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  // Create array of children for repetition
  const childrenArray = Children.toArray(children);

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <motion.div
        ref={contentRef}
        style={{ x }}
        className="flex gap-8 md:gap-12"
      >
        {/* First set */}
        <div className="flex gap-8 md:gap-12 flex-shrink-0">
          {childrenArray.map((child, index) => {
            if (isValidElement(child)) {
              return cloneElement(child, {
                ...child.props,
                key: `first-${index}`,
              });
            }
            return child;
          })}
        </div>
        {/* Second set for seamless loop */}
        <div className="flex gap-8 md:gap-12 flex-shrink-0">
          {childrenArray.map((child, index) => {
            if (isValidElement(child)) {
              return cloneElement(child, {
                ...child.props,
                key: `second-${index}`,
              });
            }
            return child;
          })}
        </div>
        {/* Third set for extra smoothness */}
        <div className="flex gap-8 md:gap-12 flex-shrink-0">
          {childrenArray.map((child, index) => {
            if (isValidElement(child)) {
              return cloneElement(child, {
                ...child.props,
                key: `third-${index}`,
              });
            }
            return child;
          })}
        </div>
      </motion.div>
    </div>
  );
}

export default ParallaxMarquee;
