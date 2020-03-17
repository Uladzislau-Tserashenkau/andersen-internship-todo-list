export default class Item {
  constructor(text, id) {
    this.elem = document.createElement('li');
    this.elem.textContent = text;
    this.elem.dataset.itemId = id;
    return this.elem;
  }
}
