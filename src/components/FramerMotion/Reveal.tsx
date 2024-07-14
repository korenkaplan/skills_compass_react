import {useRef, useEffect, CSSProperties} from 'react';
import {motion, useInView, useAnimation, UseInViewOptions} from "framer-motion";
import {FramerMotionVariants} from '../../utils/enums'
import { framerMotionRepeatOnce } from '../../utils/variables';

interface Props {
    children: JSX.Element;
    width?: 'fit-content' | '100%';
    slidingSquare?: boolean;
    squareStyle?:CSSProperties;
    className?: string;
    once?: boolean;
    amount?: UseInViewOptions["amount"];
    visibleVariant?: FramerMotionVariants ;
    hiddenVariant?:  FramerMotionVariants;
    delay?: number;
    duration?: number;
    distanceYAxis?: number;
    enabled?: boolean;
}

export default function Reveal ({
    children,
    width,
    slidingSquare,
    squareStyle,
    className,
    once = framerMotionRepeatOnce,
    amount = 0.2,
    visibleVariant = FramerMotionVariants.basicVisible,
    hiddenVariant = FramerMotionVariants.basicHidden,
    delay = 0.25,
    duration = 0.5,
    distanceYAxis = 100 ,
    enabled = true,
} : Props)  {
const ref = useRef(null)
const isInView = useInView(ref, {once, amount});
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
    if(enabled)
    {
        if (isInView)
            {
                mainControls.start(visibleVariant)
                slideControls.start(visibleVariant)
            }
            if (!once && !isInView){
                mainControls.start(hiddenVariant)
                slideControls.start(hiddenVariant)
            }
    }
    else{
        mainControls.set(visibleVariant); // Instantly show without animation
        slideControls.set(visibleVariant);
    }

},[isInView, enabled])

return (
    <div className={className} ref={ref} style={{position: "relative", width, overflow:'hidden'}}>
        <motion.div
        variants={{
            hidden: { opacity: 0,y: distanceYAxis },
            visible: { opacity: 1,y: 0 },
        }}
        initial={hiddenVariant}
        animate= {mainControls}
        transition={{ duration: duration, delay:delay }}
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
