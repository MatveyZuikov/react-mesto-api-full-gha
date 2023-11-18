class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _getResponseData = (response) => {
    return response.ok
      ? response.json()
      : Promise.reject(`Ошибка: ${response.status}`);
  };

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
      credentials: "include",
    }).then(this._getResponseData);
  }

  addNewCard({ name, link }) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._getResponseData);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
      credentials: "include",
    }).then(this._getResponseData);
  }

  changeUserInfo({ name, about }) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._getResponseData);
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
      credentials: "include",
    }).then(this._getResponseData);
  }

  likeCard(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
      credentials: "include",
    }).then(this._getResponseData);
  }

  dislikeCard(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
      credentials: "include",
    }).then(this._getResponseData);
  }

  changeUserAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        avatar,
      }),
    }).then(this._getResponseData);
  }
}

const api = new Api({
  url: "https://api.mesto.n1ght.nomoredomainsmonster.ru",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default api;
