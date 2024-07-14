import { motion, useInView, useAnimation, UseInViewOptions } from "framer-motion";
import { useRef, useEffect } from "react";
import { framerMotionRepeatOnce } from "../../utils/variables";

type Props = {
  children: JSX.Element;
  className?: string;
  delay?: number;
  amount?: UseInViewOptions["amount"];
  once?: UseInViewOptions["once"];
  slideFrom?: 'left' | 'right';
  slideAmount?: number;
  duration?: number;
  stiffness?: number
  damping?: number;
  enabled?: boolean;

};

export default function Slide({
  duration = 0.5,
  damping = 8, stiffness = 100,
  slideAmount = 100,
  slideFrom = 'right',
  once = framerMotionRepeatOnce,
  children, delay,
  className,
  enabled = true,
  amount = 0.2 }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: once, amount: amount });
  const controls = useAnimation();
  const slideX = slideAmount
  useEffect(() => {
    if(enabled){
      if (isInView) {
        controls.start("visible");
      }
      if (!once && !isInView) {
        controls.start("hidden")
      }
    }
    else{
      controls.set("visible")
    }

  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, translateX: slideFrom == 'left' ? -1 * slideX : slideX },
        visible: { opacity: 1, translateX: 0 },
      }}
      transition={{
        type: "spring",
        duration: duration,
        damping: damping,
        delay: delay,
        stiffness: stiffness,
      }}
      initial="hidden"
      animate={controls}
      className={className}
    >
      {children}
    </motion.div>
  );
}
