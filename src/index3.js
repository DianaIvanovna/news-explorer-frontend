import NewsApi from './js/api/NewsApi';
import NewsCardList from './js/components/NewsCardList';
import { calcTimeForRequest } from './js/utils/utils';

const apiKey = 'eb14994f064f4a27bfe88e8a815ccd48';
const newsApi = new NewsApi({
  baseUrl: 'https://newsapi.org/v2/everything?',
  apiKey,
});

(function () {
  const container = document.querySelector('.result__container');
  const search = document.querySelector('.search__input');
  const searchButton = document.querySelector('.search__button');
  // this.createCard = createCard;
  const newsCardList = new NewsCardList(newsApi, container, search, searchButton);
}());
newsApi.getNews('короновирус', calcTimeForRequest(), 2)
  .then((date) => {
    console.log(date);
  })
  .catch((err) => {
    console.log(err);
  });
