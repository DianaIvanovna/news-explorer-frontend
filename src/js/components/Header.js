export default class Header {
  constructor(api) {
    this._api = api;
    this._header = document.querySelector('.header');
    this._headerMenu = document.querySelector('.header__menu');
    this._headerBackground = document.querySelector('.background__mobile');
    this._headerMenuClose = document.querySelector('.header__menu_close');
    this._buttonSavedArticles = document.getElementById('savedArticles'); // кнопка сохраненные статьи
    this._buttonAuth = this._header.querySelector('.header__button_auth'); // кнопка авторизироваться
    this._button_Exit = this._header.querySelector('.header__button_logout'); // кнопка выход из аккаунта
    this._buttonUser = this._header.querySelector('.header__button_user'); // кнопка с именем пользователя
    this._checkingLogin = this._checkingLogin.bind(this);
    this._render = this._render.bind(this);
    this._setHandlers();
    this._checkingLogin(); // проверяю, залогин ли пользователь
  }

  _setHandlers() {
    document.addEventListener('login', this._checkingLogin.bind(this));
    this._button_Exit.addEventListener('click', this._exit.bind(this));
    this._headerMenu.addEventListener('click', this._openMobile.bind(this));
    this._headerMenuClose.addEventListener('click', this._closeMobile.bind(this));
  }

  _openMobile() { // открытие мобильной версии
    this._header.classList.add('header_active');
    this._headerBackground.classList.add('background__mobile_active');
  }

  _closeMobile() { // закрытие мобильной версии
    this._header.classList.remove('header_active');
    this._headerBackground.classList.remove('background__mobile_active');
  }

  _checkingLogin() { // проверка, залогинен ли пользователь
    this._api.getUserInfo()
      .then((res) => {
        this._render({
          isLoggedIn: 1,
          userName: res.name,
        });
      })
      .catch((err) => {
        this._render({
          isLoggedIn: 0,
        });
      });
  }

  _render(props) { // перерисовывает шапку в зависимости от переданного аргумента — объекта props.
    if (this._header.classList.contains('header_savedArticles')) { // На странице "сохраненные статьи"
      if (!props.isLoggedIn) { // пользователь не залогинен
        document.location.href = './'; // выбросить пользователя на главную страницу
      } else { // залогинен
        this._buttonSavedArticles.classList.remove('header__link_none');
        this._button_Exit.classList.remove('header__button_none');
        this._buttonUser.textContent = props.userName;
      }
    } else if (!props.isLoggedIn) { // пользователь не залогинен и находится на главной странице
      this._buttonSavedArticles.classList.add('header__link_none');
      this._buttonAuth.classList.remove('header__button_none');
      this._button_Exit.classList.add('header__button_none');
    } else { // залогинен
      this._buttonSavedArticles.classList.remove('header__link_none');
      this._buttonAuth.classList.add('header__button_none');
      this._button_Exit.classList.remove('header__button_none');
      this._buttonUser.textContent = props.userName;
    }
  }

  _exit() { // выход
    this._api.logout()
      .then((res) => {
        this._render({
          isLoggedIn: 0,
        });
      })
      .catch((err) => console.log(err));
  }
}
