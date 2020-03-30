import classNames from '../classNames';

export default class EditInput {
  constructor(text) {
    this.elem = document.createElement('input');
    this.elem.value = text;
    this.elem.classList.add(classNames.EDIT_ITEM);
    return this.elem;
  }
}
