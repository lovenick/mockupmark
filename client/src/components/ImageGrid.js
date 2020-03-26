import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

import Loader from "react-loader";
import {
  LazyLoadImage,
  trackWindowScroll
} from "react-lazy-load-image-component";

import api from "../api";

import "./ImageGrid.scss";

const MockupImage = ({ mockup, scrollPosition }) => {
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
      {loading ? <Loader /> : ""}
      {mockup && !loading ? (
        <a className="button" href={mockup} download>
          Download
        </a>
      ) : (
        ""
      )}
    </>
  );
};

const ImageGrid = ({ scrollPosition }) => {
  const [templates, setTemplates] = useState([]);
  useEffect(() => {
    api.get("templates").then(response => {
      setTemplates(
        response.data.templates.map(template => `/api/templates/${template}`)
      );
    });
  }, []);

  const [mockups, setMockups] = useState([]);
  const onDrop = useCallback(acceptedFiles => {
    const [artwork] = acceptedFiles;
    const formData = new FormData();
    formData.append("artwork", artwork);
    api
      .post("mockups", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      })
      .then(response => {
        setMockups(response.data.images);
      });
  }, []);
  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
    noClick: true
  });

  return (
    <Loader loaded={templates.length > 0}>
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <button
          type="button"
          className="btn btn-primary btn-block btn-lg"
          onClick={open}
        >
          Upload your design
        </button>
        <div className="masonry-wrapper">
          <div className="masonry">
            {templates.map((template, index) => {
              const mockup = mockups[index];
              return (
                <div key={template} className="masonry-item">
                  <div className="masonry-content">
                    <div className="masonry-image">
                      <img src={template} alt="" />
                      {mockup ? (
                        <MockupImage
                          key={mockup}
                          mockup={mockup}
                          scrollPosition={scrollPosition}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Loader>
  );
};

export default trackWindowScroll(ImageGrid);
