import React, { useEffect, useState } from "react";

import api from "../api";
import "./Examples.scss";

const Examples = ({ onSelect, activeExample }) => {
  const [examples, setExamples] = useState({});

  useEffect(() => {
    api.get("examples").then((response) => {
      setExamples(response.data.examples);
    });
  }, []);

  const examplesLoaded = Object.keys(examples).length > 0;

  if (!examplesLoaded) {
    return null;
  }

  return (
    <div className="example-container">
      <h5 className="text-center text-muted">Or choose an example design</h5>
      <div className="example-images">
        {Object.entries(examples).map(([exampleId, example]) => (
          <div key={exampleId} className="image-container">
            <img
              src={example.path}
              alt=""
              onClick={() => {
                onSelect(example.mockups);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Examples;
