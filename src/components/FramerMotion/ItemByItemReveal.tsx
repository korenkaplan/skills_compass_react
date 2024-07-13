import { useRef, useEffect, CSSProperties } from 'react';
import { motion, useInView, useAnimation, UseInViewOptions } from "framer-motion";
import React from 'react';

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
    children: React.ReactNode;
    duration?: number;
    speed?: number;
    customStyle?: CSSProperties;
}

export default function ItemByItemReveal({ customStyle, className, speed, duration, children, visibleVariant, hiddenVariant, amount, once, width }: Props) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: once ? once : false, amount: amount ? amount : 0.2 });
    const mainControls = useAnimation();

    useEffect(() => {
        if (isInView) {
            mainControls.start(visibleVariant ? visibleVariant.toString() : "visible");
        }
        else {
            mainControls.start("hidden")
        }
    }, [isInView, mainControls, visibleVariant]);

    const renderAnimatedText = (node: React.ReactNode, keyPrefix: string = ''): React.ReactNode => {
        if (node && typeof node === 'string') {
            console.log(node);

            const textArray =node.split(" ");
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
            const childrenArray = React.Children.toArray(node.props.children);
            return React.cloneElement(node, {
                ...node.props,
                children: childrenArray.map((child, i) => renderAnimatedText(child, `${keyPrefix}-${i}`))
            });
        }
        return node;
    };

    return (
        <div ref={ref} className={className} style={{ position: "relative", width, overflow: 'hidden' , ...customStyle}}>
            {React.Children.map(children, (child, i) => renderAnimatedText(child, `child-${i}`))}
        </div>
    );
}
