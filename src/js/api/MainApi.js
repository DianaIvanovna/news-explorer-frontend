export default class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  signup(email, password, name) { // регистрирует нового пользователя;
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    }).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(res.status);
    });
  }

  signin(email, password) { // аутентифицирует пользователя на основе почты и пароля;
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((res) => {
      if (!res.ok) return Promise.reject(res.status);
      return res;
    });
  }

  getUserInfo() { // проверка, есть ли куки и отдаю имя и email
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => {
        if (!res.ok) return Promise.reject(res.status);
        return res.json();
      });
  }

  logout() { // выход
    return fetch(`${this._baseUrl}/logout`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
    }).then((res) => {
      if (!res.ok) return Promise.reject(res.status);
      return res.json();
    });
  }

  saveNews(keyword, title, text, date, source, link, image) { // сохранить статью
    return fetch(`${this._baseUrl}/articles`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        keyword, title, text, date, source, link, image,
      }),
    }).then((res) => {
      if (!res.ok) return Promise.reject(res.status);
      return res.json();
    });
  }

  deleteNews(articlesId) { // удалить статью
    return fetch(`${this._baseUrl}/articles/${articlesId}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    }).then((res) => {
      if (!res.ok) return Promise.reject(res.status);
      return res.json();
    });
  }

  getNews() { // вернуть сохранёные статьи
    return fetch(`${this._baseUrl}/articles/`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    }).then((res) => {
      if (!res.ok) return Promise.reject(res.status);
      return res.json();
    });
  }
}
