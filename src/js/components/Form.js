// Form. Класс, отвечающий за логику работы формы. Методы:
// 1) _setHandlers - добавляет необходимые обработчики
// 2) _checkInputValidity(event) - валидирует поля, при заполнение формы
// 3) _formSubmission(event) - отправка формы
// 4) registration() - отправляет на сервер запрос регистрации
// 5) setServerError(message) - подставляет в форму ошибку с сервера
// 6)_resetError(input) - убирает сообщение об ошибке
// 7) _validateInputElement(element) - проверяет валидность отдельных импутов
// 8)  _validateForm() - проверяет валидность всей формы
// 9)_setSubmitButton(flag) - делает кнопку активной/неактивной
// 10)
// setServerError — добавляет форме ошибку, пришедшую с сервера;+
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
    this.email = this.form.elements.email;
    this.password = this.form.elements.password;
    this.name = this.form.elements.name;
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

  _formSubmission(event) { // отправка формы
    this._validateForm();
    if (event.target.classList.contains('popup__button_active')) {
      console.log(this.form);
      if (this.form.classList.contains('popup__form_registration')) {
        this.registration();
      } else this.login();
    }
  }

  registration() {
    console.log('!');
    this.button.textContent = 'Регистрируемся...';
    this.api.signup(this.email.value, this.password.value, this.name.value)
      .then((res) => {
        console.log(res);
        this.button.textContent = 'Зарегистрироваться';
        this.popupSuccess.classList.add('popup_is-opened'); // открыла попап успешная регистрация
        this.form.parentElement.parentElement.classList.remove('popup_is-opened'); // закрыла форму регистрации
      })
      .catch((err) => {
        console.log(err);
        this.setServerError('такой пользователь уже есть');
        this.button.textContent = 'Зарегистрироваться';
      });
  }

  login() { // добавь, чтобы если не зашел, то попап не закрывался
    this.button.textContent = 'Выполняем вход...';
    this.api.signin(this.email.value, this.password.value)
      .then((res) => {
        this.button.textContent = 'Войти';
        const event = new Event('login'); // выполняется событие, которое меняет шапку
        document.dispatchEvent(event);
        this.form.parentElement.parentElement.classList.remove('popup_is-opened');// закрыла форму
      })
      .catch((err) => {
        console.log(err);
        this.setServerError('Неправильные почта или пароль');
        this.button.textContent = 'Войти';
      });
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
