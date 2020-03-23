export default class EventEmitter {
  constructor() {
    this.events = Object.create(null);
  }

  on(event, cb) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(cb);
  }

  emit(event, payload) {
    if (this.events[event]) {
      this.events[event].forEach((func) => {
        func(payload);
      });
    }
  }
}
