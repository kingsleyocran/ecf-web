import * as React from "react";
import { motion } from "framer-motion";

export default function FloatingAnimation({
  children,
  delay = 0.5,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      style={{

        borderRadius: 8,
        margin: 0,
        //cursor: "pointer",
      }}
      animate={["initial"]}
      whileHover={["grow"]}
      variants={{
        grow: {
          scale: 1.2,
        },
        rotate: {
          rotate: [null, -5, 5, 0],
          transition: {
            // delay,
            duration: 10,
            // repeat: Infinity,
            // repeatDelay: 0.2,
            // repeatType: "reverse"
          },
        },
        initial: {
          x: [-40, 40],
          rotate: 0,
          transition: {
            delay,
            duration: 2,
            repeat: Infinity,
            // repeatDelay: 0.2,
            repeatType: "reverse",
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
