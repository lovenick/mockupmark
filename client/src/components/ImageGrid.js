import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

import Loader from "react-loader";
import {
  LazyLoadImage,
  trackWindowScroll
} from "react-lazy-load-image-component";
import ReactGA from "react-ga";

import api from "../api";

import "./ImageGrid.scss";

const trackUploadEvent = () => {
  ReactGA.event({
    category: "Mockup",
    action: "Upload"
  });
};

const trackDownloadEvent = template => {
  ReactGA.event({
    category: "Mockup",
    action: "Download",
    label: template
  });
};

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
          className="button"
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
    trackUploadEvent();
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
          id="upload-button"
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
                          template={template}
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
