export default class Popup {
  constructor(popup, popupOpen) {
    this.popup = popup;
    this.popupClose = popup.querySelector('.popup__close');
    this.popupOpen = popupOpen;
    this.popupButton = popup.querySelector('.popup__button');
    this.openAndCloseForm = this.openAndCloseForm.bind(this);
    this.setEventListeners();
  }

  openAndCloseForm(event) {
    event.stopPropagation();
    // при открытие формы, кнопка становится неактивной
    if (event.target.classList.contains('popup__button')) {
      console.log('!');
      if (event.target.classList.contains('popup__button_active')) {
        // когда нажали на кнопку добавить и когда она активна
        this.popupButton.classList.remove('popup__button_active');
        this.popup.classList.remove('popup_is-opened');
      }
    } else {
      this.popupButton.classList.remove('popup__button_active');
      this.popup.classList.toggle('popup_is-opened');
    }
  }

  setEventListeners() {
    this.popup.addEventListener('click', this.openAndCloseForm);
    this.popupOpen.addEventListener('click', this.openAndCloseForm);
    this.popupClose.addEventListener('click', this.openAndCloseForm);
    this.popupButton.addEventListener('click', this.openAndCloseForm);
  }
}
