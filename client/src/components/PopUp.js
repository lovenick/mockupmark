import React from "react";
import Modal from "react-bootstrap/Modal";

import ReactGA from "react-ga";
import Feedback from "./Feedback";

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
          <Feedback />
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
