import classNames from '../classNames';

export default class TextContainer {
  constructor(text) {
    this.elem = document.createElement('span');
    this.elem.classList.add(classNames.ITEM_TEXT);
    this.elem.textContent = text;
    return this.elem;
  }
}
