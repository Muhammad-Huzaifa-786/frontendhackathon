import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import "./Footer.css";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About Section */}
        <div className="footer-section">
          <h2 className="footer-heading">About Us</h2>
          <p className="footer-text">
            We are committed to providing the best services and solutions for
            your needs. Our mission is to ensure customer satisfaction and
            innovation.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="footer-section">
          <h2 className="footer-heading">Quick Links</h2>
          <ul className="footer-links">
            <li><a href="/about" className="footer-link">About</a></li>
            <li><a href="/services" className="footer-link">Services</a></li>
            <li><a href="/contact" className="footer-link">Contact</a></li>
            <li><a href="/faq" className="footer-link">FAQ</a></li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div className="footer-section">
          <h2 className="footer-heading">Follow Us</h2>
          <div className="footer-social">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-icon">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-icon">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-icon">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-icon">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Divider and Copyright */}
      <div className="footer-divider">
        <p className="footer-copyright">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
