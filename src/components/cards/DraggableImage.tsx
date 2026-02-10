import { motion } from "framer-motion";
import Image from "next/image";
import { RefObject } from "react";

interface DraggableImageProps {
  id: number;
  src: string;
  alt: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  delay: number;
  constraintsRef: RefObject<HTMLElement>;
  isDragEnabled?: boolean;
}

export default function DraggableImage({
  src,
  alt,
  position,
  size,
  delay,
  constraintsRef,
  isDragEnabled = true,
}: DraggableImageProps) {
  return (
    <motion.div
      drag={isDragEnabled}
      dragElastic={0.2}
      dragMomentum={false}
      dragConstraints={constraintsRef}
      dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.33, 1, 0.68, 1],
        delay,
      }}
      whileDrag={{ scale: 1.05, cursor: "grabbing" }}
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        zIndex: 5,
      }}
      className={`rounded-2xl overflow-hidden shadow-xl ${
        isDragEnabled
          ? "cursor-grab active:cursor-grabbing"
          : "cursor-default"
      } touch-none`}
    >
      <div className="relative w-full h-full select-none">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover pointer-events-none"
          sizes="280px"
          draggable={false}
        />
      </div>
    </motion.div>
  );
}
