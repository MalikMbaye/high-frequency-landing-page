import { Instagram, Youtube, Linkedin } from "lucide-react";

// Custom TikTok icon since lucide-react doesn't include one
const TikTokIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.94a8.16 8.16 0 0 0 4.77 1.52V7a4.85 4.85 0 0 1-1.84-.31z" />
  </svg>
);

// Custom Facebook icon
const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 1.312 0 2.453.087 2.475v2.997h2.146c-1.005-1.492-1.492-3.013-1.492-4.669 0-1.969.792-3.777 2.075-5.085-.013-.022-.028-.042-.041-.064-1.281-1.308-2.073-3.116-2.073-5.085 0-1.969.792-3.777 2.073-5.085.013-.022.028-.042.041-.064C17.208 1.038 18.635.252 20.268.252c1.633 0 3.06.786 3.866 1.979.013.022.028.042.041.064 1.281 1.308 2.073 3.116 2.073 5.085 0 1.969-.792 3.777-2.073 5.085-.013.022-.028.042-.041.064-.806 1.193-2.233 1.979-3.866 1.979-1.633 1.308-3.06.786-3.866-1.979-.013-.022-.028-.042-.041-.064-1.281-1.308-2.073-3.116-2.073-5.085z" />
  </svg>
);

// Custom Apple/App Store icon
const AppleIcon = () => (
  <svg width="20" height="20" viewBox="0 1 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.5-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
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

        <div className="footer-social-group">
          <div className="footer-social-block">
            <span className="footer-social-label">J</span>
            <div className="footer-social">
              <a href="https://www.instagram.com/jstayclutch/" target="_blank" rel="noopener noreferrer" aria-label="Jay Instagram"><Instagram size={20} /></a>
              <a href="https://www.tiktok.com/@jjohnsonjr" target="_blank" rel="noopener noreferrer" aria-label="Jay TikTok"><TikTokIcon /></a>
              <a href="https://www.youtube.com/channel/UC1AaIjDyA6OQfD_FhDyMjVg" target="_blank" rel="noopener noreferrer" aria-label="Jay YouTube"><Youtube size={20} /></a>
              <a href="https://www.linkedin.com/in/jjohnson-jr/" target="_blank" rel="noopener noreferrer" aria-label="Jay LinkedIn"><Linkedin size={20} /></a>
            </div>
          </div>
          <div className="footer-social-block">
            <span className="footer-social-label">HFH</span>
            <div className="footer-social">
              <a href="https://www.instagram.com/highfrequencyhw/" target="_blank" rel="noopener noreferrer" aria-label="HFH Instagram"><Instagram size={20} /></a>
              <a href="https://www.tiktok.com/@highfrequencyhighway?_t=8U6dmXHRa03&_r=1" target="_blank" rel="noopener noreferrer" aria-label="HFH TikTok"><TikTokIcon /></a>
              <a href="https://www.facebook.com/profile.php?id=100090164304833#" target="_blank" rel="noopener noreferrer" aria-label="HFH Facebook"><FacebookIcon /></a>
              <a href="https://apps.apple.com/us/app/high-frequency-highway/id1616225876" target="_blank" rel="noopener noreferrer" aria-label="HFH App Store"><AppleIcon /></a>
            </div>
          </div>
        </div>

        <p className="copyright">HIGH FREQUENCY HIGHWAY © 2026</p>
      </div>
    </footer>
  );
};

export default Footer;
