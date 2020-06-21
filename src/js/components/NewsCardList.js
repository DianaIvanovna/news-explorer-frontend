import { calcTimeForRequest } from '../utils/utils';

export default class NewsCardList {
  constructor(api, createCard) {
    this.api = api;
    this.resultBlock = document.querySelector('.result');
    this.container = document.querySelector('.result__container');
    this.search = document.querySelector('.search__input');
    this.searchButton = document.querySelector('.search__button');
    this.nothingFoundBlock = document.querySelector('.waiting-error');
    this.preloader = document.querySelector('.waiting');
    this.serverError = document.querySelector('.server-error');
    this.createCard = createCard;
    this._setHandlers();
    this._initialState();
    this.addCard.bind(this);
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
    this.api.getNews(keyWord, calcTimeForRequest(), 4)
      .then((date) => {
        this.preloader.classList.add('hiddenElement');
        if (date.articles.length === 0) { // если нет новостей, показываю блок "ничего не найдено"
          this.nothingFoundBlock.classList.remove('hiddenElement');
        } else {
          this.resultBlock.classList.remove('hiddenElement');
          this.addCard(date.articles);
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

  addCard(articles) {
    articles.forEach((article) => {
      const news = this.createCard(this.api, article);
      const cardElement = news.create();
      this.container.append(cardElement); // новые карточки вставляются вперед
    });
  }
}
