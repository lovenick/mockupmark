import React, { useState } from "react";
import Loader from "react-loader";
import { LazyLoadImage } from "react-lazy-load-image-component";

import "./MockupImage.scss";

const MockupLoader = ({ text = "Generating preview..." }) => {
  return (
    <div className="loading">
      <Loader color="white" />
      <div className="text">{text}</div>
    </div>
  );
};

const MockupImage = ({ template, mockup, scrollPosition, onDownload }) => {
  const [loading, setLoading] = useState(true);
  return (
    <div className="mockup-image">
      <LazyLoadImage
        alt=""
        src={mockup}
        afterLoad={() => setLoading(false)}
        threshold={500}
        scrollPosition={scrollPosition}
      />
      {loading ? <MockupLoader /> : ""}

      {mockup && !loading ? (
        <>
          <div className="image-protect"></div>
          <a
            className="button btn btn-primary"
            href={mockup}
            download
            onClick={() => onDownload(template)}
          >
            Download
          </a>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default MockupImage;
