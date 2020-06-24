export default class NewsApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._apiKey = options.apiKey;
  }

  getNews(keyWord, time, pageSize) {
    return fetch(`${this._baseUrl}q=${keyWord}&from=${time.dateFrom}&to=${time.dateTo}&pageSize=${pageSize}&apiKey=${this._apiKey}`)
      .then((res) => {
        if (!res.ok) return Promise.reject(res.status);
        return res.json();
      });
  }
}
