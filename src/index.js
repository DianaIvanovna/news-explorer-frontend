import './style.css';

/*
Header может быть в двух состояниях: когда пользователей зашел в свой аккаунт и нет.
1. Пользователь зашел в свой аккаунт.
Должна быть кнопка Главная, Сохранненые статьи и выход из аккаунта
2. Пользователь не зашел.
Должна быть кнопка Зарегистрироваться, для этого кнопке с классом header__button_auth нужно убрать класс header__button_none, а остальным, кроме кнопки главная, длбавить.
Т е ссылки Сохранненые статьи добавить класс  header__link_none
*/

// Функция для добавления новости в сохраненные
(function () {
  const newsConteiner = document.querySelector('.result__container');
  newsConteiner.addEventListener('click', ((event) => {
    console.log(event.target.parentElement.classList);
    if (event.target.parentElement.classList.contains('card__bookmark')) {
      event.target.parentElement.classList.toggle('card__bookmark_active');
    }
  }));
}());
