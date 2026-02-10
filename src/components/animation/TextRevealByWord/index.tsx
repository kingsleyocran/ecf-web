import { ReactNode, useEffect, useRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";

type TextRevealByWordProps = {
  text: string;
  className?: string;
};

export default function TextRevealByWord({ text }: TextRevealByWordProps) {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });
  const words = text.split(" ");
  const invertedScrollYProgress = useTransform(scrollYProgress, [1, 0], [0, 1]);

  return (
    <div ref={targetRef} className={"relative z-0"}>
      <div
        className={
          "sticky top-0 mx-auto flex max-w-[500px] lg:max-w-[700px] items-center bg-transparent"
        }
      >
        <h3
          ref={targetRef}
          className={
            "flex flex-wrap justify-center gap-1 font-medium text-center text-black/20 text-3xl md:text-4xl lg:text-5xl"
          }
        >
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word
                key={i}
                progress={invertedScrollYProgress}
                range={[start, end]}
              >
                {word}
              </Word>
            );
          })}
        </h3>
      </div>
    </div>
  );
}

type WordProps = {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
};

function Word({ children, progress, range }: WordProps) {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="relative mx-1 lg:mx-2.5">
      <span className={"absolute opacity-30"}>{children}</span>
      <motion.span style={{ opacity: opacity }} className={"text-black"}>
        {children}
      </motion.span>
    </span>
  );
}
