export default class SavedArticles {
  constructor(api, createCard) {
    this.api = api;
    this.createCard = createCard;
    this.container = document.querySelector('.result__container');
    this.titleGreeting = document.querySelector('.articles-info__subtitle');
    this.titleKeyWords = document.querySelector('.articles-info__words');
    this.buttonSavedArticles = document.querySelector('.header__button_savedArticles');
    this.SavedArticles = []; // массив статей
    this.keywords = []; // массив объектов с ключевыми словами и их количеством
    this.numberSavedArticles = 0; // количество статей
    this.makeGreeting.bind(this);
    this.makeTitleKeyWords.bind(this);
    this.addCard.bind(this);
    this.getSavedArticles();
  }

  getSavedArticles() {
    this.api.getNews()
      .then((res) => {
        res.data.forEach((article) => {
          this.SavedArticles.push(article);
          this.numberSavedArticles += 1;
          const flag = this.keywords.find((item) => item.keyword === article.keyword);
          if (flag !== undefined) {
            flag.number += 1;
          } else {
            this.keywords.push({
              keyword: article.keyword,
              number: 1,
            });
          }
        });
        this.makeGreeting();
        this.makeTitleKeyWords();
        this.addCard();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  makeGreeting() { // сделать заголовок с ключевыми словами
    this.titleGreeting.textContent = `${this.buttonSavedArticles.textContent} у вас ${this.numberSavedArticles} сохранённых статей`;
  }

  makeTitleKeyWords() { // сделать заколовок с ключевыми словами
    this.keywords = this.keywords.sort((a, b) => { // отсортировала ключевые слова по популярности
      if (a.number < b.number) return 1;
      if (a.number === b.number) return 0;
      return -1;
    });
    if (this.keywords.length === 1) {
      this.titleKeyWords.textContent = this.keywords[0].keyword;
    } else if (this.keywords.length === 2) {
      this.titleKeyWords.textContent = `${this.keywords[0].keyword} `;
      this.titleKeyWords.insertAdjacentHTML('beforeend', '<span class="articles-info__key">и</span>');
      this.titleKeyWords.insertAdjacentText('beforeend', ` ${this.keywords[1].keyword}`);
    } else if (this.keywords.length === 3) {
      this.titleKeyWords.textContent = `${this.keywords[0].keyword}, ${this.keywords[1].keyword} `;
      this.titleKeyWords.insertAdjacentHTML('beforeend', '<span class="articles-info__key">и</span>');
      this.titleKeyWords.insertAdjacentText('beforeend', ` ${this.keywords[2].keyword}`);
    } else {
      this.titleKeyWords.textContent = `${this.keywords[0].keyword}, ${this.keywords[1].keyword} `;
      this.titleKeyWords.insertAdjacentHTML('beforeend', '<span class="articles-info__key">и</span>');
      this.titleKeyWords.insertAdjacentText('beforeend', ` ${this.keywords.length - 2} другим`);
    }
  }

  addCard(keyWord) { // добавить карточки сохраненных статей
    this.SavedArticles.forEach((article) => {
      const news = this.createCard(this.api, article, article.keyword);
      const cardElement = news.create();
      this.container.append(cardElement);
    });
  }
}
