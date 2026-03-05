import { motion } from "framer-motion";
import { ReactNode } from "react";
import { useInView } from "react-intersection-observer";

export default function Animation({
  children,
  extraClassNames = "text-start",
  outerClassName = "",
  animationDelay = 0.075,
  duration = 0.75,
  triggerOnce = false,
  div = false,
}: {
  children: ReactNode;
  extraClassNames?: string;
  outerClassName?: string;
  animationDelay?: number;
  duration?: number;
  triggerOnce?: boolean;
  div?: boolean;
}) {
  const animation = {
    initial: { scale: "80%" },
    enter: (i: number) => ({
      scale: "100%",
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
    <div ref={ref} className={outerClassName}>
      <div key={1} className={extraClassNames + " m-0 overflow-hidden"}>
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
