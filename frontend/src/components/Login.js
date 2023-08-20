import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Login.css';
import * as mestoAuth from '../utils/mestoAuth.js';

const Login = ({ handleLogin }) => {
  const [formValue, setFormValue] = React.useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const { email, password } = formValue;
    mestoAuth
      .authorization(email, password)
      .then((data) => {
        // console.log(data)
        handleLogin(data);
        navigate('/mesto');
      })
      .catch((err) => {
        setErrorMessage(err);
      });
  };

  return (
    <div className='page'>
      <div className='auth__container'>
        <h2 className='auth__header'>Вход</h2>
        <form className='auth__form' onSubmit={handleSubmit}>
          <input
            id='input-email'
            required
            autoComplete='off'
            className='auth__input'
            type='email'
            minLength='2'
            maxLength='40'
            placeholder='Email'
            name='email'
            onChange={handleChange}
            value={formValue.email}
          />

          <input
            id='input-password'
            required
            autoComplete='off'
            className='auth__input'
            type='password'
            minLength='2'
            maxLength='200'
            placeholder='Пароль'
            name='password'
            onChange={handleChange}
            value={formValue.password}
          />

          <button className='auth__btn' type='submit'>
            Войти
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
