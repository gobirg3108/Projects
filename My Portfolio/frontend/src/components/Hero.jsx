import React from "react";
import "./Hero.css";
import profile_img from "../assets/profile_img.svg";
import AnchorLink from "react-anchor-link-smooth-scroll";
import resume from "../assets/My_Resume.pdf";

const Hero = () => {
  return (
    <div id="home" className="hero">
      <img src={profile_img} alt="Profile" className="hero-img" />

      <h1 className="hero-title animate-text">
        Hi <span>I'm Gobinath R</span>
        <br />
        Full Stack Web Developer 👨‍💻
      </h1>

      <p className="fade-in">
        I build scalable, high-performance web applications with clean code and
        intuitive design. Driven by a passion for crafting seamless digital
        experiences — from frontend interfaces to robust backend logic.
      </p>

      <div className="hero-action">
        <div className="hero-connect">
          <AnchorLink className="anchor-link" offset={50} href="#contact">
            Connect With Me 🤝
          </AnchorLink>
        </div>
        <a
          href={resume}
          download="Gobinath_R_Resume.pdf"
          className="hero-resume"
        >
          My Resume 📄
        </a>
      </div>
    </div>
  );
};

export default Hero;
