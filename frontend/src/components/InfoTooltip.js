import React from "react";
import check from "../images/union.jpg";
import cross from "../images/cross.jpg";

export default function InfoTooltip({ isOpen, onClose, status }) {
  return (
    <div className={`tooltip ${isOpen && "tooltip_opened"}`}>
      <div className="tooltip__container">
        <button
          className="tooltip__close-btn"
          type="button"
          onClick={onClose}
        ></button>
        {status ? (
          <>
            <img className="tooltip__img" src={check} alt="check mark" />
            <h2 className="tooltip__title">Вы успешно зарегистрировались!</h2>
          </>
        ) : (
          <>
            <img className="tooltip__img" src={cross} alt="check mark" />
            <h2 className="tooltip__title">Что-то пошло не так! Попробуйте ещё раз.</h2>
          </>
        )}
      </div>
    </div>
  );
}
