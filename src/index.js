import './style.css';
import Popup from './js/components/Popup';
import Form from './js/components/Form';
import MainApi from './js/api/MainApi';
import Header from './js/components/Header';
import NewsApi from './js/api/NewsApi';
import NewsCardList from './js/components/NewsCardList';
import NewsCard from './js/components/NewsCard';
import {
  baseUrlMainApi, headersMainApi, apiKey, baseUrlNewsApi,
} from './js/constants/api-const';
import {
  loginConst, registrationConst, successConst, popupSuccess, form, formReg,
} from './js/constants/html-const';

(function () {
  const mainApi = new MainApi({
    baseUrl: baseUrlMainApi,
    headers: headersMainApi,
  });

  const newsApi = new NewsApi({
    baseUrl: baseUrlNewsApi,
    apiKey,
  });
  // 1 аргумент - попап, 2- кнопка отправление формы,
  // 3 - массив кнопок для закрытия, 4 -массив кнопок для открытия
  const login = new Popup(loginConst.popup, loginConst.popupButton, loginConst.arrayClose,
    loginConst.arrayOpen);
  const registration = new Popup(registrationConst.popup, registrationConst.popupButton,
    registrationConst.arrayClose, registrationConst.arrayOpen);
  const success = new Popup(successConst.popup, successConst.popupButton, successConst.arrayClose,
    successConst.arrayOpen, successConst.flagSuccess);


  const formLogin = new Form(form, mainApi);
  const formRegistration = new Form(formReg, mainApi, popupSuccess);
  const header = new Header(mainApi);

  const createCard = (api, obj, keyWord) => new NewsCard(mainApi, obj, keyWord);
  const newsCardList = new NewsCardList(newsApi, createCard);
}());
