import React, { useState } from "react";
import Loader from "react-loader";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ReactGA from "react-ga";

const MockupLoader = ({ text = "Generating preview..." }) => {
  return (
    <div className="loading">
      <Loader color="white" />
      <div className="text">{text}</div>
    </div>
  );
};

const MockupImage = ({ template, mockup, scrollPosition }) => {
  const [loading, setLoading] = useState(true);
  return (
    <>
      <LazyLoadImage
        alt=""
        src={mockup}
        afterLoad={() => setLoading(false)}
        threshold={500}
        scrollPosition={scrollPosition}
      />
      {loading ? <MockupLoader /> : ""}
      {mockup && !loading ? (
        <a
          className="button btn btn-primary"
          href={mockup}
          download
          onClick={() => trackDownloadEvent(template)}
        >
          Download
        </a>
      ) : (
        ""
      )}
    </>
  );
};

const trackDownloadEvent = template => {
  ReactGA.event({
    category: "Mockup",
    action: "Download",
    label: template
  });
};

export default MockupImage;
