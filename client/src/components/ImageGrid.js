import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

import Loader from "react-loader";
import { LazyLoadImage } from "react-lazy-load-image-component";

import api from "../api";

import "./ImageGrid.scss";

const Image = ({ template, mockup }) => {
  const [loading, setLoading] = useState(!!mockup);
  return (
    <div className="masonry-item">
      <div className="masonry-content">
        <div className="masonry-image">
          <img src={template} alt="" />
          {mockup ? (
            <LazyLoadImage
              alt=""
              src={mockup}
              beforeLoad={() => setLoading(true)}
              afterLoad={() => setLoading(false)}
              threshold={500}
            />
          ) : (
            ""
          )}
          {loading ? <Loader /> : ""}
        </div>

        {mockup && !loading ? (
          <a className="button" href={mockup} download>
            Download
          </a>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

const ImageGrid = () => {
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
                <Image
                  key={mockup || template}
                  template={template}
                  mockup={mockup}
                />
              );
            })}
          </div>
        </div>
      </div>
    </Loader>
  );
};

export default ImageGrid;
