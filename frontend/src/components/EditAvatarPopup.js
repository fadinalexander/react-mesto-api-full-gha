import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef(null);
  const [avatar, setAvatar] = React.useState("");
  const [isFormSubmitted, setIsFormSubmitted] = React.useState(false);

  React.useEffect(() => {
    if (isOpen && isFormSubmitted) {
      setAvatar("");
      setIsFormSubmitted(false);
    }
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
    setIsFormSubmitted(true);
  }

  function handleChange(evt) {
    setAvatar(evt.target.value);
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Обновить аватар"
      name="change-avatar"
      buttonText="Сохранить"
    >
      <input
        ref={avatarRef}
        required
        id="avatar-link"
        autoComplete="on"
        className="popup__form"
        type="url"
        placeholder="Ссылка на картинку"
        name="avatar"
        value={avatar || ""}
        onChange={handleChange}
      />
      <span id="avatar-link-error" className="error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
