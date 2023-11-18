class Auth {
  constructor({ url }) {
    this._url = url;
  }

  _getResponseData = (response) => {
    return response.ok
      ? response.json()
      : Promise.reject(`Ошибка: ${response.status}`);
  };

  register = (email, password) => {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    }).then(this._getResponseData);
  };

  login = (email, password) => {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    })
      .then(this._getResponseData)
      .then((data) => {
        sessionStorage.setItem("userId", data._id);
      });
  };

  getUserInfo = () => {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then(this._getResponseData);
  };
}

const auth = new Auth({
  // url: "http://api.mesto.n1ght.nomoredomainsmonster.ru",
  url: "http://localhost:3005",
});

export default auth;
