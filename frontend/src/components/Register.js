import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/Register.css";
import * as mestoAuth from "../utils/mestoAuth.js";

const Register = ({ setShowInfoTooltip, onRegisterSuccess }) => {
  const [regSuccess, setRegSuccess] = React.useState(false);

  const [formValue, setFormValue] = React.useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = React.useState("");

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
      .register(email, password)
      .then(() => {
        navigate("/sign-in", { replace: true });
        setShowInfoTooltip(true);
        setRegSuccess(true);
        onRegisterSuccess(true);
      })
      .catch((err) => {
        setShowInfoTooltip(true);
        onRegisterSuccess(false);
        setRegSuccess(false);
        setErrorMessage(err instanceof Error ? err.message : err);
      });
  };

  return (
    <div className="page">
      <div className="auth__container">
        <h2 className="auth__header">Регистрация</h2>
        <form className="auth__form" onSubmit={handleSubmit}>
          <input
            id="input-email"
            required
            autoComplete="off"
            className="auth__input"
            type="email"
            minLength="2"
            maxLength="40"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            value={formValue.email}
          />

          <input
            id="input-password"
            required
            autoComplete="off"
            className="auth__input"
            type="password"
            minLength="2"
            maxLength="200"
            placeholder="Пароль"
            name="password"
            onChange={handleChange}
            value={formValue.password}
          />

          <button className="auth__btn" type="submit">
            Зарегистрироваться
          </button>
        </form>
        <div className="auth__text">
          <p className="auth__paragraph">Уже зарегистрированы?</p>
          <Link to="/sign-in" className="auth__replace-link">
            Войти
          </Link>
        </div>
        <p className="auth__error">{errorMessage}</p>
      </div>
    </div>
  );
};

export default Register;
