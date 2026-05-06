import { Instagram, Twitter, Youtube } from "lucide-react";

// Custom TikTok icon since lucide-react doesn't include one
const TikTokIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.94a8.16 8.16 0 0 0 4.77 1.52V7a4.85 4.85 0 0 1-1.84-.31z" />
  </svg>
);

const Footer = () => {
  return (
    <footer className="page-footer" id="account" data-theme="dark">
      <div className="hfh-container footer-inner">
        <div className="footer-brand">HIGH FREQUENCY HIGHWAY</div>
        <nav className="footer-links">
          <a href="#">PRESS</a>
          <a href="#">CONTACT</a>
          <a href="#">PRIVACY</a>
          <a href="#">TERMS</a>
        </nav>
        <div className="footer-social">
          <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
          <a href="#" aria-label="TikTok"><TikTokIcon /></a>
          <a href="#" aria-label="YouTube"><Youtube size={20} /></a>
          <a href="#" aria-label="X"><Twitter size={20} /></a>
        </div>
        <p className="copyright">HIGH FREQUENCY HIGHWAY © 2026</p>
      </div>
    </footer>
  );
};

export default Footer;
