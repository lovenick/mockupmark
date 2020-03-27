import React from "react";

import "./Footer.scss";

const Footer = () => {
  return (
    <div style={{ marginTop: "1em" }}>
      <p className="text-center">
        Help us out by letting us know what you think of this prototype
        <br />
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSdmJy9iXNQBPWci3W1U8kZ-S3yBDZ2vPtSdu-NhI2c5rCCxXg/viewform?usp=sf_link"
          target="_blank"
        >
          Link to survey
        </a>{" "}
        or email us at{" "}
        <a href="mailto:hello@mockupmark.com" target="_blank">
          hello@mockupmark.com
        </a>
      </p>
      <footer>
        <div className="container">
          <p>&copy; 2020 Mockup Mark</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
