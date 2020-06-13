// Header. Класс, отвечающий за логику работы шапки сайта.
// Его конструктор принимает объект опций. В опциях передайте цвет шапки,
// так как на разных страницах он может быть разный.
// Методы у класса Header такие:
// render при вызове перерисовывает шапку в зависимости от переданного аргумента — объекта props.
// У этого объекта есть два обязательных свойства:
// isLoggedIn — залогинен ли пользователь;
// userName — имя, которое отображается в шапке залогиненного пользователя.
export default class Header {
  constructor() {
    // this.color = color;  цвет шапки
    this.header = document.querySelector('.header');
    console.log(this.header);
    this.buttonSavedArticles = document.getElementById('savedArticles'); // кнопка сохраненные статьи
    this.buttonAuth = this.header.querySelector('.header__button_auth'); // кнопка авторизироваться
    this.buttonExit = this.header.querySelector('.header__button_logout'); // кнопка выход из аккаунта
    this.buttonUser = this.header.querySelector('.header__button_user'); // кнопка с именем пользователя
  }

  render(props) { // перерисовывает шапку в зависимости от переданного аргумента — объекта props.
    if (!props.isLoggedIn) { // пользователь не залогинен
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
}