import './style.css';
import Popup from './js/popap';
import FormValidation from './js/formValidation';


// Header может быть в двух состояниях: когда пользователей зашел в свой аккаунт и нет.
// 1. Пользователь зашел в свой аккаунт. Должна быть кнопка Главная, Сохранненые статьи и выход из
//  2. Пользователь не зашел. Должна быть кнопка Зарегистрироваться, для этого кнопке с классом
// header__button_auth  нужно убрать класс  header__button_none, а остальным,
// кроме кнопки главная, длбавить.
// Т е ссылки Сохранненые статьи добавить класс  header__link_none


// Функция сохранить новость
(function () {
  const newsConteiner = document.querySelector('.result__container');
  newsConteiner.addEventListener('click', ((event) => {
    if (event.target.parentElement.classList.contains('card__bookmark')) {
      event.target.parentElement.classList.toggle('card__bookmark_active');
    }
  }));
}());

// Функция, которая блокирует поиск новостей
(function () {
  const searchInput = document.querySelector('.search__input');
  // потом подставлю условие, что если пользователь зашел, то инпут разлочен, иначе залочен.
  // Чтобы посмотреть залоченный инпут подставте в условие 1.
  if (0) {
    searchInput.setAttribute('disabled', 'disabled');
    searchInput.classList.remove('search__input');
    searchInput.classList.add('search__input_locked');
    searchInput.placeholder = 'Залочено';
    document.querySelector('.search__button').classList.add('seach__button_locked');
  }
}());

// функция открытия попапов
// Данные ошибки eslint уйдут, когда буду писать js
(function () {
  const popup = document.querySelector('.popup');
  const buttonAuth = document.querySelector('.header__button_auth');
  // eslint-disable-next-line
  const popupAuth = new Popup(popup, buttonAuth);

  const popupReg = document.querySelector('.popup_registration');
  const buttonReg = document.querySelector('.popup__toggle-link');
  // eslint-disable-next-line
  const popupRegistration = new Popup(popupReg, buttonReg);

  // Чтобы открыть попап успешная регистрация, нужно добавить ему класс popup_is-opened
}());

// функция валидирования форм
// нужно еще сделать функцию, обрабатывающая ошибку, когда пользователь уже зарегистрирован
(function () {
  const form = document.querySelector('.popup__form_login');
  // eslint-disable-next-line
  const formLogin = new FormValidation(form);
  const formReg = document.querySelector('.popup__form_registration');
  // eslint-disable-next-line
  const formRegistration = new FormValidation(formReg);
}());
