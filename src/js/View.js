import EventEmitter from './EventEmitter';
import events from './events';

export default class View extends EventEmitter {
  constructor(anchor) {
    super();
    this.anchor = anchor;
    this.currentElementsList = null;
  }

  reRenderOnItemRemove(deleteItemId) {
    this.currentElementsList.find(({ dataset: { itemId } }) => +itemId === deleteItemId).remove();
    this.currentElementsList = this.currentElementsList
      .filter(({ dataset: { itemId } }) => +itemId !== deleteItemId);
  }

  reRenderOnItemAdd({ text, id }) {
    const newLi = document.createElement('li');
    newLi.textContent = text;
    newLi.dataset.itemId = id;
    this.currentElementsList.push(newLi);
    this.anchor.children[0].appendChild(newLi);
  }

  render(items) {
    const list = document.createElement('ul');
    items.forEach(({ text, id }) => {
      const liElem = document.createElement('li');
      liElem.innerText = text;
      liElem.dataset.itemId = id;
      list.appendChild(liElem);
    });
    this.currentElementsList = Array.from(list.children);
    list.addEventListener('click', ({ target: { dataset: { itemId } } }) => {
      this.emit(events.REMOVE_ITEM, itemId);
    });
    this.anchor.appendChild(list);

    // -------------------------------------------
    const btn = document.getElementById('btn');
    const inp = document.getElementById('inp');
    btn.addEventListener('click', () => {
      this.emit(events.ADD_ITEM, inp.value);
    });
  }
}
