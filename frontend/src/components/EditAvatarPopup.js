import PopupWithForm from "./PopupWithForm.js";
import React from "react";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatar = React.useRef();

  React.useEffect(() => {
    avatar.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar(avatar.current.value);

  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      buttonText={"Сохранить"}
      title={"Обновить аватар"}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_title_avatar"
        type="url"
        name="avatar"
        placeholder="Ссылка на картинку"
        required
        ref={avatar}
      />
      <span className="popup__input-error popup__input-error_title_avatar"></span>
    </PopupWithForm>
  );
}
