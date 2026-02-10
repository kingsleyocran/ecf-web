import { motion } from "framer-motion";

const Marquee = () => {
  const marqueeVariants = {
    animate: {
      x: [0, -800],
      transition: {
        x: {
          duration: 10,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        },
      },
    },
  };
  return (
    <div className="relative w-screen h-[210px] overflow-hidden mt-8">
      <motion.div
        className="absolute whitespace-nowrap"
        animate="animate"
        variants={marqueeVariants}
      >
        <h1 className="text-[8vw] uppercase">
          My first video tutorial on motion - subscribe me
        </h1>
      </motion.div>
    </div>
  );
};

export default Marquee;