
export default class Model {
  constructor(items = []) {
    this.items = items;
  }

  addItem(text, id) {
    this.items = [...this.items, { text, id }];
    return { text, id };
  }

  removeItem(itemId) {
    this.items = this.items.filter((item) => item.id !== itemId);
    return itemId;
  }

  getItems() {
    return [...this.items];
  }
}
