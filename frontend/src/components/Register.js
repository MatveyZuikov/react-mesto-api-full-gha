import LoginForm from "./LoginForm";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register({ onSubmit }) {
  const [formValue, setFormValue] = React.useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formValue;
    onSubmit(email, password);
  };

  return (
    <>
      <LoginForm
        title={"Регистрация"}
        buttonText={"Зарегистрироваться"}
        onSubmit={handleSubmit}
      >
        <input
          className="login__input"
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formValue.email}
          onChange={handleChange}
        />
        <input
          className="login__input"
          type="text"
          name="password"
          placeholder="Пароль"
          required
          value={formValue.password}
          onChange={handleChange}
        />
      </LoginForm>
      <Link to="/sign-in" className="login__link">
        Уже зарегистрированы? Войти
      </Link>
    </>
  );
}
