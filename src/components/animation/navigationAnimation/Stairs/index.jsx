import React from "react";
import { motion } from "framer-motion";
import { opacity, expand } from "./anim";
import styles from "./styles.module.scss";

export default function Layout({ children }) {
  const anim = (variants, custom = null) => {
    return {
      initial: "initial",
      animate: "enter",
      exit: "exit",
      custom,
      variants,
    };
  };

  const nbOfColumns = 3;
  return (
    <div
      className={styles.stairs + " transition-all duration-200 bg-th-background"}
      style={{ backgroundColor: "var(--background)" }}
    >
      <motion.div {...anim(opacity)} className={styles.background + " transition-all duration-200"} />

      <div className={styles.container}>
        {[...Array(nbOfColumns)].map((_, i) => {
          return <motion.div key={i} {...anim(expand, nbOfColumns - i)} />;
        })}
      </div>

      <div className="h-full transition-all duration-200 bg-th-background">
      {children}
      </div>
    </div>
  );
}
