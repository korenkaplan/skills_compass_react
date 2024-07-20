import { motion } from "framer-motion";

interface Props {
    children: JSX.Element;
    scaleAmount?: number;
    enableHoverEffect?: boolean;
    duration?: number;
    className?: string;
}

const scaleVariants = ( scaleAmount: number, enableHoverEffect: boolean, duration: number) => ({
    tap: { scale: scaleAmount },
    hover: enableHoverEffect
        ? {
              scale: [1, scaleAmount, 1],
              transition: { duration: duration, repeat: Infinity }
          }
        : {}
});

export default function ScaleOnTapButtonWrapper({ duration = 1.3, children, scaleAmount = 0.95, enableHoverEffect = true, className= '' }: Props) {

    return (
        <motion.div
            whileTap="tap"
            whileHover="hover"
            variants={scaleVariants(scaleAmount, enableHoverEffect, duration)}
            style={{ position: "relative", overflow: 'hidden' }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
