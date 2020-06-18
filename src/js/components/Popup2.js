export default class Popup {
  constructor(popup, button, arrayForClose, arrayForOpen) {
    this.popup = popup;
    this.button = button;
    this.inputs = this.popup.querySelectorAll('.popup__input');
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.clearContent = this.clearContent.bind(this);
    this._setHandlers(arrayForClose, arrayForOpen);
  }

  open(event) {
    event.stopPropagation();
    this.popup.classList.add('popup_is-opened');
    this.button.classList.remove('popup__button_active'); // при открытии кнопка ставится неактивной
    this.button.setAttribute('disabled', 'disabled');
    this.clearContent();
    this.inputs[0].focus();
  }

  close(event) {
    event.stopPropagation();
    this.popup.classList.remove('popup_is-opened');
  }

  clearContent() {
    this.inputs.forEach((input) => {
      input.value = '';
    });
  }

  _setHandlers(arrayForClose, arrayForOpen) {
    if (arrayForClose !== undefined) {
      arrayForClose.forEach((el) => {
        el.addEventListener('click', this.close);
      });
    }
    if (arrayForOpen !== undefined) {
      arrayForOpen.forEach((el) => {
        el.addEventListener('click', this.open);
      });
    }
  }
}
// КАК ЭТО РАБОТАЕТ
// В класс передается 2 массива:
// arrayForClose - массив элементов, при нажатии которых нужно закрыть форму
// arrayForOpen - массив элементов, при нажатии которых нужно открыть форму
// В методе _setHandlers на них вешается нужный обработчик событий.
// Метод open открывает форму, добавляя ей класс popup_is-opened
// Делает кнопку отправки формы неактивной, удаляя ему класс popup__button_active
// и очищает все инпуты формы с помощью метода clearContent.
// Метод close закрывает форму, удаляя класс popup_is-opened
