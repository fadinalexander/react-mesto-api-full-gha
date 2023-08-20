class Api {
  constructor({ url, headers }) {
    this._baseUrl = url;
    this._headers = headers;
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResult);
  }

  _checkResult(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getProfile() {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    });
  }

  patchProfile(value) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(value),
      credentials: 'include',
    });
  }

  setUserAvatar({ avatar }) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
      credentials: 'include',
    });
  }

  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    });
  }

  postInitialCards(data) {
    return this._request(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
      credentials: 'include',
    });
  }

  deleteCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    });
  }

  likeCard(cardId, isLiked) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: this._headers,
      credentials: 'include',
    });
  }
}

const api = new Api({
  url: 'https://api.fadinproject.nomoreparties.co',
  // url: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
