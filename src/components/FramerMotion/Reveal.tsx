import React, {useRef, useEffect, CSSProperties} from 'react';
import {motion, useInView, useAnimation, UseInViewOptions} from "framer-motion";

enum Variants {
    basicHidden = 'hidden',
    basicVisible = 'visible',
}

interface Props {
    children: JSX.Element;
    width?: 'fit-content' | '100%';
    slidingSquare?: boolean;
    squareStyle?:CSSProperties;
    className?: string;
    once?: boolean;
    amount?: UseInViewOptions["amount"];
    visibleVariant?: Variants;
    hiddenVariant?: Variants;
}

export default function Reveal ({
    children,
    width,
    slidingSquare,
    squareStyle,
    className,
    once,
    amount,
    visibleVariant,
    hiddenVariant,
} : Props)  {
const ref = useRef(null)
const isInView = useInView(ref, {once: once? once : false, amount : amount? amount : 0.2});
const mainControls = useAnimation();
const slideControls = useAnimation();
const slideStyle: CSSProperties = {
    position: "absolute",
    top: 4,
    bottom: 4,
    left: 0,
    right: 0,
    zIndex: 20,
    ...squareStyle
}
useEffect(() => {
    if (isInView)
    {
        mainControls.start(visibleVariant ? visibleVariant.toString :"visible")
        slideControls.start("visible")
    }
    else {
        mainControls.start(hiddenVariant ? hiddenVariant.toString :"hidden")
        slideControls.start("hidden")
    }
},[isInView])

return (
    <div  ref={ref} style={{position: "relative", width, overflow:'hidden'}}>
        <motion.div
        variants={{
            hidden: { opacity: 0,y: 100 },
            visible: { opacity: 1,y: 0 },
        }}
        initial={hiddenVariant ? hiddenVariant: "hidden"}
        animate= {mainControls}
        transition={{ duration: 0.5, delay:0.25 }}
        className={className}
        >
          {children}
        </motion.div>
        {
            slidingSquare && (
        <motion.div
        variants={{
            hidden: { left: 0 },
            visible: { left: '100%' },
        }}
        initial="hidden"
        animate= {slideControls}
        transition={{ duration: 0.5, ease:'easeIn' }}
        style={slideStyle}
        />
            )
        }

    </div>
)
}
