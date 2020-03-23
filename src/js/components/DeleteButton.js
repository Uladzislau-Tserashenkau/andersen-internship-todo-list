export default class DeleteButton {
  constructor() {
    this.elem = document.createElement('button');
    this.elem.classList.add('delete-button');
    this.elem.textContent = 'X';
    return this.elem;
  }
}
