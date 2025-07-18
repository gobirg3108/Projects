import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Project from "./components/Project";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Certificate from "./components/Certificate";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <About />
      <Certificate />
      <Project />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;
