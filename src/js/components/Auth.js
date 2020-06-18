export default class Auth {
  constructor(api) {
    this.api = api;
    this.getUser();
  }

  getUser() { // проверяю куки
    const event = new Event('login');
    document.dispatchEvent(event);
  }
}
