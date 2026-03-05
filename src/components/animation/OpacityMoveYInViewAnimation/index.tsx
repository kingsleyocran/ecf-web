import { motion } from "framer-motion";
import { ReactNode } from "react";
import { useInView } from "react-intersection-observer";

export default function MaskText({
  children,
  extraClassNames = "text-start",
  animationDelay = 0.075,
  duration = 0.75,
  triggerOnce = false,
  positionFrom = 50,
  div = false,
}: {
  children: ReactNode;
  extraClassNames?: string;
  animationDelay?: number;
  duration?: number;
  triggerOnce?: boolean;
  positionFrom: number;
  div?: boolean;
}) {
  const animation = {
    initial: { opacity: "0", y: positionFrom },
    enter: (i: number) => ({
      opacity: "100%",
      y: 0,
      transition: {
        duration: duration,
        ease: [0.33, 1, 0.68, 1],
        delay: animationDelay,
      },
    }),
  };

  const { ref, inView } = useInView({
    threshold: 0.25,
    triggerOnce: triggerOnce,
  });

  const MotionTag = div ? motion.div : motion.p;

  return (
    <div ref={ref}>
      <div key={1} className={extraClassNames + " " + "m-0"}>
        <MotionTag
          custom={1}
          variants={animation}
          initial="initial"
          animate={inView ? "enter" : ""}
        >
          {children}
        </MotionTag>
      </div>
    </div>
  );
}
