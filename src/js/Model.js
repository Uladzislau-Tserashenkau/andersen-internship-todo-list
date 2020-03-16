
export default class Model {
  constructor(items = []) {
    this.items = items;
  }

  addItem(item) {
    this.items.push(item);
  }

  removeItem(itemId) {
    this.items = this.items.filter((item) => item.id !== itemId);
    return [...this.items];
  }

  getItems() {
    return [...this.items];
  }
}
