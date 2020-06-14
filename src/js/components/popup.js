// Popup. Класс попапа. Вот его методы:
// setContent — вставляет в попап содержимое, например, форму входа или сообщение
// об успешной регистрации;
// clearContent — очищает содержимое попапа;
// open — открывает попап;
// close — закрывает попап.

export default class Popup {
  constructor(popup, popupOpen, popupOpen2 = null, popupOpen3 = null) {
    this.popup = popup;
    this.popupClose = popup.querySelector('.popup__close');
    this.popupOpen = popupOpen;
    this.popupOpen2 = popupOpen2;
    this.popupOpen3 = popupOpen3;
    this.popupButton = popup.querySelector('.popup__button');
    this.openAndCloseForm = this.openAndCloseForm.bind(this);
    this.closeForm = this.closeForm.bind(this);
    this.setEventListeners();
  }

  openAndCloseForm(event) {
    event.stopPropagation();
    // при открытие формы, кнопка становится неактивной
    if (event.target.classList.contains('popup__button')) {
      if (event.target.classList.contains('popup__button_active')) {
        // когда нажали на кнопку добавить и когда она активна
        this.popupButton.classList.remove('popup__button_active');
        this.popup.classList.remove('popup_is-opened');
      }
    } else if (event.target.classList.contains('popup__toggle-link_registration')) {
      document.querySelector('.popup_login').classList.remove('popup_is-opened');
      this.popupButton.classList.remove('popup__button_active');
      this.popup.classList.toggle('popup_is-opened');
    } else if (event.target.classList.contains('popup__toggle-link')) {
      document.querySelector('.popup_registration').classList.remove('popup_is-opened');
      document.querySelector('.popup_login').classList.add('popup_is-opened');
    } else {
      this.popupButton.classList.remove('popup__button_active');
      this.popup.classList.toggle('popup_is-opened');
    }
    if (this.popup.classList.contains('popup_is-opened')) {
      this.popup.querySelector('.popup__input').focus();
    }
  }

  closeForm(event) {
    if (event.target.classList.contains('popup')) {
      this.popup.classList.remove('popup_is-opened');
    }
  }

  setEventListeners() {
    this.popup.addEventListener('click', this.closeForm);
    this.popupOpen.addEventListener('click', this.openAndCloseForm);
    this.popupClose.addEventListener('click', this.openAndCloseForm);
    this.popupButton.addEventListener('click', this.openAndCloseForm);
    if (this.popupOpen2 != null) this.popupOpen2.addEventListener('click', this.openAndCloseForm);
    if (this.popupOpen3 != null) this.popupOpen3.addEventListener('click', this.openAndCloseForm);
  }
}
