import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { contrastColor } from '../../utils/theme';
import Hamburger from 'hamburger-react';
import './Appbar.css';

interface AppBarProps {
  isMobile: boolean;
  isOpen: boolean;
  toggleDrawer: (newOpen: boolean) => void;
}

const AppBar: React.FC<AppBarProps> = ({ isMobile, isOpen, toggleDrawer }) => {
  const controls = useAnimation();

  const handleToggle = () => {
    toggleDrawer(!isOpen);
  };

  React.useEffect(() => {
    controls.start({
      boxShadow: isOpen
        ? `none` : `-1px 2px 10px 0px ${contrastColor}` // Shadow when open
    });
  }, [isOpen, controls]);

  return (
    <motion.div
      className="appBar"
      style={{ display: isMobile ? 'flex' : 'none' }}
      animate={controls}
      transition={{ duration: 0.3 }}
    >
      <Hamburger color="var(--contrast-color)" toggled={isOpen} toggle={handleToggle} />
    </motion.div>
  );
};

export default AppBar;
