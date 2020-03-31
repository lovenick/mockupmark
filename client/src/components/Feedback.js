import React from "react";

const Feedback = () => {
    return(
        <p className="text-center">
        Help us out by letting us know what you think of this prototype
        <br />
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSdmJy9iXNQBPWci3W1U8kZ-S3yBDZ2vPtSdu-NhI2c5rCCxXg/viewform?usp=sf_link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Fill in the survey
        </a>{" "}
        or email us at{" "}
        <a
          href="mailto:hello@mockupmark.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          hello@mockupmark.com
        </a>
      </p>
    )
}

export default Feedback