import EventEmitter from '../../EventEmitter';
import events from '../../events';
import Item from '../Item/Item';
import EditInput from '../EditInput/EditInput';
import TextContainer from '../TextContainer/TextContainer';

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

  reRenderOnItemDone({ id, done }) {
    const elem = this.currentElementsList.find(({ dataset: { itemId } }) => +itemId === id);
    elem.classList.toggle('done');
  }

  addItemHandler(text) {
    this.emit(events.ADD_ITEM, text);
  }

  renderInput({ text, id }) {
    const editInput = new EditInput(text);
    const elem = this.currentElementsList.find(({ dataset: { itemId } }) => +itemId === id);
    elem.children[0].remove();
    elem.insertBefore(editInput, elem.children[0]);
    editInput.focus();
    editInput.addEventListener('blur', () => {
      this.emit(events.EDIT_FINISHED, editInput);
    });
  }

  renderUpdatedItem({ text, id }) {
    const elem = this.currentElementsList.find(({ dataset: { itemId } }) => +id === +itemId);
    elem.firstChild.remove();

    elem.insertBefore(new TextContainer(text), elem.firstChild);
  }

  render(items) {
    const list = document.createElement('ul');
    items.forEach(({ text, id, done }) => {
      list.appendChild(new Item(text, id, done));
    });
    this.currentElementsList = Array.from(list.children);
    list.addEventListener('click', ({ target }) => {
      if (target.classList.contains('delete-button')) {
        this.emit(events.REMOVE_ITEM, target.parentElement.dataset.itemId);
      }
      if (target.classList.contains('item-text')) {
        this.emit(events.EDIT_ITEM, target.parentElement.dataset.itemId);
      }
      if (target.classList.contains('done-button')) {
        this.emit(events.ITEM_DONE, target.parentElement.dataset.itemId);
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
      if (key === 'Enter' && document.getElementsByClassName('edit-item').length !== 0) {
        document.getElementsByClassName('edit-item')[0].blur();
      } else if (key === 'Enter' && inp.value) {
        this.addItemHandler(inp.value);
        inp.value = '';
      }
    });
  }
}
