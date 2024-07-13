import React from 'react';
import { motion } from "framer-motion";

interface Props {
    children: JSX.Element;
    scaleAmount?: number;
    enableHoverEffect?: boolean;
    duration?: number;
}

const scaleVariants = (scaleAmount: number, enableHoverEffect: boolean, duration: number) => ({
    tap: { scale: scaleAmount },
    hover: enableHoverEffect
        ? {
              scale: [1, scaleAmount, 1],
              transition: { duration: duration, repeat: Infinity }
          }
        : {}
});

export default function ScaleOnTapButtonWrapper({ duration = 1, children, scaleAmount = 0.85, enableHoverEffect = false }: Props) {

    return (
        <motion.div
            whileTap="tap"
            whileHover="hover"
            variants={scaleVariants(scaleAmount, enableHoverEffect, duration)}
            style={{ position: "relative", overflow: 'hidden' }}
        >
            {children}
        </motion.div>
    );
}
