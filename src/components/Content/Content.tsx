import React, { memo, useMemo } from 'react';
import { Section } from '../../utils/interfaces';
import { DrawerDesktopProps } from '../../components/Drawer/Drawer';
import { DrawerMobileProps } from '../../components/DrawerMobile/DrawerMobile';
import { appBarHeight } from '../../utils/variables';
import './Content.css';

interface ContentProps {
  isMobile: boolean;
  sections: Section[];
  DrawerComponent: React.FC<DrawerDesktopProps | DrawerMobileProps>;
  variant: 'temporary' | 'persistent' | 'permanent';
  isOpen: boolean;
  toggleDrawer: (newOpen: boolean) => void;
  marginLeftAmount: number;
}

const extraSpaceFromAppBarInPx = 0;

const Content: React.FC<ContentProps> = memo(({
  isMobile,
  sections,
  DrawerComponent,
  variant,
  isOpen,
  toggleDrawer,
  marginLeftAmount,
}) => {

  // Memoize the sectionsDiv to avoid unnecessary re-renders
  const sectionsDiv = useMemo(() => (
    sections.map((section) => (
      <div key={section.id} id={section.id} className="section">
        <section.component />
      </div>
    ))
  ), [sections]); // Only re-compute if sections change

  return (
    <div
      style={{ position: 'relative', marginTop: isMobile ? `${appBarHeight + extraSpaceFromAppBarInPx}px` : '0px' }}
      className={isMobile ? "sectionsWrapperMobile" : "sectionsWrapperDesktop"}
    >
      <DrawerComponent
        sections={sections}
        variant={variant}
        open={isOpen}
        toggleDrawer={toggleDrawer}
      />
      <div className="content" style={{ marginLeft: isOpen && !isMobile ? marginLeftAmount : 0 }}>
        {sectionsDiv}
      </div>
    </div>
  );
});

export default Content;
