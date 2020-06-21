import { calcTimeForRequest } from '../utils/utils';

export default class NewsCardList {
  constructor(api) {
    this.api = api;
    this.resultBlock = document.querySelector('.result');
    this.container = document.querySelector('.result__container');
    this.search = document.querySelector('.search__input');
    this.searchButton = document.querySelector('.search__button');
    this.nothingFoundBlock = document.querySelector('.waiting-error');
    this.preloader = document.querySelector('.waiting');
    this.serverError = document.querySelector('.server-error');
    this._setHandlers();
    this._initialState();
  }

  _setHandlers() {
    this.searchButton.addEventListener('click', this._validateSearch.bind(this));
  }

  _initialState() { // скрывает все блоки
    this.resultBlock.classList.add('hiddenElement');
    this.nothingFoundBlock.classList.add('hiddenElement');
    this.preloader.classList.add('hiddenElement');
    this.serverError.classList.add('hiddenElement');
  }

  _validateSearch() {
    this.search.placeholder = 'Введите тему новости';
    if (!this.search.checkValidity()) {
      this.search.placeholder = 'Нужно ввести ключевое слово';
    } else {
      this.searchNews(this.search.value); // отправляем запрос NewsApi
    }
  }

  searchNews(keyWord) {
    this._initialState(); // скрываю все блоки
    this.preloader.classList.remove('hiddenElement'); // включаю прелоудер
    this.api.getNews(keyWord, calcTimeForRequest(), 2)
      .then((date) => {
        this.preloader.classList.add('hiddenElement');
        if (date.articles.length === 0) { // если нет новостей, показываю блок "ничего не найдено"
          this.nothingFoundBlock.classList.remove('hiddenElement');
        } else {
          this.resultBlock.classList.remove('hiddenElement');
          // вызвать добавление карточек
          console.log(date);
        }
      })
      .catch((err) => {
        this.preloader.classList.add('hiddenElement');
        this.serverError.classList.remove('hiddenElement'); // ошибка сервера
        console.log(err);
      });
  }
}
/* Когда данные получены, в блоке результатов исчезает прелоудер, и появляются карточки. Их следует расположить в линию по 3 на каждой строке на разрешении 1280 пикселей. Если сжимать окно браузера, карточки переносятся на следующую строку. */
/* Если карточек больше трёх, отрисовываются только 3, а под ними появляется кнопка «Показать ещё». По нажатию отрисовываются ещё три, а кнопка сдвигается ниже, чтобы оказаться внизу блока с карточками.
Когда все карточки отрисованы, кнопка «Показать ещё» должна пропасть.
Разберём подробнее устройство отдельной карточки в блоке с результатами. */
