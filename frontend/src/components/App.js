import React from 'react';
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from 'react-router-dom';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import InfoToolTip from './InfoToolTip';
import * as mestoAuth from '../utils/mestoAuth';
function App() {
  const [showInfoTooltip, setShowinfoTooltip] = React.useState(false);
  const [regSuccess, setRegSuccess] = React.useState(false);
  const handleRegisterSuccess = (success) => {
    setRegSuccess(success);
  };

  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const [email, setIsEmail] = React.useState(null);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);

  const handleLogin = (data) => {
    console.log(data);
    setCurrentUser(data);
    setIsEmail(data.email);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setCurrentUser({});
  };

  const checkToken = () => {
    mestoAuth
      .getContent()
      .then((data) => {
        if (!data) {
          return;
        }

        setIsLoggedIn(true);
        navigate(location.pathname);
        setCurrentUser(data);
        setIsEmail(data.email);
      })
      .catch((err) => {
        setIsLoggedIn(false);
        console.log(err);
      });
  };
  React.useEffect(() => {
    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [currentUser, setCurrentUser] = React.useState({});
  React.useEffect(() => {
    if (isLoggedIn) {
      api
        .getProfile()
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [isLoggedIn]);

  const [cards, setCards] = React.useState([]);
  React.useEffect(() => {
    if (isLoggedIn) {
      api
        .getInitialCards()
        .then((cardsData) => {
          setCards(cardsData);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [isLoggedIn]);

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsImagePopupOpen(false);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .likeCard(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleUpdateUser({ name, about }) {
    api
      .patchProfile({ name, about })
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .setUserAvatar({ avatar })
      .then((avatarData) => {
        setCurrentUser(avatarData);
        closeAllPopups();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleAddPlaceSubmit(newCard) {
    api
      .postInitialCards(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header email={email} handleLogout={handleLogout} />
        <Routes>
          <Route
            path='/sign-up'
            element={
              <Register
                setShowInfoTooltip={setShowinfoTooltip}
                onRegisterSuccess={handleRegisterSuccess}
              />
            }
          />
          <Route
            path='/sign-in'
            element={<Login handleLogin={handleLogin} />}
          />
          <Route
            path='/'
            element={
              isLoggedIn ? (
                <Navigate to='/mesto' replace />
              ) : (
                <Navigate to='/sign-in' replace />
              )
            }
          />
          <Route
            path='/mesto'
            element={
              <ProtectedRoute
                element={Main}
                isLoggedIn={isLoggedIn}
                onEditAvatar={handleEditAvatarClick}
                onAddPlace={handleAddPlaceClick}
                onEditProfile={handleEditProfileClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
            }
          />
        </Routes>
        <Footer />
      </div>

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />

      <PopupWithForm
        title='Вы уверены?'
        name='confirm-remove'
        buttonText='Да'
      ></PopupWithForm>

      {isImagePopupOpen && (
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          isOpened={true}
        />
      )}

      {showInfoTooltip && (
        <InfoToolTip
          onClose={() => setShowinfoTooltip(false)}
          regSuccess={regSuccess}
        />
      )}
    </CurrentUserContext.Provider>
  );
}

export default App;
