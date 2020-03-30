import classNames from '../classNames';

export default class Filter {
  constructor() {
    this.elem = document.createElement('div');
    this.elem.classList.add(classNames.FILTER);
    this.allBtn = document.createElement('button');
    this.allBtn.classList.add(classNames.FILTER_ALL);
    this.allBtn.classList.add(classNames.FILTERED);
    this.allBtn.textContent = 'all';
    this.doneBtn = document.createElement('button');
    this.doneBtn.classList.add(classNames.FILTER_DONE);
    this.doneBtn.textContent = 'done';
    this.undoneBtn = document.createElement('button');
    this.undoneBtn.classList.add(classNames.FILTER_UNDONE);
    this.undoneBtn.textContent = 'undone';
    this.elem.appendChild(this.allBtn);
    this.elem.appendChild(this.doneBtn);
    this.elem.appendChild(this.undoneBtn);
  }

  getElem() {
    return this.elem;
  }
}
