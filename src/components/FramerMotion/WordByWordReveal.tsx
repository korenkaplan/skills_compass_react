import { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation, UseInViewOptions } from "framer-motion";
enum Variants {
    basicHidden = 'hidden',
    basicVisible = 'visible',
}
interface Props {
    amount?: UseInViewOptions["amount"];
    once?: boolean;
    className?: string;
    visibleVariant?: Variants;
    hiddenVariant?: Variants;
    width?: 'fit-content' | '100%';
    text: string
    duration?: number;
    speed?: number;
    enabled?: boolean;

}

export default function WordByWordReveal({
    speed = 10,
    duration,
    text,
    visibleVariant = Variants.basicVisible,
    hiddenVariant = Variants.basicHidden,
    amount = 0.2,
    once = true,
    width,
    enabled = true,

}: Props) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once, amount });
    const mainControls = useAnimation();

    useEffect(() => {
        if(enabled)
        {
            if (isInView) {
                mainControls.start(visibleVariant)
            }
            if(!isInView && !once) {
                mainControls.start(hiddenVariant)
            }
        }
        else{
            mainControls.set(visibleVariant)

        }

    }, [isInView])

    const textArray: string[] = text.split(" ");

    return (
        <div ref={ref} style={{ position: "relative", width, overflow: 'hidden' }}>
            {
                textArray.map((el, i) => (
                    <motion.span
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1 },
                        }}
                        initial={hiddenVariant ? hiddenVariant : "hidden"}
                        animate={mainControls}
                        transition={{
                            duration: duration ? duration : 0.25,
                            delay: i / speed,
                        }}
                        key={i}
                    >
                        {el}{" "}
                    </motion.span>
                ))
            }
        </div>
    )
}