import './savedArticles.css';
import MainApi from '../../js/api/MainApi';
import SavedArticles from '../../js/components/SavedArticles';
import Header from '../../js/components/Header';
import NewsCardList from '../../js/components/NewsCardList';
import NewsCard from '../../js/components/NewsCard';

// функция для открытия подменю в мобильной версии
(function () {
  const headerMenu = document.querySelector('.header__menu');
  const headerMenuClose = document.querySelector('.header__menu_close');
  const header = document.querySelector('.header');
  const headerBackground = document.querySelector('.background__mobile');
  headerMenu.addEventListener('click', (() => {
    header.classList.add('header_active');
    headerBackground.classList.add('background__mobile_active');
  }));
  headerMenuClose.addEventListener('click', (() => {
    header.classList.remove('header_active');
    headerBackground.classList.remove('background__mobile_active');
  }));
}());

const mainApi = new MainApi({
  baseUrl: 'https://api.news-explorer-api.gq',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
const createCard = (api, obj, keyWord) => new NewsCard(mainApi, obj, keyWord, 1);
const savedArticles = new SavedArticles(mainApi, createCard);
const header = new Header(mainApi);
