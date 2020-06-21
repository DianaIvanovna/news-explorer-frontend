export default class NewsCard {
  constructor(api, cardData) {
    this.api = api;
    this.title = cardData.title;
    this.publishedAt = cardData.publishedAt;
    this.description = cardData.description;
    this.urlToImage = cardData.urlToImage;
    this.source = cardData.source.name;
    this.template = document.querySelector('.template-card');
  }

  create() {
    const newCard = document.createElement('div');
    newCard.classList.add('card');
    // Клонируем содержимое шаблона для того, чтобы переиспользовать его несколько раз
    newCard.append(this.template.content.cloneNode(true));
    newCard.querySelector('.card__image').src = this.urlToImage;
    newCard.querySelector('.card__date').textContent = this.publishedAt;
    newCard.querySelector('.card__title').textContent = this.title;
    newCard.querySelector('.card__text').textContent = this.description;
    newCard.querySelector('.card__sourse').textContent = this.source;

    // document.querySelector('.result__container').append(elem);

    return newCard;
  }
}
