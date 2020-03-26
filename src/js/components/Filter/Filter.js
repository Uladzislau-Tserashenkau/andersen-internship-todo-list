export default class Filter {
  constructor() {
    this.elem = document.createElement('div');
    this.elem.classList.add('filter');
    this.allBtn = document.createElement('button');
    this.allBtn.classList.add('filter-all');
    this.allBtn.classList.add('filtered');
    this.allBtn.textContent = 'all';
    this.doneBtn = document.createElement('button');
    this.doneBtn.classList.add('filter-done');
    this.doneBtn.textContent = 'done';
    this.undoneBtn = document.createElement('button');
    this.undoneBtn.classList.add('filter-undone');
    this.undoneBtn.textContent = 'undone';
    this.elem.appendChild(this.allBtn);
    this.elem.appendChild(this.doneBtn);
    this.elem.appendChild(this.undoneBtn);
  }

  getElem() {
    return this.elem;
  }
}
