export default class SavedArticles {
  constructor(api, createCard) {
    this._api = api;
    this._createCard = createCard;
    this._container = document.querySelector('.result__container');
    this._titleGreeting = document.querySelector('.articles-info__subtitle');
    this._titleKeyWords = document.querySelector('.articles-info__words');
    this._buttonSavedArticles = document.querySelector('.header__button_savedArticles');
    this._savedArticles = []; // массив статей
    this._keywords = []; // массив объектов с ключевыми словами и их количеством
    this._numberSavedArticles = 0; // количество статей
    this._makeGreeting.bind(this);
    this._makeTitleKeyWords.bind(this);
    this.addCard.bind(this);
    this._getSavedArticles();
  }

  _getSavedArticles() { // запрашивает массив карточек, сохраненные пользователем
    this._api.getNews()
      .then((res) => {
        res.data.forEach((article) => {
          this._savedArticles.push(article);
          this._numberSavedArticles += 1;
          const recurringNews = this._keywords.find((item) => item.keyword === article.keyword);
          if (recurringNews !== undefined) {
            recurringNews.number += 1;
          } else {
            this._keywords.push({
              keyword: article.keyword,
              number: 1,
            });
          }
        });
        this._makeGreeting();
        this._makeTitleKeyWords();
        this.addCard();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  _makeGreeting() { // сделать заголовок с ключевыми словами
    this._titleGreeting.textContent = `${this._buttonSavedArticles.textContent} у вас ${this._numberSavedArticles} сохранённых статей`;
  }

  _makeTitleKeyWords() { // сделать заколовок с ключевыми словами
    this._keywords = this._keywords.sort((a, b) => { // отсортировала ключевые слова по популярности
      if (a.number < b.number) return 1;
      if (a.number === b.number) return 0;
      return -1;
    });
    if (this._keywords.length === 1) {
      this._titleKeyWords.textContent = this._keywords[0].keyword;
    } else if (this._keywords.length === 2) {
      this._titleKeyWords.textContent = `${this._keywords[0].keyword} `;
      this._titleKeyWords.insertAdjacentHTML('beforeend', '<span class="articles-info__key">и</span>');
      this._titleKeyWords.insertAdjacentText('beforeend', ` ${this._keywords[1].keyword}`);
    } else if (this._keywords.length === 3) {
      this._titleKeyWords.textContent = `${this._keywords[0].keyword}, ${this._keywords[1].keyword} `;
      this._titleKeyWords.insertAdjacentHTML('beforeend', '<span class="articles-info__key">и</span>');
      this._titleKeyWords.insertAdjacentText('beforeend', ` ${this._keywords[2].keyword}`);
    } else {
      this._titleKeyWords.textContent = `${this._keywords[0].keyword}, ${this._keywords[1].keyword} `;
      this._titleKeyWords.insertAdjacentHTML('beforeend', '<span class="articles-info__key">и</span>');
      this._titleKeyWords.insertAdjacentText('beforeend', ` ${this._keywords.length - 2} другим`);
    }
  }

  addCard(keyWord) { // добавить карточки сохраненных статей
    this._savedArticles.forEach((article) => {
      const news = this._createCard(this._api, article, article.keyword);
      const cardElement = news.create();
      this._container.append(cardElement);
    });
  }
}
