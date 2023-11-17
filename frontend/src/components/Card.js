import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = `photo-grid__like ${
    isLiked && "photo-grid__like_active"
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }
  return (
    <>
      <div className="photo-grid__element" key={card._id}>
        {isOwn && (
          <button
            className="photo-grid__bin"
            type="button"
            onClick={handleDeleteClick}
          />
        )}
        <img
          className="photo-grid__photo"
          src={card.link}
          alt={card.name}
          onClick={handleClick}
        />
        <div className="photo-grid__container">
          <h2 className="photo-grid__name">{card.name}</h2>
          <div className="photo-grid__like-container">
            <button
              className={cardLikeButtonClassName}
              type="button"
              onClick={handleLikeClick}
            ></button>
            <p className="photo-grid__like-amount">{card.likes.length}</p>
          </div>
        </div>
      </div>
    </>
  );
}
