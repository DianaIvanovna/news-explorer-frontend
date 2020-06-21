export default class NewsApi {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.apiKey = options.apiKey;
  }

  getNews(keyWord, time, pageSize) {
    return fetch(`${this.baseUrl}q=${keyWord}&from=${time.dateFrom}&to=${time.dateTo}&pageSize=${pageSize}&apiKey=${this.apiKey}`)
      .then((res) => {
        if (!res.ok) return Promise.reject(res.status);
        return res.json();
      });
  }
}
