import React, { useState } from "react";
import "./Certificate.css";
import theme_pattern from "../assets/theme_pattern.svg";
import certificate_data from "../assets/certificate_data.js";
import arrow_icon from "../assets/arrow_icon.svg";

const Certificate = () => {
  const [visibleCount, setVisibleCount] = useState(3);
  const [selectedCert, setSelectedCert] = useState(null);

  const handleShowMore = () => setVisibleCount(certificate_data.length);
  const openModal = (cert) => setSelectedCert(cert);
  const closeModal = () => setSelectedCert(null);

  return (
    <div id="certificate" className="certificate">
      <div className="certificate-title">
        <h1>My Certificates</h1>
        <img src={theme_pattern} alt="decoration pattern" />
      </div>

      <p className="course-completion-text">
        I have successfully completed the{" "}
        <strong>Full Stack Development (MERN)</strong> course at{" "}
        <strong>GUVI Geek Networks</strong>, gaining comprehensive knowledge in
        modern web development technologies.
      </p>

      <div className="certificate-container">
        {certificate_data.slice(0, visibleCount).map((cert, index) => (
          <div className="certificate-card" key={index}>
            <div
              className="certificate-img-wrapper"
              onClick={() => openModal(cert)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && openModal(cert)}
            >
              <img src={cert.c_img} alt={cert.c_name} />
              <div className="certificate-hover">
                <span>View Certificate</span>
              </div>
            </div>
            <h3>{cert.c_name}</h3>
          </div>
        ))}
      </div>

      {selectedCert && (
        <div className="certificate-modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedCert.c_img} alt={selectedCert.c_name} />
            <h3>{selectedCert.c_name}</h3>
            <button
              className="modal-close"
              onClick={closeModal}
              aria-label="Close certificate modal"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {visibleCount < certificate_data.length && (
        <div
          className="certificate-showmore"
          onClick={handleShowMore}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && handleShowMore()}
        >
          <p>Show More</p>
          <img src={arrow_icon} alt="" className="arrow-icon" />
        </div>
      )}
    </div>
  );
};

export default Certificate;
