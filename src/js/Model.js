
export default class Model {
  constructor(items = []) {
    this.items = items;
  }

  addItem(text, id) {
    this.items = [...this.items, { text, id }];
    return [...this.items];
  }

  removeItem(itemId) {
    this.items = this.items.filter((item) => item.id !== itemId);
    return [...this.items];
  }

  getItems() {
    return [...this.items];
  }
}
