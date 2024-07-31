import { useRef, useEffect, CSSProperties } from 'react';
import { motion, useInView, useAnimation, UseInViewOptions } from "framer-motion";
import { FramerMotionVariants } from '@utils/enums'
import { framerMotionRepeatOnce } from '@utils/variables';

interface Props {
    children: JSX.Element;
    width?: 'fit-content' | '100%';
    slidingSquare?: boolean;
    squareStyle?: CSSProperties;
    className?: string;
    once?: boolean;
    amount?: UseInViewOptions["amount"];
    visibleVariant?: FramerMotionVariants;
    hiddenVariant?: FramerMotionVariants;
    delay?: number;
    duration?: number;
    enabled: boolean;
    slideFrom?: 'left' | 'right';
    slideAmount?: number;
}

export default function SwitchesReveal({
    children,
    width,
    className,
    once = framerMotionRepeatOnce,
    amount = 0.2,
    visibleVariant = FramerMotionVariants.basicVisible,
    hiddenVariant = FramerMotionVariants.basicHidden,
    delay = 0.25,
    duration = 0.5,
    enabled,
    slideFrom = 'left',
    slideAmount = 100,

}: Props) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once, amount });
    const mainControls = useAnimation();

    useEffect(() => {
        if (enabled) {
            mainControls.start(visibleVariant)
        }
        else {
            mainControls.start(hiddenVariant); // Instantly show without animation
        }

    }, [isInView, enabled])

    return (
        <div className={className} ref={ref} style={{ width }}>
            <motion.div
                variants={{
                    hidden: { opacity: 0, x: slideFrom == 'left' ? -1 * slideAmount : slideAmount },
                    visible: { opacity: 1, y: 0, x: 0 },
                }}
                initial={hiddenVariant}
                animate={mainControls}
                transition={{ duration: duration, delay: delay, ease: 'easeInOut' }}
            >
                {children}
            </motion.div>

        </div>
    )
}
