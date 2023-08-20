import React from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div
          className="profile__avatar-overlay"
          onClick={onEditAvatar}
          style={{
            backgroundImage: `url(${currentUser.avatar})`,
            backgroundSize: "cover",
          }}
        >
          <img
            className="profile__avatar"
            src="#"
            alt="Фото пользователя"
            style={{ zIndex: "-1" }}
          />
        </div>
        <div className="profile__block">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            className="profile__edit-button"
            name="edit-button"
            type="button"
            onClick={onEditProfile}
          ></button>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          name="add-button"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="elements">
        <ul className="elements__grid">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
