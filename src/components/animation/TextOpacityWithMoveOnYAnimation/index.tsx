import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function MaskText({
  phrases,
  extraClassNames = "text-start",
  animationDelay = 0.075,
  positionFrom = 50,
  triggerOnce = false,
}: {
  phrases: string[];
  extraClassNames?: string;
  animationDelay?: number;
  triggerOnce?: boolean;
  positionFrom: number;
}) {
  const animation = {
    initial: { opacity: "0", y: positionFrom },
    enter: (i: number) => ({
      opacity: "100%",
      y: 0,
      transition: {
        duration: 0.75,
        ease: [0.33, 1, 0.68, 1],
        delay: i === 1 ? animationDelay : animationDelay + 0.075 * i,
      },
    }),
  };

  const { ref, inView, entry } = useInView({
    threshold: 0.25,
    triggerOnce: triggerOnce,
  });

  return (
    <div ref={ref}>
      {phrases.map((phrase, index) => {
        return (
          <div key={index} className={extraClassNames + " " + "m-0 "}>
            <motion.p
              custom={index}
              variants={animation}
              initial="initial"
              animate={inView ? "enter" : ""}
            >
              {phrase}
            </motion.p>
          </div>
        );
      })}
    </div>
  );
}
