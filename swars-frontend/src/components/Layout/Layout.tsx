import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div className="layout-swars">
    <Navbar />
    <main className="main-content-swars">{children}</main>
    <Footer />
  </div>
);

export default Layout;
