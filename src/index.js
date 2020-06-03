import './style.css';

/*
Header может быть в двух состояниях: когда пользователей зашел в свой аккаунт и нет.
1. Пользователь зашел в свой аккаунт. Должна быть кнопка Главная, Сохранненые статьи и выход из аккаунта  */
/* 2. Пользователь не зашел. Должна быть кнопка Зарегистрироваться, для этого кнопке с классом header__button_auth нужно убрать класс header__button_none, а остальным, кроме кнопки главная, длбавить.
Т е ссылки Сохранненые статьи добавить класс  header__link_none
*/

// Функция сохранить новость
(function () {
  const newsConteiner = document.querySelector('.result__container');
  newsConteiner.addEventListener('click', ((event) => {
    console.log(event.target.parentElement.classList);
    if (event.target.parentElement.classList.contains('card__bookmark')) {
      event.target.parentElement.classList.toggle('card__bookmark_active');
    }
  }));
}());

// Функция, которая блокирует поиск новостей
(function () {
  const searchInput = document.querySelector('.search__input');
  // потом подставлю условие, что при авторизации условие поменяется.
  if (0) {
    searchInput.setAttribute('disabled', 'disabled');
    searchInput.classList.remove('search__input');
    searchInput.classList.add('search__input_locked');
    searchInput.placeholder = 'Залочено';
    document.querySelector('.search__button').classList.add('seach__button_locked');
  }
}());
