import React from "react";
import Feedback from "./Feedback"
import "./Footer.scss";

const Footer = () => {
  return (
    <div style={{ marginTop: "1em" }}>
      <Feedback/>
      <footer>
        <div className="container">
          <p>&copy; 2020 Mockup Mark</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
