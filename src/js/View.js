import EventEmitter from './EventEmitter';
import events from './events';

export default class View extends EventEmitter {
  constructor(anchor) {
    super();
    this.anchor = anchor;
    this.currentElementsList = null;
  }

  render(items) {
    // if list exists, check li's and update them
    if (this.anchor.children.length) {
      // check wether the length of this.currentElementsList is bigger than elements.length
      // this check is needed to figure out wether element was deleted or added
      if (items.length < this.currentElementsList.length) {
        // element was deleted
        this.currentElementsList.forEach((element) => {
          // check which id of the this.currentElementsList is not inside elements
          if (!items.some((item) => item.id === +element.dataset.itemId)) {
            // removing element from this.currentElementsList
            this.currentElementsList = this.currentElementsList.filter((elem) => elem.dataset.itemId !== element.dataset.itemId);
            // removing element from the DOM
            element.remove();
          }
        });
      } else if (items.length > this.currentElementsList.length) {
        // element was added
        items.forEach((item) => {
          if (!this.currentElementsList.some((existingElement) => +existingElement.dataset.itemId === item.id)) {
            console.log('item added', item);
            const newElem = document.createElement('li');
            newElem.dataset.itemId = item.id;
            newElem.textContent = item.text;
            this.currentElementsList.push(newElem);
            this.anchor.children[0].appendChild(newElem);
          }
        });
      }
    } else {
      // if list doesnt exist, render new list
      const list = document.createElement('ul');
      items.forEach((item) => {
        const liElem = document.createElement('li');
        liElem.innerText = item.text;
        liElem.dataset.itemId = item.id;
        list.appendChild(liElem);
      });
      this.currentElementsList = Array.from(list.children);
      list.addEventListener('click', (e) => {
        this.emit(events.REMOVE_ITEM, e.target.dataset.itemId);
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
}
