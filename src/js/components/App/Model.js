
export default class Model {
  constructor() {
    if (localStorage.getItem('data')) {
      this.items = JSON.parse(localStorage.getItem('data'));
    } else {
      this.items = [];
    }
  }

  addItem(text, id) {
    this.items = [...this.items, { text, id }];
    localStorage.setItem('data', JSON.stringify(this.items));
    return { text, id };
  }

  removeItem(itemId) {
    this.items = this.items.filter((item) => item.id !== itemId);
    localStorage.setItem('data', JSON.stringify(this.items));
    return itemId;
  }

  getItemText(itemId) {
    return this.items.find(({ id }) => id === +itemId);
  }

  updateItem({ parentElement: { dataset: { itemId } }, value }) {
    const elem = this.items.find(({ id }) => +itemId === id);
    elem.text = value || elem.text;
    localStorage.setItem('data', JSON.stringify(this.items));
    return elem;
  }

  getItems() {
    return [...this.items];
  }
}
