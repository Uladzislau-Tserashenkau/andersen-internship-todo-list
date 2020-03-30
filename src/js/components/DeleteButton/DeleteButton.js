import classNames from '../classNames';

export default class DeleteButton {
  constructor() {
    this.elem = document.createElement('button');
    this.elem.classList.add(classNames.DELETE_BUTTON);
    this.elem.textContent = 'X';
    return this.elem;
  }
}
