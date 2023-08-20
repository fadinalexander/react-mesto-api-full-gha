import React from "react";

function PopupWithForm({
  isOpen,
  onClose,
  title,
  name,
  children,
  buttonText,
  onSubmit,
}) {
  const popupClassName = `popup popup_type_${name} ${
    isOpen ? "popup_opened" : ""
  }`;

  React.useEffect(() => {
    const handleEscKey = (evt) => {
      if (evt.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
    }
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = (evt) => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={popupClassName} onClick={handleOverlayClick}>
      <div className="popup__container">
        <h2 className="popup__header">{title}</h2>
        <button className="popup__btn-close" type="button" onClick={onClose} />
        <form
          //   noValidate
          className={`form form_${name}`}
          action=""
          method=""
          name={`form_${name}`}
          onSubmit={onSubmit}
        >
          {children}
          <button className="popup__btn-save" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
