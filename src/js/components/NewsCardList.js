export default class NewsCardList {
  constructor(api, container, search, searchButton) {
    this.api = api;
    this.container = container;
    this.search = search;
    this.searchButton = searchButton;
    this._setHandlers();
  }

  _setHandlers() {
    this.searchButton.addEventListener('click', this._validateSearch.bind(this));
  }


  _validateSearch() {
    this.search.placeholder = 'Введите тему новости';
    if (!this.search.checkValidity()) {
      this.search.placeholder = 'Нужно ввести ключевое слово';
    } else {
      console.log(this.search.value);
    }
    // иначе запрос к api
  }
}
