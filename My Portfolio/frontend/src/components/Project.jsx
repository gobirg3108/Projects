import React, { useState } from "react";
import "./Project.css";
import theme_pattern from "../assets/theme_pattern.svg";
import mywork_data from "../assets/mywork_data.js";
import arrow_icon from "../assets/arrow_icon.svg";
import { FaEye } from "react-icons/fa";

const Project = () => {
  const [visibleCount, setVisibleCount] = useState(3);
  const handleShowMore = () => setVisibleCount(mywork_data.length);

  return (
    <div id="project" className="project">
      <div className="project-title">
        <h1>My Projects</h1>
        <img src={theme_pattern} alt="decoration pattern" />
      </div>

      <div className="project-container">
        {mywork_data.slice(0, visibleCount).map((work, index) => (
          <div className="project-card" key={index}>
            <div
              className="project-img-wrapper"
              onClick={() => window.open(work.w_link, "_blank")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) =>
                e.key === "Enter" && window.open(work.w_link, "_blank")
              }
            >
              <img src={work.w_img} alt={work.w_name} />
              <div className="project-hover">
                <FaEye className="eye-icon" />
                <span>View</span>
              </div>
            </div>
            <h3>{work.w_name}</h3>
            <p>{work.w_desc}</p>
          </div>
        ))}
      </div>

      {visibleCount < mywork_data.length && (
        <div
          className="project-showmore"
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

export default Project;
