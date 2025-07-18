import React from "react";
import "./About.css";
import theme_pattern from "../assets/theme_pattern.svg";
import profile_img from "../assets/about_profile.svg";
import { FaHtml5, FaCss3Alt, FaReact, FaNodeJs } from "react-icons/fa";
import {
  SiJavascript,
  SiBootstrap,
  SiMui,
  SiTailwindcss,
  SiExpress,
  SiMongodb,
} from "react-icons/si";

const skills = [
  { name: "HTML 5", icon: <FaHtml5 color="#e34c26" /> },
  { name: "CSS 3", icon: <FaCss3Alt color="#264de4" /> },
  { name: "JavaScript", icon: <SiJavascript color="#f0db4f" /> },
  { name: "Bootstrap", icon: <SiBootstrap color="#7952b3" /> },
  { name: "React JS", icon: <FaReact color="#61dafb" /> },
  { name: "Material UI", icon: <SiMui color="#007fff" /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss color="#38bdf8" /> },
  { name: "Node JS", icon: <FaNodeJs color="#68a063" /> },
 { name: "Express JS", icon: <SiExpress color="#ffffff" /> },
  { name: "MongoDB", icon: <SiMongodb color="#4db33d" /> },
];

const About = () => {
  return (
    <div id="about" className="about">
      <div className="about-title">
        <h1>About Me</h1>
        <img src={theme_pattern} alt="decoration pattern" />
      </div>

      <div className="about-section">
        <div className="about-left">
          <img src={profile_img} alt="Gobinath R profile" />
        </div>

        <div className="about-right">
          <div className="about-para">
            <p>
              I'm Gobinath R, a passionate Full Stack Web Developer with
              hands-on experience in building modern, responsive web
              applications using the MERN stack (MongoDB, Express, React,
              Node.js).
            </p>
            <p>
              With a strong foundation in JavaScript and backend logic, I thrive
              on turning ideas into efficient and elegant solutions. Whether
              it's crafting UI/UX or building secure APIs, I bring value through
              clean code and creativity. Beyond coding, I enjoy exploring new
              technologies, collaborating with teams, and continuously improving
              my skills.
            </p>
          </div>

          <div className="about-skills">
            {skills.map((skill, i) => (
              <div key={i} className="about-skill">
                <div className="skill-icon">{skill.icon}</div>
                <p>{skill.name}</p>
                <hr />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
