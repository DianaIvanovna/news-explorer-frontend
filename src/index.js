import './style.css';
import './index2';
// import Popup from './js/components/Popup2';
// import FormValidation from './js/components/formValidation';
import Header from './js/components/Header';
// import MainApi from './js/api/MainApi';

// КОММЕНТАРИИ К БЛОКУ ХЭДЕР
// 1. Пользователь зашел в аккаунт
// кнопка главная - всегда есть
// сохраненные статьи
// Выход из аккаунта
// кнопка зарегистрироваться скрыта классом header__button_none
// 2. Пользователь не зашел в аккаунт
// кнопка главная - всегда есть
// кнопка зарегистрироваться - убрать класс header__button_none
// кнопка сохранненые статьи и Выход из аккаунта скрыты классом header__button_none


// КОММЕНТАРИИ К БЛОКУ РЕЗУЛЬТАТЫ ПОИСКА
// Для подсказок я еще не сделала функций.
// Я буду просто через js добавлять элемент:
// <p class="card__alert">Войдите, чтобы сохранять статьи</p>
// Аналогично со страницей Сохраненые статьи

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
  const a = 0;
  if (a) {
    searchInput.setAttribute('disabled', 'disabled');
    searchInput.classList.remove('search__input');
    searchInput.classList.add('search__input_locked');
    searchInput.placeholder = 'Залочено';
    document.querySelector('.search__button').classList.add('seach__button_locked');
  }
}());

// функция открытия попапов
// Данные ошибки eslint уйдут, когда буду писать js
/* (function () {
  const popup = document.querySelector('.popup');
  const popupReg = document.querySelector('.popup_registration');
  const popupSuccess = document.querySelector('.popup_success');

  const buttonAuth = document.querySelector('.header__button_auth');
  const buttonAuth2 = popupReg.querySelector('.popup__toggle-link');
  const buttonAuth3 = popupSuccess.querySelector('.popup__toggle-link');
  // eslint-disable-next-line
  const popupAuth = new Popup(popup, buttonAuth,buttonAuth2,buttonAuth3);

  const buttonReg = document.querySelector('.popup__toggle-link');
  // eslint-disable-next-line
  const popupRegistration = new Popup(popupReg, buttonReg);

  // Чтобы открыть попап успешная регистрация, нужно добавить ему класс popup_is-opened
}()); */

// функция валидирования форм
// нужно еще сделать функцию, обрабатывающая ошибку, когда пользователь уже зарегистрирован
/* (function () {
  const form = document.querySelector('.popup__form_login');
  // eslint-disable-next-line
  const formLogin = new FormValidation(form);
  const formReg = document.querySelector('.popup__form_registration');
  // eslint-disable-next-line
  const formRegistration = new FormValidation(formReg);
}()); */

// функция для открытия подменю в мобильной версии
(function () {
  const headerMenu = document.querySelector('.header__menu');
  const headerMenuClose = document.querySelector('.header__menu_close');
  const header = document.querySelector('.header');
  const headerBackground = document.querySelector('.background__mobile');

  headerMenu.addEventListener('click', (() => {
    header.classList.add('header_active');
    headerBackground.classList.add('background__mobile_active');
  }));
  headerMenuClose.addEventListener('click', (() => {
    header.classList.remove('header_active');
    headerBackground.classList.remove('background__mobile_active');
  }));
}());


// (function () {
//   const mainApi = new MainApi({
//     baseUrl: 'https://api.news-explorer-api.gq',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//   });
// }());

(function () {
  // isLoggedIn — залогинен ли пользователь;
// userName — имя, которое отображается в шапке залогиненного пользователя.
  const header = new Header();
  // if (document.cookies === undefined) { // пользователь неразегался
  if (1) { // пользователь неразегался
    header.render({
      isLoggedIn: 0,
    });
  } else {
    console.log('&');
    header.render({
      isLoggedIn: 1,
      userName: 'Diana122',
    });
  }
}());
