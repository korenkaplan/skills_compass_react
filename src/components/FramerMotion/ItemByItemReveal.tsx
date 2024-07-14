import { useRef, useEffect, CSSProperties } from 'react';
import { motion, useInView, useAnimation, UseInViewOptions } from "framer-motion";
import React from 'react';
import { FramerMotionVariants } from '../../utils/enums';
import { framerMotionRepeatOnce } from '../../utils/variables';


interface Props {
    amount?: UseInViewOptions["amount"];
    once?: boolean;
    className?: string;
    visibleVariant?: FramerMotionVariants;
    hiddenVariant?: FramerMotionVariants;
    width?: 'fit-content' | '100%';
    children: React.ReactNode;
    duration?: number;
    speed?: number;
    customStyle?: CSSProperties;
    enabled?: boolean;

}

const voidElements = new Set(['br', 'img', 'hr', 'input', 'link', 'meta', 'area', 'base', 'col', 'command', 'embed', 'keygen', 'param', 'source', 'track', 'wbr']);

export default function ItemByItemReveal({
    customStyle,
    className,
    speed = 10,
    duration = 0.25,
    children,
    visibleVariant = FramerMotionVariants.basicVisible,
    hiddenVariant = FramerMotionVariants.basicHidden,
    amount = 0,
    once = framerMotionRepeatOnce,
    enabled = true,
    width
}: Props) {
    const ref = useRef(null);
    const isInView = useInView(ref, {once, amount});
    const mainControls = useAnimation();

    useEffect(() => {
        if(enabled) {
            if (isInView) {
                mainControls.start(visibleVariant);
            } else {
                mainControls.start(hiddenVariant);
            }
        }
        else {
            mainControls.set(visibleVariant);
        }
    }, [isInView, mainControls, visibleVariant]);

    const renderAnimatedText = (node: React.ReactNode, keyPrefix: string = ''): React.ReactNode => {
        if (node && typeof node === 'string') {
            const textArray = node.split(" ");
            return textArray.map((word, i) => (
                <motion.span
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1 },
                    }}
                    initial={hiddenVariant ? hiddenVariant : "hidden"}
                    animate={mainControls}
                    transition={{
                        duration: duration ? duration : 0.25,
                        delay: i / (speed ? speed : 10),
                    }}
                    key={`${keyPrefix}-${i}`}
                >
                    {word}{" "}
                </motion.span>
            ));
        } else if (React.isValidElement(node)) {
            if (voidElements.has(node.type as string)) {
                return node; // Return void elements as is
            }

            const childrenArray = React.Children.toArray(node.props.children);
            return React.cloneElement(node, {
                ...node.props,
                children: childrenArray.map((child, i) => renderAnimatedText(child, `${keyPrefix}-${i}`))
            });
        }
        return node;
    };

    return (
        <div ref={ref} className={className} style={{ position: "relative", width, overflow: 'hidden', ...customStyle }}>
            {React.Children.map(children, (child, i) => renderAnimatedText(child, `child-${i}`))}
        </div>
    );
}
