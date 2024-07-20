import React from 'react';
import { Section } from '../../utils/interfaces';
import { DrawerDesktopProps } from '../../components/Drawer/Drawer'; // Adjust the import according to your actual Drawer component's props location
import { DrawerMobileProps } from '../../components/DrawerMobile/DrawerMobile';
import { appBarHeight } from '../../utils/variables';

interface ContentProps {
  isMobile: boolean;
  sections: Section[];
  DrawerComponent: React.FC<DrawerDesktopProps | DrawerMobileProps>;
  variant: 'temporary' | 'persistent' | 'permanent';
  isOpen: boolean;
  toggleDrawer: (newOpen: boolean) => void;
  marginLeftAmount: number;
}
const extraSpaceFromAppBarInPx = 0

const Content: React.FC<ContentProps> = ({
  isMobile,
  sections,
  DrawerComponent,
  variant,
  isOpen,
  toggleDrawer,
  marginLeftAmount,
}) => {
  return (
    <div style={{marginTop: isMobile ? `${appBarHeight + 80 + extraSpaceFromAppBarInPx}px` : '0px'}} className={isMobile ? "sectionsWrapperMobile" : "sectionsWrapperDesktop"}>
      <DrawerComponent sections={sections} variant={variant} open={isOpen} toggleDrawer={toggleDrawer} />
      <div className="content" style={{ marginLeft: isOpen && !isMobile ? marginLeftAmount : 0 }}>
        {sections.map((section) => (
          <div key={section.id} id={section.id} className="section">
            <section.component />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Content;
