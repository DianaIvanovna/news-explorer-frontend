import NewsApi from './js/api/NewsApi';
import NewsCardList from './js/components/NewsCardList';

const apiKey = 'eb14994f064f4a27bfe88e8a815ccd48';
const newsApi = new NewsApi({
  baseUrl: 'https://newsapi.org/v2/everything?',
  apiKey,
});

(function () {
  // this.createCard = createCard;
  const newsCardList = new NewsCardList(newsApi);
}());
