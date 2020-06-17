import Popup from './js/components/Popup2';
import Form from './js/components/Form';
import MainApi from './js/api/MainApi';

const mainApi = new MainApi({
  baseUrl: 'https://api.news-explorer-api.gq',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

(function () {
  const popupLogin = document.querySelector('.popup_login');
  const popupLoginOpen = document.querySelector('.header__button_auth');
  const popupLoginClose = popupLogin.querySelector('.popup__close');
  const popupLoginButton = popupLogin.querySelector('.popup__button');
  const popupLoginToggle = popupLogin.querySelector('.popup__toggle-link'); // при нажатии Login закрывается Reg открывается

  const popupReg = document.querySelector('.popup_registration');
  const popupRegClose = popupReg.querySelector('.popup__close');
  const popupRegButton = popupReg.querySelector('.popup__button');
  const popupRegToggle = popupReg.querySelector('.popup__toggle-link'); // при нажатии Reg закрывается Login открывается
  // Данный попап нужно открывать в другом случае
  const popupSuccess = document.querySelector('.popup_success');
  const popupSuccessClose = popupSuccess.querySelector('.popup__close');
  const popupSuccessToggle = popupSuccess.querySelector('.popup__toggle-link');
  // при нажатии Success закрывается Login открывается

  // 1 аргумент - попап, 2 - массив кнопок для закрытия, 3 -массив кнопок для открытия

  // eslint-disable-next-line
  const login = new Popup(popupLogin, popupLoginButton, [popupLoginClose,popupLoginButton,popupLoginToggle],[popupRegToggle,popupLoginOpen,popupSuccessToggle]);

  // eslint-disable-next-line
  const registration = new Popup(popupReg, popupRegButton, [popupRegClose,popupRegToggle],[popupLoginToggle]); // убрала popupRegButton

  // eslint-disable-next-line
   const success = new Popup(popupSuccess,undefined,[popupSuccessClose,popupSuccessToggle],undefined,1);
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
