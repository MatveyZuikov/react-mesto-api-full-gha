import api from "../utils/Api.js";
import React from "react";
import Avatar from "../images/avatar.jpg";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete}) {
  // const [cards, setCards] = React.useState([]);
  const currentUser = React.useContext(CurrentUserContext);

  // React.useEffect(() => {
  //   api
  //     .getInitialCards()
  //     .then((data) => {
  //       setCards(data);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }, []);



  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container">
          <div className="profile__avatar-container">
            <img
              className="profile__avatar"
              style={{ backgroundImage: `url(${currentUser.avatar})` }}
              // src="/"
              // alt="аватар профиля"
            />
            <button
              className="profile__avatar-btn"
              onClick={onEditAvatar}
            ></button>
          </div>
          <div className="profile__info">
            <div className="profile__first-line">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                className="profile__edit-button"
                type="button"
                onClick={onEditProfile}
              ></button>
            </div>
            <p className="profile__job">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="photo-grid">
        {cards.map((card) => (
          <Card card={card} key={card._id} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete}/>
          
        ))}
      </section>
    </main>
  );
}

export default Main;
