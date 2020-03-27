
export default class Model {
  constructor() {
    const DATA = 'data';
    this.DATA = DATA;
    this.items = localStorage.getItem(this.DATA) ? JSON.parse(localStorage.getItem(this.DATA)) : [];
  }

  saveToLocalStorage() {
    localStorage.setItem(this.DATA, JSON.stringify(this.items));
  }

  addItem(text, id) {
    this.items = [...this.items, { text, id, done: false }];
    this.saveToLocalStorage();
    return { text, id };
  }

  removeItem(itemId) {
    this.items = this.items.filter((item) => item.id !== itemId);
    this.saveToLocalStorage();
    return itemId;
  }

  getItemText(itemId) {
    return this.items.find(({ id }) => id === +itemId);
  }

  itemDone(itemId) {
    const elem = this.items.find(({ id }) => id === +itemId);
    elem.done = !elem.done;
    this.saveToLocalStorage();
    return elem;
  }

  updateItem({ parentElement: { dataset: { itemId } }, value }) {
    const elem = this.items.find(({ id }) => +itemId === id);
    elem.text = value || elem.text;
    this.saveToLocalStorage();
    return elem;
  }

  getFilteredItems(filterType) {
    if (filterType === 'filter-done') {
      return this.items.filter(({ done }) => done);
    } if (filterType === 'filter-undone') {
      return this.items.filter(({ done }) => !done);
    }
    return [...this.items];
  }

  getItems() {
    return [...this.items];
  }
}
