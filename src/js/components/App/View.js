import EventEmitter from '../../EventEmitter';
import events from '../../events';
import Item from '../Item/Item';
import EditInput from '../EditInput/EditInput';
import TextContainer from '../TextContainer/TextContainer';
import TaskCounter from '../TaskCounter/TaskCounter';
import Filter from '../Filter/Filter';

export default class View extends EventEmitter {
  constructor(anchor) {
    super();
    this.anchor = anchor;
    this.currentElementsList = null;
    this.taskCounter = new TaskCounter(0, 0);
    this.filter = new Filter();
  }

  reRenderOnItemRemove(deleteItemId) {
    this.currentElementsList.find(({ dataset: { itemId } }) => +itemId === deleteItemId).remove();
    this.currentElementsList = this.currentElementsList
      .filter(({ dataset: { itemId } }) => +itemId !== deleteItemId);
    this.taskCounter.update(document.getElementsByClassName('done').length, this.currentElementsList.length);
  }

  reRenderOnItemAdd({ text, id }) {
    const newLi = new Item(text, id);
    this.currentElementsList.push(newLi);
    this.anchor.children[0].appendChild(newLi);
    this.taskCounter.update(document.getElementsByClassName('done').length, this.currentElementsList.length);
  }

  reRenderOnItemDone({ id, done }) {
    const elem = this.currentElementsList.find(({ dataset: { itemId } }) => +itemId === id);
    elem.classList.toggle('done');
    this.taskCounter.update(document.getElementsByClassName('done').length, this.currentElementsList.length);
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

  reRenderOnFilter(itemsToRender) {

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
    this.taskCounter.update(document.getElementsByClassName('done').length, this.currentElementsList.length);


    // -------------------------------------------
    const btn = document.getElementById('btn');
    const inp = document.getElementById('inp');
    const appHeader = document.getElementById('appHeader');
    appHeader.appendChild(this.anchor.appendChild(this.taskCounter.getElem()));
    appHeader.appendChild(this.anchor.appendChild(this.filter.getElem()));
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
