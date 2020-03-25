export default class TextContainer {
  constructor(text) {
    this.elem = document.createElement('span');
    this.elem.classList.add('item-text');
    this.elem.textContent = text;
    return this.elem;
  }
}
