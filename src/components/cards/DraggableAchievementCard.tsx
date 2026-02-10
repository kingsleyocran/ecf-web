import { motion } from "framer-motion";
import { RefObject } from "react";

interface DraggableAchievementCardProps {
  id: number;
  number: string;
  label: string;
  description: string;
  position: { x: number; y: number };
  delay: number;
  constraintsRef: RefObject<HTMLElement>;
  isDragEnabled?: boolean;
}

export default function DraggableAchievementCard({
  number,
  label,
  description,
  position,
  delay,
  constraintsRef,
  isDragEnabled = true,
}: DraggableAchievementCardProps) {
  return (
    <motion.div
      drag={isDragEnabled}
      dragElastic={0.2}
      dragMomentum={false}
      dragConstraints={constraintsRef}
      dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.6,
        ease: [0.33, 1, 0.68, 1],
        delay,
      }}
      whileHover={isDragEnabled ? { scale: 1.05 } : {}}
      whileDrag={{ scale: 1.05, cursor: "grabbing" }}
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        zIndex: 20,
      }}
      className={`${
        isDragEnabled
          ? "cursor-grab active:cursor-grabbing"
          : "cursor-default"
      } touch-none`}
    >
      <div className="bg-[#025C7F] rounded-3xl p-6 md:p-8 shadow-lg min-w-[280px] max-w-[320px]">
        <div className="text-[#E0C759] text-5xl md:text-6xl font-bold mb-2">
          {number}
        </div>
        <div className="text-white text-lg md:text-xl font-semibold mb-2">
          {label}
        </div>
        <div className="text-white/80 text-sm md:text-base">
          {description}
        </div>
      </div>
    </motion.div>
  );
}
