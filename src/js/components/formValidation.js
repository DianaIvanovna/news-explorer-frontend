export default class FormValidation {
  constructor(form) {
    this.form = form;
    this.setEventListeners(this.form);
  }

  setEventListeners(form) {
    // Добавляет необходимые для валидации обработчики всем полям формы.
    const email = form.elements[0];
    const password = form.elements[1];
    const submit = form.querySelector('.popup__button');
    submit.addEventListener('click', this.setSubmitButtonState.bind(this));
    email.addEventListener('input', this.checkInputValidity.bind(this));
    password.addEventListener('input', this.checkInputValidity.bind(this));
    if (form.name === 'registration') {
      const name = form.elements[2];
      name.addEventListener('input', this.checkInputValidity.bind(this));
    }
  }

  checkInputValidity(event) { // чтобы валидировать поля.
    this.validForm(event.target.parentElement);
    this.resetError(event.target.parentElement, event.target);
    this.validElem(event.target, event.target.parentElement);
  }

  setSubmitButtonState(event) { // делает кнопку активной/неактивной
    event.preventDefault();
    this.validForm(this.form);
  }

  resetError(form, input) { // убирает сообщение об ошибке
    const errorElement = form.querySelector(`.error__${input.name}`);
    errorElement.textContent = '';
  }

  validElem(element, form) { // проверяет валидность отдельных инпутов
    const errorElement = form.querySelector(`.error__${element.name}`);
    const words = {
      validationLenght: 'Должно быть минимум 8 символов', validationLenghtName: 'Должно быть от 2 до 30 символов', validationEmail: 'Неправильный формат email', validationRequiredField: 'Это обязательное поле',
    };
    if (!element.checkValidity()) {
      if (!element.value) {
        errorElement.textContent = words.validationRequiredField;
      }
      if (element.classList.contains('popup__input_type-email')) {
        errorElement.textContent = words.validationEmail;
      }
      if (element.classList.contains('popup__input_type-password')) {
        errorElement.textContent = words.validationLenght;
      }
      if (element.classList.contains('popup__input_type-name')) {
        errorElement.textContent = words.validationLenghtName;
      }
      return false;
    }
    return true;
  }

  validForm(form) { // проверяет валидность всей формы
    const inputs = Array.from(form);
    let flagValid = true;
    inputs.forEach((elem) => {
      if (elem.classList.contains('popup__input')) {
        if (!(this.validElem(elem, form))) flagValid = false;
      }
    });
    this.setSubmitButton(flagValid, form);
  }

  setSubmitButton(flag, form) { // делает кнопку активной/неактивной
    const button = form.querySelector('.popup__button');
    if (flag) {
      button.classList.add('popup__button_active');
    } else {
      button.classList.remove('popup__button_active');
    }
  }
}
