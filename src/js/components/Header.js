export default class Header {
  constructor(api) {
    this.api = api;
    this.header = document.querySelector('.header');
    this.headerMenu = document.querySelector('.header__menu');
    this.headerBackground = document.querySelector('.background__mobile');
    this.headerMenuClose = document.querySelector('.header__menu_close');
    this.buttonSavedArticles = document.getElementById('savedArticles'); // кнопка сохраненные статьи
    this.buttonAuth = this.header.querySelector('.header__button_auth'); // кнопка авторизироваться
    this.buttonExit = this.header.querySelector('.header__button_logout'); // кнопка выход из аккаунта
    this.buttonUser = this.header.querySelector('.header__button_user'); // кнопка с именем пользователя
    this.checkingLogin = this.checkingLogin.bind(this);
    this.render = this.render.bind(this);
    this._setHandlers();
    this.checkingLogin(); // проверяю, залогин ли пользователь
  }

  _setHandlers() {
    document.addEventListener('login', this.checkingLogin.bind(this));
    this.buttonExit.addEventListener('click', this.exit.bind(this));
    this.headerMenu.addEventListener('click', this.openMobile.bind(this));
    this.headerMenuClose.addEventListener('click', this.closeMobile.bind(this));
  }

  openMobile() { // открытие мобильной версии
    this.header.classList.add('header_active');
    this.headerBackground.classList.add('background__mobile_active');
  }

  closeMobile() { // закрытие мобильной версии
    this.header.classList.remove('header_active');
    this.headerBackground.classList.remove('background__mobile_active');
  }

  checkingLogin() { // проверка, залогинен ли пользователь
    this.api.getUserInfo()
      .then((res) => {
        this.render({
          isLoggedIn: 1,
          userName: res.name,
        });
      })
      .catch((err) => {
        this.render({
          isLoggedIn: 0,
        });
      });
  }

  render(props) { // перерисовывает шапку в зависимости от переданного аргумента — объекта props.
    if (this.header.classList.contains('header_savedArticles')) { // На странице "сохраненные статьи"
      if (!props.isLoggedIn) { // пользователь не залогинен
        document.location.href = './'; // выбросить пользователя на главную страницу
      } else { // залогинен
        this.buttonSavedArticles.classList.remove('header__link_none');
        this.buttonExit.classList.remove('header__button_none');
        this.buttonUser.textContent = props.userName;
      }
    } else if (!props.isLoggedIn) { // пользователь не залогинен и находится на главной странице
      this.buttonSavedArticles.classList.add('header__link_none');
      this.buttonAuth.classList.remove('header__button_none');
      this.buttonExit.classList.add('header__button_none');
    } else { // залогинен
      this.buttonSavedArticles.classList.remove('header__link_none');
      this.buttonAuth.classList.add('header__button_none');
      this.buttonExit.classList.remove('header__button_none');
      this.buttonUser.textContent = props.userName;
    }
  }

  exit() { // выход
    this.api.logout()
      .then((res) => {
        this.render({
          isLoggedIn: 0,
        });
      })
      .catch((err) => console.log(err));
  }
}
