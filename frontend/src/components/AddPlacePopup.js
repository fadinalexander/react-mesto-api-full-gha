import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");
  const [isFormSubmitted, setIsFormSubmitted] = React.useState(false);

  React.useEffect(() => {
    if (isOpen && isFormSubmitted) {
      setIsFormSubmitted(false);
      setName("");
      setLink("");
    }
  }, [isOpen]);

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeLink(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({
      name,
      link,
    });
    setIsFormSubmitted(true);
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Новое место"
      name="add-card"
      buttonText="Создать"
    >
      <input
        required
        id="input-place"
        autoComplete="off"
        className="popup__form popup__form_type_place"
        type="text"
        minLength="2"
        maxLength="30"
        placeholder="Название"
        name="name"
        value={name}
        onChange={handleChangeName}
      />
      <span id="input-place-error" className="error"></span>
      <input
        required
        id="input-url"
        className="popup__form popup__form_type_place-link"
        type="url"
        placeholder="Ссылка на картинку"
        name="link"
        value={link}
        onChange={handleChangeLink}
      />
      <span id="input-url-error" className="error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
