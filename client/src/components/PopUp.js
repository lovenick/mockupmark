import React from "react";
import Modal from "react-bootstrap/Modal";

import ReactGA from "react-ga";
import FacebookPixel from "react-facebook-pixel";

import Feedback from "./Feedback";

import "./PopUp.scss";

const trackDownloadEvent = template => {
  ReactGA.event({
    category: "Mockup",
    action: "Download",
    label: template
  });
  FacebookPixel.trackCustom("Download", { template });
};

const PopUp = props => {
  const [isOpen, setIsOpen] = React.useState(false);

  const showModal = () => {
    setIsOpen(true);
  };
  const hideModal = () => {
    setIsOpen(false);
  };
  return (
    <>
      <a
        className="button btn btn-primary"
        href={props.mockup}
        download
        onClick={() => {
          trackDownloadEvent(props.template);
          showModal();
        }}
      >
        Download
      </a>
      <Modal
        show={isOpen}
        onHide={hideModal}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title>Thank you for using Mockup Mark</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-center">
            Help us out by letting us know what you think of this prototype
          </p>
        </Modal.Body>
        <Modal.Footer>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSdmJy9iXNQBPWci3W1U8kZ-S3yBDZ2vPtSdu-NhI2c5rCCxXg/viewform?usp=sf_link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="button btn btn-primary" onClick={hideModal}>
              Close & Fill in the survey
            </button>
          </a>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PopUp;
