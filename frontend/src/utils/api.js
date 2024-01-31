class Api {
    constructor(options) {
        this._url = options.baseUrl;
    }

    _checkRes(res) {
        return res.ok
            ? res.json()
            : Promise.reject
    }

    _request(url, options) {
        return fetch(url, options).then(this._checkRes)
    }

    getInfo(token) {
        return this._request(`${this._url}/users/me`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    getCards(token) {
        return this._request(`${this._url}/cards`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    setInfoProfile(data, token) {
        return this._request(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                name: data.title,
                about: data.subtitle,
            })
        })
    }

    setInfoAvatar(data, token) {
        return this._request(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                avatar: data.editAvatar,
            })
        })
    }

    addNewCard(data, token) {
        return this._request(`${this._url}/cards`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                name: data.placeName,
                link: data.placeSrc,
            })
        })
    }

    addLike(cardID, token) {
        return this._request(`${this._url}/cards/${cardID}/likes`, {
            method: 'PUT',
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        })
    }

    deleteLike(cardID, token) {
        return this._request(`${this._url}/cards/${cardID}/likes`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        })
    }

    deleteCardID(cardID, token) {
        return this._request(`${this._url}/cards/${cardID}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
    }
}

const api = new Api({
    baseUrl: 'http://localhost:3000',
});

export default api;