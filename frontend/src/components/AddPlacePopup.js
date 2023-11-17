import PopupWithForm from "./PopupWithForm.js";
import React from "react";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: name,
      link: link,
    });


  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      buttonText={"Создать"}
      title={"Новое место"}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_title_place"
        type="text"
        name="place"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        value={name}
        onChange={handleNameChange}
      />
      <span className="popup__input-error popup__input-error_title_place"></span>
      <input
        className="popup__input popup__input_title_link"
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        required
        value={link}
        onChange={handleLinkChange}
      />
      <span className="popup__input-error popup__input-error_title_link"></span>
    </PopupWithForm>
  );
}
