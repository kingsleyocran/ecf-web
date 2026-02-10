import { useEffect, useState, useCallback } from "react";

import styles from "./style.module.scss";

import { motion, useMotionValue, useSpring } from "framer-motion";

export default function DotStickyCursor() {
  const cursorSize = 15;

  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 };

  const smoothMouse = {
    x: useSpring(mouse.x, smoothOptions),
    y: useSpring(mouse.y, smoothOptions),
  };

  const manageMouseMove = useCallback((e: { clientX: any; clientY: any }) => {
    const { clientX, clientY } = e;
    mouse.x.set(clientX - cursorSize / 2);
    mouse.y.set(clientY - cursorSize / 2);
  }, [mouse.x, mouse.y, cursorSize]);

  useEffect(() => {
    window.addEventListener("mousemove", manageMouseMove);

    return () => {
      window.removeEventListener("mousemove", manageMouseMove);
    };
  }, [manageMouseMove]);

  // Detect if cursor changes to a pointer
  const [cursorStyle, setCursorStyle] = useState<string | undefined>();
  useEffect(() => {
    const checkCursorStyle = (e: { clientX: number; clientY: number }) => {
      const elementUnderPointer = document.elementFromPoint(
        e.clientX,
        e.clientY
      );
      if (elementUnderPointer) {
        setCursorStyle(window.getComputedStyle(elementUnderPointer).cursor);
      }
    };

    // Add event listener for mouse movement
    document.addEventListener("mousemove", checkCursorStyle);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousemove", checkCursorStyle);
    };
  }, []);

  return (
    <div className={styles.cursorContainer}>
      <motion.div
        style={{
          left: smoothMouse.x,
          top: smoothMouse.y,
        }}
        className={`${
          cursorStyle === "text" ? styles.cursorOnText : styles.cursor
        } ${
          cursorStyle === "pointer" ? styles.cursorOnPointer : styles.cursor
        } transition-all duration-75`}
      ></motion.div>
    </div>
  );
}
