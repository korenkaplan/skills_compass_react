import {useRef, useEffect} from 'react';
import {motion, useInView, useAnimation, UseInViewOptions} from "framer-motion";
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
    delay?: number;
}

export default function WordByWordReveal ({delay, duration, text, visibleVariant, hiddenVariant, amount, once,  width}: Props) {
const ref = useRef(null)
const isInView = useInView(ref, {once: once? once : true, amount : amount? amount : 0.2});
const mainControls = useAnimation();

useEffect(() => {
    if (isInView)
    {
        mainControls.start(visibleVariant ? visibleVariant.toString :"visible")
    }
},[isInView])

const textArray: string[] = text.split(" ");

return (
    <div  ref={ref} style={{position: "relative", width, overflow:'hidden'}}>
        {
            textArray.map((el, i) => (
                <motion.span
                variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 },
                }}
                initial= {hiddenVariant ? hiddenVariant : "hidden"}
                animate={mainControls}
                transition={{
                  duration: duration? duration :0.25,
                  delay:  i / (delay ? delay : 10),
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