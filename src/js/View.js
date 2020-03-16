import EventEmitter from './EventEmitter';
import events from './events';

export default class View extends EventEmitter {
  constructor(anchor) {
    super();
    this.anchor = anchor;
  }

  render(items) {
    if (this.anchor.children.length) {
      this.anchor.children[0].remove();
    }
    const list = document.createElement('ul');
    items.forEach((item) => {
      const liElem = document.createElement('li');
      liElem.innerText = item.text;
      liElem.dataset.itemId = item.id;
      list.appendChild(liElem);
    });
    list.addEventListener('click', (e) => {
      this.emit(events.REMOVE_ITEM, e.target.dataset.itemId);
    });
    this.anchor.appendChild(list);
  }
}
