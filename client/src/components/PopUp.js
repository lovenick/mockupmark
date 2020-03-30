import React from "react";
import Modal from "react-bootstrap/Modal";

import ReactGA from "react-ga";

import "./PopUp.scss";

const trackDownloadEvent = template => {
  ReactGA.event({
    category: "Mockup",
    action: "Download",
    label: template
  });
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
            <br />
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdmJy9iXNQBPWci3W1U8kZ-S3yBDZ2vPtSdu-NhI2c5rCCxXg/viewform?usp=sf_link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Link to survey
            </a>{" "}
            or email us at{" "}
            <a
              href="mailto:hello@mockupmark.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              hello@mockupmark.com
            </a>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <button className="button btn btn-primary" onClick={hideModal}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PopUp;
