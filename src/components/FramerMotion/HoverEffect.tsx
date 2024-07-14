import React from 'react';
import { motion } from "framer-motion";

interface Props {
    children: JSX.Element;
    scaleAmount?: number;
    enableHoverEffect?: boolean;
    duration?: number;
}

const scaleVariants = (scaleAmount: number, enableHoverEffect: boolean, duration: number) => ({
    hover: enableHoverEffect
        ? {
              scale: [1, scaleAmount, 1],
              transition: { duration: duration, repeat: 1 }
          }
        : {}
});

export default function HoverEffect({ duration = 1.3, children, scaleAmount = 0.95, enableHoverEffect = true }: Props) {

    return (
        <motion.div
            whileHover="hover"
            variants={scaleVariants(scaleAmount, enableHoverEffect, duration)}
            style={{ position: "relative", overflow: 'hidden' }}
        >
            {children}
        </motion.div>
    );
}
