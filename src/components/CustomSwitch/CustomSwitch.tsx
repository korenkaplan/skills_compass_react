import { motion } from "framer-motion";
import './CustomSwitch.css';



const handleVariants = {
  on: {
    x: 3, // Adjust the value to fit your design
  },
  off: {
    x: 0,
  },
};

export function CustomSwitch({ isOn = false, ...props }) {
  const className = `switch ${isOn ? "on" : "off"}`;

  return (
    <motion.div className={className} {...props}>
      <motion.div
        className="handle"
        variants={handleVariants}
        animate={isOn ? "on" : "off"}
        transition={{
          type: "spring",
          stiffness: 700,
          damping: 30,
        }}
      />
    </motion.div>
  );
}
