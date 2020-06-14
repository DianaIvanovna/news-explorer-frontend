export default class BaseComponent {
  constructor() {
    this.setHandlers = this.setHandlers.bind(this);
    // this._setHandlers(arrayOfEventHandlers);
  }

  setHandlers(arrayObjects) {
    arrayObjects.forEach((object) => {
      object.array.forEach((el) => {
        if (el.length !== 0) el.addEventListener(object.event, object.func);
      });
    });
  }
}

// КАК ЭТО РАБОТАЕТ
// в базовый класс приходит массив объектов. arrayObjects
// В каждом объекте есть:
// 'array'- массив элементов, на который нужно повесить обработчик;
// 'func' - функция, которую должен вызвать обработчик;
// 'event'- событие
// С помощью функции _setHandlers создаем обработчики.
