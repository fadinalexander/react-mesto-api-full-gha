import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './styles/Header.css';

function Header({ email, handleLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  function exit() {
    navigate('/sign-in');
    handleLogout();
  }

  return (
    <header className='header'>
      <div className='logo header__logo'>
        <ul className='header__navigation'>
          {location.pathname === '/sign-in' && (
            <li>
              <Link to='/sign-up' className='header__link'>
                Регистрация
              </Link>
            </li>
          )}
          {location.pathname === '/sign-up' && (
            <li>
              <Link to='/sign-in' className='header__link'>
                Войти
              </Link>
            </li>
          )}
          {location.pathname === '/mesto' && email && (
            <>
              <p className='header__user-id'>{email}</p>
              <li>
                <button onClick={exit} className='header__btn-exit'>
                  Выйти
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Header;
