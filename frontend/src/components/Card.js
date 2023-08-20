import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser._id;

  const isLiked = card.likes.some((i) => i === currentUser._id);

  const cardLikeButtonClassName = `element__like-button ${
    isLiked && 'element__like-button_active'
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
    <li className='element'>
      {isOwn && (
        <button
          className='element__delete-button'
          name='delete-button'
          type='button'
          onClick={handleDeleteClick}
        />
      )}
      <img
        className='element__img'
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className='element__place-like'>
        <h2 className='element__description'>{card.name}</h2>
        <div className='element__place-like-count'>
          <button
            className={cardLikeButtonClassName}
            name='like-button'
            type='button'
            onClick={handleLikeClick}
          />
          <p className='element__like-counter'>{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
