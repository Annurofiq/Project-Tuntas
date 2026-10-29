import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

interface PublicLayoutProps {
  children: React.ReactNode;
  hideFooter?: boolean;
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({ children, hideFooter = false }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      {!hideFooter && <Footer />}
    </>
  );
};
