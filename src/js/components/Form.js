// Form. Класс, отвечающий за логику работы формы. Методы:
// setServerError — добавляет форме ошибку, пришедшую с сервера;
// _validateInputElement — валидирует переданный в качестве аргумента инпут;+
// _validateForm — валидирует всю форму;+
// _clear — вспомогательный метод, очищает поля формы;
// _getInfo — вспомогательный метод, возвращает данные формы.

import {
  validationLenght, validationLenghtName, validationEmail, validationRequiredField,
} from '../constants/validation-errors';

export default class FormValidation {
  constructor(form, api, popupSuccess = null) {
    this.api = api;
    this.form = form;
    this.popupSuccess = popupSuccess;
    this.error = this.form.querySelector('.error_popup');
    this.button = this.form.querySelector('.popup__button');
    this._setHandlers = this._setHandlers.bind(this);
    this._setHandlers();
  }

  _setHandlers() {
    // Добавляет необходимые для валидации обработчики всем полям формы.
    this.form.elements.forEach((el) => {
      if (el !== this.button) el.addEventListener('input', this._checkInputValidity.bind(this));
    });
    this.button.addEventListener('click', this._formSubmission.bind(this));
  }

  _checkInputValidity(event) { // чтобы валидировать поля.
    this._validateForm();
    this._resetError(event.target);
    this._validateInputElement(event.target);
  }

  _formSubmission(event) { // делает кнопку активной/неактивной
    this._validateForm();
    if (event.target.classList.contains('popup__button_active')) {
      this.button.textContent = 'Регистрируемся...';
      this.api.signup(this.form.elements[0].value, this.form.elements[1].value, this.form.elements[2].value)
        .then((res) => {
          console.log(res);
          this.button.textContent = 'Зарегистрироваться';
          // тут нужно открыть попап "пользователь успешно зарегался"
        })
        .catch((err) => {
          console.log(err);
          this.setServerError('такой пользователь уже есть');
          this.button.textContent = 'Зарегистрироваться';
          this.popupSuccess.classList.add('popup_is-opened');
          console.log(this.form.parentElement);
          this.form.parentElement.parentElement.classList.remove('popup_is-opened');
        });
    }
  }

  setServerError(message) {
    this.error.textContent = message;
  }

  _resetError(input) { // убирает сообщение об ошибке
    const errorElement = this.form.querySelector(`.error__${input.name}`);
    errorElement.textContent = '';
  }

  _validateInputElement(element) { // проверяет валидность отдельных инпутов
    const errorElement = this.form.querySelector(`.error__${element.name}`);

    if (!element.checkValidity()) {
      if (!element.value) {
        errorElement.textContent = validationRequiredField;
      }
      if (element.classList.contains('popup__input_type-email')) {
        errorElement.textContent = validationEmail;
      }
      if (element.classList.contains('popup__input_type-password')) {
        errorElement.textContent = validationLenght;
      }
      if (element.classList.contains('popup__input_type-name')) {
        errorElement.textContent = validationLenghtName;
      }
      return false;
    }
    return true;
  }

  _validateForm() { // проверяет валидность всей формы
    let flagValid = true;
    this.form.elements.forEach((elem) => {
      if (elem.classList.contains('popup__input')) {
        if (!(this._validateInputElement(elem, this.form))) flagValid = false;
      }
    });
    this._setSubmitButton(flagValid);
  }

  _setSubmitButton(flag) { // делает кнопку активной/неактивной
    if (flag) {
      this.button.classList.add('popup__button_active');
      this.button.removeAttribute('disabled');
    } else {
      this.button.classList.remove('popup__button_active');
      this.button.setAttribute('disabled', 'disabled');
    }
  }
}

// Когда форма заполнена корректно, кнопка «Зарегистрироваться» становится активной. Клик
// по ней должен отправлять запрос на роут /signup нашего API. Если в ответе на этот запрос
// сервер возвращает ошибку,сообщение о ней должно располагаться над кнопкой
// «Зарегистрироваться». Если ответ на запрос успешен, должен появляться попап. Он сообщает,
// что пользователь зарегистрирован и предлагает войти в систему.
