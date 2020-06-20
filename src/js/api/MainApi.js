// MainApi. Отвечает за взаимодействие с написанным вами Node.js API.
// Конструктор этого класса принимает опции, необходимые для инициализации работы с API.
// Вот список обязательных методов:
// signup регистрирует нового пользователя;
// signin аутентифицирует пользователя на основе почты и пароля;
// getUserData возвращает информацию о пользователе;
// getArticles забирает все статьи;
// createArticle создаёт статью;
// removeArticle удаляет статью.
// Каждый из методов этих классов возвращает промис,
// содержит в себе обработку ответа и обязательный блок .catch(),
// бросающий ошибку дальше с помощью Promise.reject или throw.
// Также классы MainApi и NewsApi не должны взаимодействовать с DOM напрямую из своих методов.
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
}
