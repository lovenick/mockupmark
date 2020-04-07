import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

import Loader from "react-loader";
import { trackWindowScroll } from "react-lazy-load-image-component";
import ReactGA from "react-ga";
import FacebookPixel from "react-facebook-pixel";

import api from "../api";

import Examples from "./Examples";
import MockupImage from "./MockupImage";
import PopUp from "./PopUp";
import "./ImageGrid.scss";

const trackUploadEvent = () => {
  ReactGA.event({
    category: "Mockup",
    action: "Upload",
  });
  FacebookPixel.trackCustom("Upload");
};

const trackDownloadEvent = (template) => {
  ReactGA.event({
    category: "Mockup",
    action: "Download",
    label: template,
  });
  FacebookPixel.trackCustom("Download", { template });
};

const ImageGrid = ({ scrollPosition }) => {
  const [templates, setTemplates] = useState({});
  useEffect(() => {
    api.get("templates").then((response) => {
      setTemplates(response.data.templates);
    });
  }, []);

  const [mockups, setMockups] = useState({});
  const [uploading, setUploading] = useState(false);
  const onDrop = useCallback((acceptedFiles) => {
    setUploading(true);
    const [artwork] = acceptedFiles;
    const formData = new FormData();
    formData.append("artwork", artwork);
    api
      .post("mockups", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        setMockups(response.data.images);
        setUploading(false);
      });
    trackUploadEvent();
  }, []);
  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
    noClick: true,
  });

  const [popupIsOpen, setPopupIsOpen] = useState(false);
  const [visitedSurvey, setVisitedSurvey] = useState(false);

  const onDownload = (template) => {
    trackDownloadEvent(template);
    if (!visitedSurvey) {
      setPopupIsOpen(true);
    }
  };

  const onPopupClose = () => {
    setPopupIsOpen(false);
  };

  const onPopupAction = () => {
    setVisitedSurvey(true);
    setPopupIsOpen(false);
  };

  const templatesLoaded = Object.keys(templates).length > 0;
  return (
    <>
      <Loader loaded={templatesLoaded}>
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
          <Examples onSelect={setMockups} />
          <div className="masonry-wrapper">
            <div className="masonry">
              {Object.entries(templates).map(([templateId, template]) => {
                const mockup = mockups[templateId];
                return (
                  <div key={templateId} className="masonry-item">
                    <div className="masonry-content">
                      <div className="masonry-image">
                        <img src={template.path} alt="" />
                        {mockup ? (
                          <MockupImage
                            key={mockup}
                            mockup={mockup}
                            scrollPosition={scrollPosition}
                            onDownload={() => onDownload(template.path)}
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
      <PopUp
        isOpen={popupIsOpen}
        onClose={onPopupClose}
        onAction={onPopupAction}
      />
    </>
  );
};

export default trackWindowScroll(ImageGrid);
