import EventEmitter from '../../EventEmitter';
import events from '../../events';
import Item from '../Item/Item';
import EditInput from '../EditInput/EditInput';
import TextContainer from '../TextContainer/TextContainer';
import TaskCounter from '../TaskCounter/TaskCounter';
import Filter from '../Filter/Filter';
import classNames from '../classNames';

export default class View extends EventEmitter {
  constructor(anchor) {
    super();
    this.anchor = anchor;
    this.currentElementsList = null;
    this.taskCounter = new TaskCounter(0, 0);
    this.filter = new Filter();
  }

  findItem(id) {
    return this.currentElementsList.find(({ dataset: { itemId } }) => +itemId === id);
  }

  reRenderOnItemRemove(deleteItemId) {
    this.findItem(deleteItemId).remove();
    this.currentElementsList = this.currentElementsList
      .filter(({ dataset: { itemId } }) => +itemId !== deleteItemId);
    this.updateCounter();
  }

  reRenderOnItemAdd({ text, id }) {
    const newLi = new Item(text, id);
    this.currentElementsList.push(newLi);
    this.anchor.children[0].appendChild(newLi);
    this.updateCounter();
  }

  reRenderOnItemDone({ id }) {
    this.findItem(id).classList.toggle('done');
    this.updateCounter();
  }

  updateCounter() {
    const doneItemsAmount = this.currentElementsList.filter(({ className }) => className.includes('done')).length;
    const allItemsAmount = this.currentElementsList.length;
    this.taskCounter.update(doneItemsAmount, allItemsAmount);
  }

  addItemHandler(text) {
    this.emit(events.ADD_ITEM, text);
  }

  renderInput({ text, id }) {
    const editInput = new EditInput(text);
    const elem = this.findItem(id);
    elem.children[0].remove();
    elem.insertBefore(editInput, elem.children[0]);
    editInput.focus();
    editInput.addEventListener('blur', () => {
      this.emit(events.EDIT_FINISHED, editInput);
    });
  }

  renderUpdatedItem({ text, id }) {
    const elem = this.findItem(id);
    elem.firstChild.remove();
    elem.insertBefore(new TextContainer(text), elem.firstChild);
  }

  reRenderOnFilter(itemsToRender) {
    while (this.anchor.firstChild.firstChild) {
      this.anchor.firstChild.firstChild.remove();
    }
    itemsToRender.forEach(({ id }) => {
      this.anchor.firstChild.appendChild(this.findItem(id));
    });
  }

  filterReact(target) {
    if (!target.classList.contains(classNames.FILTERED)) {
      if (target.classList.contains(classNames.FILTER_ALL)
      || target.classList.contains(classNames.FILTER_DONE)
      || target.classList.contains(classNames.FILTER_UNDONE)) {
        this.emit(events.FILTER_ITEMS, target.className);
        const oldFilter = document.getElementsByClassName(classNames.FILTERED)[0];
        oldFilter.classList.remove(classNames.FILTERED);
        target.classList.add(classNames.FILTERED);
      }
    }
  }

  render(items) {
    const list = document.createElement('ul');
    items.forEach(({ text, id, done }) => {
      list.appendChild(new Item(text, id, done));
    });
    this.currentElementsList = Array.from(list.children);
    list.addEventListener('click', ({ target }) => {
      if (target.classList.contains(classNames.DELETE_BUTTON)) {
        this.emit(events.REMOVE_ITEM, target.parentElement.dataset.itemId);
      }
      if (target.classList.contains(classNames.ITEM_TEXT)) {
        this.emit(events.EDIT_ITEM, target.parentElement.dataset.itemId);
      }
      if (target.classList.contains(classNames.DONE_BUTTON)) {
        this.emit(events.ITEM_DONE, target.parentElement.dataset.itemId);
      }
    });

    this.anchor.appendChild(list);
    this.updateCounter();


    // -------------------------------------------
    const btn = document.getElementById('btn');
    const inp = document.getElementById('inp');
    const appHeader = document.getElementById('appHeader');
    appHeader.appendChild(this.anchor.appendChild(this.taskCounter.getElem()));
    appHeader.appendChild(this.anchor.appendChild(this.filter.getElem()));

    appHeader.addEventListener('click', ({ target }) => {
      this.filterReact(target);
    });
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
