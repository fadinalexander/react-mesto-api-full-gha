import React from "react";

function ImagePopup({ card, onClose, isOpened }) {
  React.useEffect(() => {
    const handleEscKey = (evt) => {
      if (evt.key === "Escape") {
        onClose();
      }
    };
    if (isOpened) {
      document.addEventListener("keydown", handleEscKey);
    }
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpened, onClose]);

  const handleOverlayClick = (evt) => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`popup popup_type_zoom-image ${
        isOpened ? "popup_opened" : ""
      }`}
      onClick={handleOverlayClick}
    >
      <div className="popup__image-container">
        <button
          className="popup__btn-close"
          type="button"
          onClick={onClose}
        ></button>
        <img
          className="popup__zoomCont-image"
          src={card.link}
          alt={card.name}
        />
        <h2 className="popup__zoomCont-header">{card.name}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;
