import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

import Loader from "react-loader";
import { trackWindowScroll } from "react-lazy-load-image-component";
import ReactGA from "react-ga";
import FacebookPixel from "react-facebook-pixel";

import api from "../api";
import MockupImage from "./MockupImage";
import "./ImageGrid.scss";

const trackUploadEvent = () => {
  ReactGA.event({
    category: "Mockup",
    action: "Upload"
  });
  FacebookPixel.trackCustom("Upload");
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
  const [uploading, setUploading] = useState(false);
  const onDrop = useCallback(acceptedFiles => {
    setUploading(true);
    const [artwork] = acceptedFiles;
    const formData = new FormData();
    formData.append("artwork", artwork);
    api
      .post("mockups", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      })
      .then(response => {
        setMockups(response.data.images);
        setUploading(false);
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
          onClick={open}
          disabled={uploading}
        >
          {uploading ? (
            <>
              <span
                className="spinner-grow spinner-grow-sm"
                role="status"
                aria-hidden="true"
              ></span>{" "}
              Uploading...
            </>
          ) : (
            "Upload your design"
          )}
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
