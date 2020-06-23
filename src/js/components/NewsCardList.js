import { calcTimeForRequest } from '../utils/utils';

export default class NewsCardList {
  constructor(api, createCard) {
    this._api = api;
    this._resultBlock = document.querySelector('.result');
    this._container = document.querySelector('.result__container');
    this._search = document.querySelector('.search__input');
    this._searchButton = document.querySelector('.search__button');
    this._nothingFoundBlock = document.querySelector('.waiting-error');
    this._preloader = document.querySelector('.waiting');
    this._serverError = document.querySelector('.server-error');
    this._resultButton = document.querySelector('.result__button');
    this.createCard = createCard;
    this._articles = undefined; // массив статей
    this._setHandlers();
    this._initialState();
    this.addCard.bind(this);
    this._clearСardСontainer.bind(this);
  }

  _setHandlers() {
    this._searchButton.addEventListener('click', this._validateSearch.bind(this));
    this._resultButton.addEventListener('click', this.addCard.bind(this));
  }

  _initialState() { // скрывает все блоки
    this._resultBlock.classList.add('hiddenElement');
    this._nothingFoundBlock.classList.add('hiddenElement');
    this._preloader.classList.add('hiddenElement');
    this._serverError.classList.add('hiddenElement');
    this._resultButton.classList.remove('hiddenElement');
  }

  _validateSearch() {
    this._search.placeholder = 'Введите тему новости';
    if (!this._search.checkValidity()) {
      this._search.placeholder = 'Нужно ввести ключевое слово';
    } else {
      this._searchNews(this._search.value); // отправляем запрос NewsApi
    }
  }

  _searchNews(keyWord) {
    this._initialState(); // скрываю все блоки
    this._preloader.classList.remove('hiddenElement'); // включаю прелоудер
    this._api.getNews(keyWord, calcTimeForRequest(), 100)
      .then((date) => {
        this._preloader.classList.add('hiddenElement');
        if (date.articles.length === 0) { // если нет новостей, показываю блок "ничего не найдено"
          this._nothingFoundBlock.classList.remove('hiddenElement');
        } else {
          this._clearСardСontainer();
          this._resultBlock.classList.remove('hiddenElement');
          this._articles = date.articles;
          this.addCard(keyWord); // вызвать добавление карточек
        }
      })
      .catch((err) => {
        this._preloader.classList.add('hiddenElement');
        this._serverError.classList.remove('hiddenElement'); // ошибка сервера
        console.log(err);
      });
  }

  addCard(keyWord) {
    if (this._articles.length > 3) {
      for (let i = 0; i < 3; i += 1) {
        const news = this.createCard(this._api, this._articles[i], keyWord);
        const cardElement = news.create();
        this._container.append(cardElement);
      }
      this._articles = this._articles.slice(3);
    } else {
      this._resultButton.classList.add('hiddenElement');
      for (let i = 0; i < this._articles.length; i += 1) {
        const news = this.createCard(this._api, this._articles[i], keyWord);
        const cardElement = news.create();
        this._container.append(cardElement);
      }
    }
  }

  _clearСardСontainer() { // очистить контейнер с новостями перед новым поиском
    const cards = this._container.querySelectorAll('.card');
    if (cards.length !== 0) {
      cards.forEach((card) => {
        this._container.removeChild(card);
      });
    }
  }
}
