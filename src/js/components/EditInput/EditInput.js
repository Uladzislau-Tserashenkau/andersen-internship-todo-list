export default class EditInput {
  constructor(text) {
    this.elem = document.createElement('input');
    this.elem.value = text;
    this.elem.classList.add('edit-item');
    return this.elem;
  }
}
