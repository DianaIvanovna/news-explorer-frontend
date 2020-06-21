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
    this.templateBookmark.addEventListener('mouseover', () => {
      if (this.savedArticles.classList.contains('header__link_none')) { // не залогинен
        this.templateAlert.classList.remove('hiddenElement');
      }
    });
    this.templateBookmark.addEventListener('mouseout', () => {
      if (this.savedArticles.classList.contains('header__link_none')) { // не залогинен
        this.templateAlert.classList.add('hiddenElement');
      }
    });
    this.templateBookmark.addEventListener('click', this.addBookmarks.bind(this));
    // this.bookmark.addEventListener('mouseover', this.addBookmarks.bind(this));
  }

  addBookmarks(event) {
    if (!this.savedArticles.classList.contains('header__link_none')) { // залогинен
      this.templateBookmark.classList.toggle('card__bookmark_active');
      // добавить в сохраненные
    }
  }

  create() {
    const newCard = document.createElement('div');
    newCard.classList.add('card');
    // Клонируем содержимое шаблона для того, чтобы переиспользовать его несколько раз
    newCard.append(this.template.content.cloneNode(true));
    this.templateImage = newCard.querySelector('.card__image');
    this.templateDate = newCard.querySelector('.card__date');
    this.templateTitle = newCard.querySelector('.card__title');
    this.templateText = newCard.querySelector('.card__text');
    this.templateSourse = newCard.querySelector('.card__sourse');
    this.templateBookmark = newCard.querySelector('.card__bookmark');
    this.templateAlert = newCard.querySelector('.card__alert');

    this.templateImage.src = this.urlToImage;
    this.templateDate.textContent = formattingTime(this.publishedAt);
    this.templateTitle.textContent = this.title;
    this.templateText.textContent = this.description;
    this.templateSourse.textContent = this.source;

    this._setHandlers();
    return newCard;
  }
}
