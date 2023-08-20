import React from "react";
import "./styles/InfoToolTip.css";

const InfoToolTip = ({ onClose, regSuccess }) => {
  const handleButtonClick = () => {
    onClose();
  };

  const imageChange = regSuccess
    ? "toolTip-popup__img-success"
    : "toolTip-popup__img-error";

  return (
    <div className="toolTip-popup">
      <div className="toolTip-popup__container">
        <div className={imageChange} />
        <h2 className="toolTip-popup__header">
          {regSuccess
            ? "Вы успешно зарегистрировались"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </h2>
        <button
          className="toolTip-popup__btn-close"
          onClick={handleButtonClick}
        ></button>
      </div>
    </div>
  );
};

export default InfoToolTip;
