import './style.css';
import './index2';

// Функция, которая блокирует поиск новостей
(function () {
  const searchInput = document.querySelector('.search__input');
  // потом подставлю условие, что если пользователь зашел, то инпут разлочен, иначе залочен.
  // Чтобы посмотреть залоченный инпут подставте в условие 1.
  const a = 0;
  if (a) {
    searchInput.setAttribute('disabled', 'disabled');
    searchInput.classList.remove('search__input');
    searchInput.classList.add('search__input_locked');
    searchInput.placeholder = 'Залочено';
    document.querySelector('.search__button').classList.add('seach__button_locked');
  }
}());


// (function () {
//   const mainApi = new MainApi({
//     baseUrl: 'https://api.news-explorer-api.gq',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//   });
// }());
