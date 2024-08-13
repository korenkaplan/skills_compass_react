import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

interface Props {
    children: JSX.Element;
    scaleAmount?: number;
    enableHoverEffect?: boolean;
    duration?: number;
    autoStart?: boolean;
    className?: string;
}

export default function ScaleOnTapButtonWrapper({ duration = 1.3, children, scaleAmount = 0.95, enableHoverEffect = true, autoStart = false, className = '' }: Props) {
    const controls = useAnimation();

    useEffect(() => {
        if (autoStart) {
            controls.start({
                scale: [1, scaleAmount, 1],
                transition: { duration: duration, repeat: Infinity, repeatType: "mirror" }
            });
        }
    }, [autoStart, controls, scaleAmount, duration]);

    return (
        <motion.div
            whileTap={!autoStart ? { scale: scaleAmount } : undefined}
            whileHover={!autoStart && enableHoverEffect ? { scale: [1, scaleAmount, 1], transition: { duration: duration, repeat: Infinity } } : undefined}
            animate={controls}
            style={{ overflow: 'hidden' , cursor: 'pointer' }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
