import React from 'react';
import { Sidebar, SidebarProps } from './Sidebar';

export { Sidebar };
export type { SidebarProps };

// Compatibility alias for Navbar
export const Navbar: React.FC<Omit<SidebarProps, 'isMobileOpen' | 'setIsMobileOpen'> & {
  isMobileOpen?: boolean;
  setIsMobileOpen?: (open: boolean) => void;
}> = (props) => {
  const [open, setOpen] = React.useState(false);
  return (
    <Sidebar
      {...props}
      isMobileOpen={props.isMobileOpen ?? open}
      setIsMobileOpen={props.setIsMobileOpen ?? setOpen}
    />
  );
};
