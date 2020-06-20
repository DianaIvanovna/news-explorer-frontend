import Popup from './js/components/Popup2';
import Form from './js/components/Form';
import MainApi from './js/api/MainApi';
import Auth from './js/components/Auth';
import Header from './js/components/Header';

const mainApi = new MainApi({
  baseUrl: 'https://api.news-explorer-api.gq',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

(function () { // функция открытия и закрытия попапов
  const popupLogin = document.querySelector('.popup_login');
  const popupLoginOpen = document.querySelector('.header__button_auth');
  const popupLoginClose = popupLogin.querySelector('.popup__close');
  const popupLoginButton = popupLogin.querySelector('.popup__button');
  const popupLoginToggle = popupLogin.querySelector('.popup__toggle-link'); // при нажатии "Зарегистрироваться" Login закрывается Reg открывается

  const popupReg = document.querySelector('.popup_registration');
  const popupRegClose = popupReg.querySelector('.popup__close');
  const popupRegButton = popupReg.querySelector('.popup__button');
  const popupRegToggle = popupReg.querySelector('.popup__toggle-link'); // при нажатии "Войти" Reg закрывается Login открывается

  const popupSuccess = document.querySelector('.popup_success');
  const popupSuccessClose = popupSuccess.querySelector('.popup__close');
  const popupSuccessToggle = popupSuccess.querySelector('.popup__toggle-link');
  // при нажатии "выполнить вход" Success закрывается Login открывается

  // 1 аргумент - попап, 2- кнопка отправление формы,
  // 3 - массив кнопок для закрытия, 4 -массив кнопок для открытия

  const login = new Popup(popupLogin, popupLoginButton, [popupLoginClose, popupLoginButton,
    popupLoginToggle], [popupRegToggle, popupLoginOpen, popupSuccessToggle]);
  const registration = new Popup(popupReg, popupRegButton, [popupRegClose, popupRegToggle],
    [popupLoginToggle]);
  const success = new Popup(popupSuccess, undefined, [popupSuccessClose, popupSuccessToggle],
    undefined, 1);
}());

// функция валидирования форм
// нужно еще сделать функцию, обрабатывающая ошибку, когда пользователь уже зарегистрирован
(function () {
  const popupSuccess = document.querySelector('.popup_success');
  const form = document.querySelector('.popup__form_login');
  // eslint-disable-next-line
  const formLogin = new Form(form, mainApi);
  const formReg = document.querySelector('.popup__form_registration');
  // eslint-disable-next-line
  const formRegistration = new Form(formReg, mainApi,popupSuccess);
}());
const header = new Header(mainApi);
const auth = new Auth(mainApi);
