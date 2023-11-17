import LoginForm from "./LoginForm";
import React from "react";

export default function Login({onSubmit}) {
  const [formValue, setFormValue] = React.useState({
    email: "",
    password: "",
  });

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
    if (!formValue.email || !formValue.password) {
      return;
    }
    onSubmit(email, password);
    setFormValue({email: '', password: ''});
  };

  return (
    <LoginForm title={"Вход"} buttonText={"Войти"} onSubmit={handleSubmit}>
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
        type="password"
        name="password"
        placeholder="Пароль"
        required
        value={formValue.password}
        onChange={handleChange}
      />
    </LoginForm>
  );
}
