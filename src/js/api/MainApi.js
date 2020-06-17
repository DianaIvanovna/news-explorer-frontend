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
    console.log(this.baseUrl);
  }

  signup(email, password, name) { // регистрирует нового пользователя;
    return fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      headers: this.headers,
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
  // signin (){//аутентифицирует пользователя на основе почты и пароля;

  // }
}
