import { motion } from "framer-motion";
import {primaryBackgroundColor, primaryHeaderColor, contrastColor} from '../../utils/theme'
interface Props {
    children: JSX.Element;
    scaleAmount?: number;
    duration?: number;
    delay?: number;
}



export default function NavbarItemsHover({ delay = 0, duration = 0.3, children, scaleAmount = 1.3}: Props) {

    return (
        <motion.div
            whileHover="hover"
            variants={{
                hover: {color: primaryHeaderColor,
                     backgroundColor: primaryBackgroundColor,
                     borderRight: `5px solid ${contrastColor}`,
                    }
            }}
            transition={{delay: delay, duration:duration, ease:'easeInOut', stiffness: 300}}
            style={{ position: "relative", overflow: 'hidden' , color: 'white' }}
        >
            {children}
        </motion.div>
    );
}
