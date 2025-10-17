import React from 'react';
import './Footer.css';

const Footer: React.FC = () => (
  <footer className="footer-swars">
    <span>© {new Date().getFullYear()} Star Wars GraphQL API. Todos los derechos reservados.</span>
  </footer>
);

export default Footer;
