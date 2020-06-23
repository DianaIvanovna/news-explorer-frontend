export default class MainApi {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  signup(email, password, name) { // регистрирует нового пользователя;
    return fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      headers: this.headers,
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
    return fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      headers: this.headers,
      credentials: 'include',
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((res) => {
      if (!res.ok) return Promise.reject(res.status);
      return res.json();
    });
  }

  getUserInfo() { // проверка, есть ли куки и отдаю имя и email
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => {
        if (!res.ok) return Promise.reject(res.status);
        return res.json();
      });
  }

  logout() { // выход
    return fetch(`${this.baseUrl}/logout`, {
      method: 'POST',
      headers: this.headers,
      credentials: 'include',
    }).then((res) => {
      if (!res.ok) return Promise.reject(res.status);
      return res.json();
    });
  }

  saveNews(keyword, title, text, date, source, link, image) { // сохранить статью
    return fetch(`${this.baseUrl}/articles`, {
      method: 'POST',
      headers: this.headers,
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
    return fetch(`${this.baseUrl}/articles/${articlesId}`, {
      method: 'DELETE',
      headers: this.headers,
      credentials: 'include',
    }).then((res) => {
      if (!res.ok) return Promise.reject(res.status);
      return res.json();
    });
  }

  getNews() { // вернуть сохранёные статьи
    return fetch(`${this.baseUrl}/articles/`, {
      method: 'GET',
      headers: this.headers,
      credentials: 'include',
    }).then((res) => {
      if (!res.ok) return Promise.reject(res.status);
      return res.json();
    });
  }
}
