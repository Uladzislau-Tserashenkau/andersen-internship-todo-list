import EventEmitter from './EventEmitter';
import events from './events';
import Item from './components/Item';

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
    const newLi = new Item(text, id);
    this.currentElementsList.push(newLi);
    this.anchor.children[0].appendChild(newLi);
  }

  addItemHandler(text) {
    this.emit(events.ADD_ITEM, text);
  }

  render(items) {
    const list = document.createElement('ul');
    items.forEach(({ text, id }) => {
      list.appendChild(new Item(text, id));
    });
    this.currentElementsList = Array.from(list.children);
    list.addEventListener('click', ({ target }) => {
      if (target.classList.contains('delete-button')) {
        this.emit(events.REMOVE_ITEM, target.parentElement.dataset.itemId);
      }
    });

    this.anchor.appendChild(list);

    // -------------------------------------------
    const btn = document.getElementById('btn');
    const inp = document.getElementById('inp');

    btn.addEventListener('click', (e) => {
      if (inp.value) {
        this.addItemHandler(inp.value);
        inp.value = '';
      }
    });

    window.addEventListener('keydown', ({ key }) => {
      if (key === 'Enter' && inp.value) {
        this.addItemHandler(inp.value);
        inp.value = '';
      }
    });
  }
}
