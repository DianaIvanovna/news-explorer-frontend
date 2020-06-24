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

const loginConst = {
  popup: popupLogin,
  popupButton: popupLoginButton,
  arrayClose: [popupLoginClose, popupLoginToggle],
  arrayOpen: [popupRegToggle, popupLoginOpen, popupSuccessToggle],
};
const registrationConst = {
  popup: popupReg,
  popupButton: popupRegButton,
  arrayClose: [popupRegClose, popupRegToggle],
  arrayOpen: [popupLoginToggle],
};
const successConst = {
  popup: popupSuccess,
  popupButton: undefined,
  arrayClose: [popupSuccessClose, popupSuccessToggle],
  arrayOpen: undefined,
  flagSuccess: 1,
};

const form = document.querySelector('.popup__form_login');
const formReg = document.querySelector('.popup__form_registration');

export {
  loginConst, registrationConst, successConst, popupSuccess, form, formReg,
};
