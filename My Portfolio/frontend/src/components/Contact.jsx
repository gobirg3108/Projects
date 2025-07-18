import React, { useState } from "react";
import "./Contact.css";
import theme_pattern from "../assets/theme_pattern.svg";
import mail_icon from "../assets/mail_icon.svg";
import location_icon from "../assets/location_icon.svg";
import call_icon from "../assets/call_icon.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const form = event.target;
    const formData = new FormData(form);
    formData.append("access_key", "e160a1dc-8ffa-4c62-b9fd-6c1351587d7d");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      const res = await response.json();

      if (res.success) {
        toast.success("Message sent successfully! 🎉", {
          position: "top-right",
          autoClose: 3000,
        });
        form.reset();
      } else {
        toast.error("Something went wrong. Please try again!", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error("Network error. Try again later.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact" className="contact">
      <ToastContainer />
      <div className="contact-title">
        <h1>Get in touch</h1>
        <img src={theme_pattern} alt="decoration pattern" />
      </div>
      <div className="contact-section">
        <div className="contact-left">
          <h1>Let's talk</h1>
          <p>I am currently seeking a job</p>
          <div className="contact-details">
            <div className="contact-detail">
              <img src={mail_icon} alt="Email icon" />
              <a href="mailto:gobigobi3108@gmail.com">gobigobi3108@gmail.com</a>
            </div>
            <div className="contact-detail">
              <img src={call_icon} alt="Phone icon" />
              <a href="tel:+919360761260">+91 9360761260</a>
            </div>
            <div className="contact-detail">
              <img src={location_icon} alt="Location icon" />
              <p>Tamilnadu, India</p>
            </div>
          </div>
        </div>

        <form onSubmit={onSubmit} className="contact-right">
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            required
          />

          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
          />

          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            name="message"
            rows="8"
            placeholder="Enter Your Message"
            required
          ></textarea>

          <button
            type="submit"
            className="contact-submit"
            disabled={isSubmitting}
            aria-label="Submit contact form"
          >
            {isSubmitting ? "Sending..." : "Submit now"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
