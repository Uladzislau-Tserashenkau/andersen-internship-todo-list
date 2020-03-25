export default class DoneButton {
  constructor() {
    this.elem = document.createElement('button');
    this.elem.classList.add('done-button');
    this.elem.textContent = '+';
    return this.elem;
  }
}
