import React from "react";
import "./Footer.css";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import AnchorLink from "react-anchor-link-smooth-scroll";
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="footer">
      <div className="footer-top">
        <div className="footer-top-left">
          <h2 className="footer-name">Gobinath R</h2>
          <p>
            I am a full stack developer passionate about building responsive and
            scalable web applications.
          </p>
        </div>

        <div className="footer-top-right">
          <a
            href="https://github.com/gobirg3108/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social fade-in delay-1"
            aria-label="GitHub profile"
          >
            <FaGithub className="footer-icon" />
            <span>GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/gobirg3108/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social fade-in delay-2"
            aria-label="LinkedIn profile"
          >
            <FaLinkedin className="footer-icon" />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>

      <hr />

      <div className="footer-bottom">
        <p className="footer-bottom-left">
          © {currentYear} Gobinath R. All Rights Reserved.
        </p>
        <div className="footer-bottom-right">
          <p>Terms of Service</p>
          <p>Privacy Policy</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
