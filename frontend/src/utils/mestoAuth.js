// export const BASE_URL = "https://api.fadinproject.nomoreparties.co";
export const BASE_URL = 'http://localhost:3000';

function request(url, options) {
  return fetch(url, options).then(checkResult);
}

function checkResult(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}


export const register = (email, password) => {
  return request(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  })
};

export const authorization = (email, password) => {
  return request(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  })
};

export const getContent = () => {
  return request(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
 
    },
    credentials: 'include',
  })
};
