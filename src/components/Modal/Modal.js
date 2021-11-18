import { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

const modalRoot = document.getElementById("root-modal");

export default function Modal({ imgSrc, onCloseModal }) {
  useEffect(() => {
    const overlay = document.querySelector(".Overlay");

    window.addEventListener("keydown", handleKeydown);

    overlay.addEventListener("click", handleClickOverlay);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
      overlay.removeEventListener("click", handleClickOverlay);
    };
  });

  const handleClickOverlay = (e) => {
    if (e.target.className === "Overlay") {
      onCloseModal((hidden) => !hidden);
    }
  };

  const handleKeydown = (e) => {
    if (e.code === "Escape") {
      onCloseModal((hidden) => !hidden);
    }
  };

  return createPortal(
    <div className="Overlay">
      <div className="Modal">
        <img src={imgSrc} alt="" />
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  imgSrc: PropTypes.string.isRequired,
};
