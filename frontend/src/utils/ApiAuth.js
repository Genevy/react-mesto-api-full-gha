class ApiAuth {
    constructor(options) {
        this._url = options.baseUrl;
        this._headers = options.headers;
    }
    
    _handleReply(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
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
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }).then(this._handleReply);
    }
}

const apiAuth = new ApiAuth({
    // baseUrl: 'https://api.genevy.nomoredomains.rocks',
    baseUrl: 'http://localhost:3000',
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
});

export default apiAuth;
