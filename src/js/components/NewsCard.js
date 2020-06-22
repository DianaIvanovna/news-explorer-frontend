import { formattingTime } from '../utils/utils';

export default class NewsCard {
  constructor(api, cardData, keyWord) {
    this.api = api;
    this.keyWord = keyWord;
    this.title = cardData.title;
    this.publishedAt = cardData.publishedAt;
    this.description = cardData.description;
    this.urlToImage = cardData.urlToImage;
    this.source = cardData.source.name;
    this.url = cardData.url;
    this.template = document.querySelector('.template-card');
    this.savedArticles = document.getElementById('savedArticles');
    this.saveNews = this.saveNews.bind(this);
    this.deleteNews = this.deleteNews.bind(this);
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
      if (this.templateBookmark.classList.contains('card__bookmark_active')) {
        this.templateBookmark.classList.remove('card__bookmark_active');
        // удалить статью
        this.deleteNews();
      } else {
        this.templateBookmark.classList.add('card__bookmark_active');
        // добавить в сохраненные
        this.saveNews();
      }
    }
  }

  deleteNews() {
    this.api.deleteNews(this._id)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  saveNews() {
    this.api.saveNews(this.keyWord, this.templateTitle.textContent, this.templateText.textContent,
      this.templateDate.textContent, this.templateSourse.textContent, this.url,
      this.templateImage.src)
      .then((res) => {
        console.log(res);
        this._id = res.data._id;
        console.log(this._id);
      })
      .catch((err) => {
        console.log(err);
      });
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
