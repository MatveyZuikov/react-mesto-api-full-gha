import logo from "../images/logo.svg";
import React from "react";
import { Link } from "react-router-dom";

function Header({path, name, onClick, email}) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="лого" />
      <div className="header__container">
        <p className="header__email">{email}</p>
        <Link className="header__btn" to={path} onClick={onClick}>{name}</Link>
      </div>
    </header>
  );
}

export default Header;
