import { formattingTime } from '../utils/utils';

export default class NewsCard {
  constructor(api, cardData) {
    this.api = api;
    this.title = cardData.title;
    this.publishedAt = cardData.publishedAt;
    this.description = cardData.description;
    this.urlToImage = cardData.urlToImage;
    this.source = cardData.source.name;
    this.template = document.querySelector('.template-card');
    this.savedArticles = document.getElementById('savedArticles');
  }

  _setHandlers() {
    this.bookmark.addEventListener('mouseover', () => {
      if (this.savedArticles.classList.contains('header__link_none')) { // не залогинен
        this.alert.classList.remove('hiddenElement');
      }
    });
    this.bookmark.addEventListener('mouseout', () => {
      if (this.savedArticles.classList.contains('header__link_none')) { // не залогинен
        this.alert.classList.add('hiddenElement');
      }
    });
    this.bookmark.addEventListener('click', this.addBookmarks.bind(this));
    // this.bookmark.addEventListener('mouseover', this.addBookmarks.bind(this));
  }

  addBookmarks(event) {
    if (!this.savedArticles.classList.contains('header__link_none')) { // залогинен
      this.bookmark.classList.toggle('card__bookmark_active');
      // добавить в сохраненные
    }
  }

  create() {
    const newCard = document.createElement('div');
    newCard.classList.add('card');
    // Клонируем содержимое шаблона для того, чтобы переиспользовать его несколько раз
    newCard.append(this.template.content.cloneNode(true));
    this.image = newCard.querySelector('.card__image');
    this.date = newCard.querySelector('.card__date');
    this.title = newCard.querySelector('.card__title');
    this.text = newCard.querySelector('.card__text');
    this.sourse = newCard.querySelector('.card__sourse');
    this.bookmark = newCard.querySelector('.card__bookmark');
    this.alert = newCard.querySelector('.card__alert');

    this.image.src = this.urlToImage;
    this.date.textContent = formattingTime(this.publishedAt);
    this.title.textContent = this.title;
    this.text.textContent = this.description;
    this.sourse.textContent = this.source;

    this._setHandlers();
    return newCard;
  }
}
