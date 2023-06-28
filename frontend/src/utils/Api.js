export class Api {
	constructor(url) {
		this._url = url;
	}

	_checkResolve(res) {
		if (res.ok) {
			return res.json();
		}
		return Promise.reject(`Ошибка: ${res.status}`);
	}

	getDataServer(configUrl) {
		//метод получения информации с сервера
		return fetch(`${this._url}${configUrl}`, {
			// вернули запрос
			method: 'GET'
		}).then(res => {
			//проверили ответ
			return this._checkResolve(res);
		});
	}

	editUserInfo(data) {
		// метод изменения информации о пользователе
		return fetch(`${this._url}/users/me`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: data.name,
				about: data.about
			})
		}).then(res => {
			//проверили ответ
			return this._checkResolve(res);
		});
	}

	addCard(data) {
		//метод добавленя карточки пользователем
		return fetch(`${this._url}cards`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: data.name,
				link: data.link
			})
		}).then(res => {
			//проверили ответ
			return this._checkResolve(res);
		});
	}

	deleteCard(cardId) {
		return fetch(`${this._url}cards/${cardId}`, {
			method: 'DELETE'
		}).then(res => {
			//проверили ответ
			return this._checkResolve(res);
		});
	}

	likeCard(cardId, isLiked) {
		if (isLiked) {
			//если пользователь лайкал карточку
			return fetch(`${this._url}cards/${cardId}/likes`, {
				// вернули запрос
				method: 'DELETE' //удалить лайк
			}).then(res => {
				//проверили ответ
				return this._checkResolve(res);
			});
		} else {
			//если пользователь не лайкал карточку
			return fetch(`${this._url}cards/${cardId}/likes`, {
				// вернули запрос
				method: 'PUT' //добавить лайк
			}).then(res => {
				//проверили ответ
				return this._checkResolve(res);
			});
		}
	}

	changeAvatar(data) {
		//изменение аватара пользователя
		return fetch(`${this._url}users/me/avatar`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				avatar: data.avatar
			})
		}).then(res => {
			//проверили ответ
			return this._checkResolve(res);
		});
	}
}

const api = new Api(
	'https://api.jul.iv.mesto.nomoreparties.sbs/'
);
export default api;
