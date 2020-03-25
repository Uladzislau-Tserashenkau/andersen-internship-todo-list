
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

  getItemText(itemId) {
    return this.items.find(({ id }) => id === +itemId);
  }

  updateItem({ parentElement: { dataset: { itemId } }, value }) {
    const elem = this.items.find(({ id }) => +itemId === id);
    elem.text = value || elem.text;
    return elem;
  }

  getItems() {
    return [...this.items];
  }
}
