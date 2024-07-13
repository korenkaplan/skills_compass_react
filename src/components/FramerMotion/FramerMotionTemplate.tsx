import {useRef, useEffect} from 'react';
import {motion, useInView, useAnimation, UseInViewOptions} from "framer-motion";
enum Variants {
    basicHidden = 'hidden',
    basicVisible = 'visible',
}
interface Props {
    children: JSX.Element;
    amount?: UseInViewOptions["amount"];
    once?: boolean;
    className?: string;
    visibleVariant?: Variants;
    hiddenVariant?: Variants;
    width?: 'fit-content' | '100%';
}

export default function Template ({visibleVariant, hiddenVariant, children, amount, once, className, width}: Props) {
const ref = useRef(null)
const isInView = useInView(ref, {once: once? once : false, amount : amount? amount : 0.2});
const mainControls = useAnimation();

useEffect(() => {
    if (isInView)
    {
        mainControls.start(visibleVariant ? visibleVariant.toString :"visible")
    }
},[isInView])


return (
    <div  ref={ref} style={{position: "relative", width, overflow:'hidden'}}>
        <motion.div
            variants={{
                hidden: { opacity: 0,y: 75 },
                visible: { opacity: 1,y: 0 },
            }}
            initial={hiddenVariant ? hiddenVariant: "hidden"}
            animate= {mainControls}
            transition={{ duration: 0.5, delay:0.25 }}
            className={className}
        >
          {children}
        </motion.div>
    </div>
    )
}