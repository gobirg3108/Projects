import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import underline from "../assets/nav_underline.svg";
import menu_open from "../assets/menu_open.svg";
import menu_close from "../assets/menu_close.svg";
import AnchorLink from "react-anchor-link-smooth-scroll";

const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const menuRef = useRef();
  const navRef = useRef();

  const openMenu = () => {
    if (menuRef.current) {
      menuRef.current.style.right = "0";
    }
  };

  const closeMenu = () => {
    if (menuRef.current) {
      menuRef.current.style.right = "-350px";
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        menuRef.current &&
        navRef.current &&
        !menuRef.current.contains(e.target) &&
        !navRef.current.contains(e.target)
      ) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [menuRef, navRef]);

  return (
    <div className="navbar" ref={navRef}>
      <span>Gobinath R</span>

      <img
        src={menu_open}
        onClick={openMenu}
        alt="Open menu"
        className="nav-mob-open"
      />

      <ul ref={menuRef} className="nav-menu">
        <img
          src={menu_close}
          onClick={closeMenu}
          alt="Close menu"
          className="nav-mob-close"
        />

        <li>
          <AnchorLink className="anchor-link" href="#home">
            <p onClick={() => setMenu("home")}>Home</p>
          </AnchorLink>
          {menu === "home" && <img src={underline} alt="" />}
        </li>

        <li>
          <AnchorLink className="anchor-link" offset={50} href="#about">
            <p onClick={() => setMenu("about")}>About Me</p>
          </AnchorLink>
          {menu === "about" && <img src={underline} alt="" />}
        </li>

        <li>
          <AnchorLink className="anchor-link" offset={50} href="#certificate">
            <p onClick={() => setMenu("certificate")}>Certificates</p>
          </AnchorLink>
          {menu === "certificate" && <img src={underline} alt="" />}
        </li>

        <li>
          <AnchorLink className="anchor-link" offset={50} href="#project">
            <p onClick={() => setMenu("project")}>Projects</p>
          </AnchorLink>
          {menu === "project" && <img src={underline} alt="" />}
        </li>

        <li>
          <AnchorLink className="anchor-link" offset={50} href="#contact">
            <p onClick={() => setMenu("contact")}>Contact</p>
          </AnchorLink>
          {menu === "contact" && <img src={underline} alt="" />}
        </li>
      </ul>

      <div className="nav-connect">
        <AnchorLink className="anchor-link" offset={50} href="#contact">
          Connect With Me
        </AnchorLink>
      </div>
    </div>
  );
};

export default Navbar;
