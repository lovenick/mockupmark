import React, { useState } from "react";
import Loader from "react-loader";
import { LazyLoadImage } from "react-lazy-load-image-component";

import PopUp from "./PopUp";
import "./MockupImage.scss";

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
    <div className="mockup-image">
      <LazyLoadImage
        alt=""
        src={mockup}
        afterLoad={() => setLoading(false)}
        threshold={500}
        scrollPosition={scrollPosition}
      />
      {loading ? <MockupLoader /> : ""}
      {mockup && !loading ? <PopUp mockup={mockup} template={template} /> : ""}
    </div>
  );
};

export default MockupImage;
