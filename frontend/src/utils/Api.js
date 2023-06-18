class Api {
    constructor({ baseUrl, headers }) {
        this._url = baseUrl;
        this._headers = headers;
        this._authHeaders = null;
    }

    setAuthHeaders(token) {
        console.log(token);
        this._authHeaders = { ...this._headers, authorization: `Bearer ${token}` };
    }
    deleteAuthHeaders() {
        this._authHeaders = null;
    }

    registerUser(regData) {
        return fetch(`${this._url}/signup`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify(regData),
        }).then(this._handleReply);
    }

    loginUser(loginData) {
        return fetch(`${this._url}/signin`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify(loginData),
        }).then(this._handleReply);
    }

    checkToken(token) {
        return fetch(`${this._url}/users/me`, {
            method: "GET",
            headers: this._authHeaders,
        }).then(this._handleReply);
    }

    _handleReply(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, { headers: this._authHeaders }).then(
            this._handleReply
        );
    }

    getAllCards() {
        console.log(this._authHeaders);
        return fetch(`${this._url}/cards`, { headers: this._authHeaders }).then(
            this._handleReply
        );
    }

    updateUserInfo({ name, about }) {
        return fetch(`${this._url}/users/me`, {
            method: "PATCH",
            headers: this._authHeaders,
            body: JSON.stringify({ name, about }),
        }).then(this._handleReply);
    }

    updateUserAvatar({ avatar }) {
        return fetch(`${this._url}/users/me/avatar`, {
            headers: this._authHeaders,
            method: "PATCH",
            body: JSON.stringify({ avatar }),
        }).then(this._handleReply);
    }

    addNewCard({ name, link }) {
        return fetch(`${this._url}/cards`, {
            method: "POST",
            headers: this._authHeaders,
            body: JSON.stringify({ name, link }),
        }).then(this._handleReply);
    }

    deleteCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
            method: "DELETE",
            headers: this._authHeaders,
        }).then(this._handleReply);
    }

    changeLikeCardStatus(id, isLiked) {
        if (isLiked) {
            return fetch(`${this._url}/cards/${id}/likes`, {
                method: "PUT",
                headers: this._authHeaders,
            }).then(this._handleReply);
        } else {
            return fetch(`${this._url}/cards/${id}/likes`, {
                method: "DELETE",
                headers: this._authHeaders,
            }).then(this._handleReply);
        }
    }
}

const api = new Api({
    baseUrl: 'https://api.genevy.nomoredomains.rocks',
    // baseUrl: 'http://localhost:3000',
    headers: {
        "Content-Type": "application/json",
    }
  })

export default api;
