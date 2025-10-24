//libraries
import { cn } from "./utils";
import { motion, type Variants } from "motion/react";

const wordVariants: Variants = {
  hidden: { opacity: 0, filter: "blur(20px)", y: 15 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};

interface BlurRevealProps {
  text: string;
  className?: string;
}

export default function BlurRevealText({ text, className }: BlurRevealProps) {
  const words = text.split(" ");

  return (
    <motion.h1
      className={cn(
        "leading-tight text-center flex flex-wrap justify-center",
        className
      )}
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.1 } },
      }}
    >
      {words.map((word, idx) => (
        <motion.span key={idx} variants={wordVariants} className="mx-1">
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
}
