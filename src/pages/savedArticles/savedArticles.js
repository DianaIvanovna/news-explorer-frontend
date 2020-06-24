import './savedArticles.css';
import MainApi from '../../js/api/MainApi';
import SavedArticles from '../../js/components/SavedArticles';
import Header from '../../js/components/Header';
import NewsCard from '../../js/components/NewsCard';
import { baseUrlMainApi, headersMainApi } from '../../js/constants/api-const';

(function () {
  const mainApi = new MainApi({
    baseUrl: baseUrlMainApi,
    headers: headersMainApi,
  });
  const createCard = (api, obj, keyWord) => new NewsCard(mainApi, obj, keyWord, 1);
  const savedArticles = new SavedArticles(mainApi, createCard);
  const header = new Header(mainApi);
}());
