class Auth {
  constructor(bazeUrl) {
    this.url = bazeUrl;
  }

  _checkResolve(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  register({ email, password }) {
    //регистрация
    return fetch(`${this.url}/signup`, {
      // вернули запрос
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((res) => {
      //проверили ответ
      return this._checkResolve(res);
    });
  }

  login({ email, password }) { //авторизация
    return fetch(`${this.url}/signin`, { // вернули запрос
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    })
      .then((res) => { //проверили ответ
        return this._checkResolve(res);
      })
  }

  logout () {
		return fetch(`${this.url}/logout`, {
			method: 'GET',
			credentials: 'include',
		})
    .then((res) => {
			return this._checkResolve(res);
		});
	}

  checkToken () {
    return fetch(`${this.url}/users/me`, { // вернули запрос
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
    })
      .then((res) => { //проверили ответ
        return this._checkResolve(res);
      })
  }
}
export const auth = new Auth('https://api.jul.iv.mesto.nomoreparties.sbs');
