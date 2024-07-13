import { motion, useInView, useAnimation, UseInViewOptions } from "framer-motion";
import { useRef, useEffect } from "react";

type Props = {
  children: JSX.Element;
  className?: string;
  delay?: number;
  amount?: UseInViewOptions["amount"];
  once?: UseInViewOptions["once"];
  slideFrom: 'left' | 'right' ;
  slideAmount?: number;
};

export default function Slide({ slideAmount, slideFrom, once, children, delay, className, amount }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: once ? once :false, amount:amount ? amount : 0.2});
  const controls = useAnimation();
  const slideX = slideAmount ? slideAmount : 100
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
    else {
      controls.start("hidden")
  }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, translateX:slideFrom && slideFrom == 'left'? -1 * slideX : slideX  },
        visible: { opacity: 1, translateX: 0 },
      }}
      transition={{
        type: "spring",
        duration: 0.5,
        damping: 8,
        delay: delay,
        stiffness: 100,
      }}
      initial="hidden"
      animate={controls}
      className={className}
    >
      {children}
    </motion.div>
  );
}
