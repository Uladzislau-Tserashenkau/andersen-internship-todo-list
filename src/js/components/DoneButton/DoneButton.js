import classNames from '../classNames';

export default class DoneButton {
  constructor() {
    this.elem = document.createElement('button');
    this.elem.classList.add(classNames.DONE_BUTTON);
    this.elem.textContent = '+';
    return this.elem;
  }
}
