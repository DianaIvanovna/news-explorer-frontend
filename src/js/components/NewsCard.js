import { formattingTime } from '../utils/utils';

export default class NewsCard {
  constructor(api, cardData, keyWord, flagSavedArticles = 0) {
    this.api = api;
    this.keyWord = keyWord;
    this.flagSavedArticles = flagSavedArticles; // флаг, если мы на странице "Сохраненные статьи"
    this.cardData = cardData;
    this.template = document.querySelector('.template-card');
    this.savedArticles = document.getElementById('savedArticles');
    this.saveNews = this.saveNews.bind(this);
    this.deleteNews = this.deleteNews.bind(this);
  }

  _setHandlers() {
    this.templateBookmark.addEventListener('mouseover', () => {
      if (this.savedArticles.classList.contains('header__link_none') || this.flagSavedArticles) {
      // не залогинен или находится на странице "Сохраненные статьи"
        this.templateAlert.classList.remove('hiddenElement');
      }
    });
    this.templateBookmark.addEventListener('mouseout', () => {
      if (this.savedArticles.classList.contains('header__link_none') || this.flagSavedArticles) { // не залогинен
        this.templateAlert.classList.add('hiddenElement');
      }
    });
    this.newCard.addEventListener('click', this.goToNewsSite.bind(this));
  }

  goToNewsSite(event) { // перейти на сайт новости
    if (event.target.parentElement === this.templateBookmark) this.addAndDeleteBookmarks();
    else if (!this.flagSavedArticles) window.open(this.cardData.url);
    else window.open(this.cardData.link);
  }

  addAndDeleteBookmarks() { // Сохранить или удалить карточку
    if (this.flagSavedArticles) { // если карточка на странице "сохраненные"
      this._id = this.cardData._id;
      this.deleteNews();
      this.container.removeChild(this.newCard);
    } else if (!this.savedArticles.classList.contains('header__link_none')) { // залогинен
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
        this._id = res.data._id;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  create() {
    this.newCard = document.createElement('div');
    this.newCard.classList.add('card');
    // Клонируем содержимое шаблона для того, чтобы переиспользовать его несколько раз
    this.newCard.append(this.template.content.cloneNode(true));
    this.templateImage = this.newCard.querySelector('.card__image');
    this.templateDate = this.newCard.querySelector('.card__date');
    this.templateTitle = this.newCard.querySelector('.card__title');
    this.templateText = this.newCard.querySelector('.card__text');
    this.templateSourse = this.newCard.querySelector('.card__sourse');

    if (this.flagSavedArticles) { // если карточка добавляется на страницу "сохраненные"
      this.templateBookmark = this.newCard.querySelector('.card__bookmark_trash');
      this.templateKeyword = this.newCard.querySelector('.card__keyword');
      this.container = document.querySelector('.result__container');
      this.templateKeyword.textContent = this.keyWord;
      this.templateImage.src = this.cardData.image;
      this.templateDate.textContent = this.cardData.date;
      this.templateSourse.textContent = this.cardData.source;
    } else {
      this.templateBookmark = this.newCard.querySelector('.card__bookmark');
      this.templateDate.textContent = formattingTime(this.cardData.publishedAt);
      this.templateImage.src = this.cardData.urlToImage;
      this.templateSourse.textContent = this.cardData.source.name;
    }
    this.templateAlert = this.newCard.querySelector('.card__alert');
    this.templateTitle.textContent = this.cardData.title;
    this.templateText.textContent = this.cardData.description;

    this._setHandlers();
    return this.newCard;
  }
}
