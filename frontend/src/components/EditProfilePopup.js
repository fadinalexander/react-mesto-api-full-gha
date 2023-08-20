import React from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Редактировать профиль"
      name="edit-user"
      buttonText="Сохранить"
    >
      <input
        id="input-name"
        required
        autoComplete="off"
        className="popup__form popup__form_type_name"
        type="text"
        minLength="2"
        maxLength="40"
        placeholder="Имя"
        name="name"
        // Warning в консоли:Это происходит из-за того, что данные в стейте еще не прогрузились
        // и в полях ввода значения undefined. Чтобы это исправить вы можете задать значения следующим образом:
        value={name || ""}
        onChange={handleChangeName}
      />
      <span id="input-name-error" className="error"></span>
      <input
        id="input-about"
        required
        autoComplete="off"
        className="popup__form popup__form_type_about"
        type="text"
        minLength="2"
        maxLength="200"
        placeholder="О себе"
        name="about"
        // Warning в консоли:Это происходит из-за того, что данные в стейте еще не прогрузились
        // и в полях ввода значения undefined. Чтобы это исправить вы можете задать значения следующим образом:
        value={description || ""}
        onChange={handleChangeDescription}
      />
      <span id="input-about-error" className="error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
