import DeleteButton from './DeleteButton';

export default class Item {
  constructor(text, id) {
    this.elem = document.createElement('li');
    const textContainer = document.createElement('span');
    textContainer.textContent = text;
    this.elem.appendChild(textContainer);
    this.elem.dataset.itemId = id;
    this.elem.appendChild(new DeleteButton());
    return this.elem;
  }
}
