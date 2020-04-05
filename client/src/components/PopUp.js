import React from "react";
import Modal from "react-bootstrap/Modal";

import "./PopUp.scss";

const PopUp = ({ isOpen, onClose }) => {
  return (
    <Modal
      show={isOpen}
      onHide={onClose}
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
          <button className="button btn btn-primary" onClick={onClose}>
            Close &amp; Fill in the survey
          </button>
        </a>
      </Modal.Footer>
    </Modal>
  );
};

export default PopUp;
