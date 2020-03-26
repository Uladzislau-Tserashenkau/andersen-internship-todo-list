export default class TaskCounter {
  constructor(doneTasks, allTasks) {
    this.elem = document.createElement('div');
    this.elem.classList.add('task-counter');
    this.doneTasks = document.createElement('span');
    this.doneTasks.classList.add('done-tasks');
    this.doneTasks.textContent = doneTasks;
    this.allTasks = document.createElement('span');
    this.allTasks.classList.add('all-tasks');
    this.allTasks.textContent = allTasks;
    this.elem.appendChild(document.createTextNode('Done '));
    this.elem.appendChild(this.doneTasks);
    this.elem.appendChild(document.createTextNode(' of '));
    this.elem.appendChild(this.allTasks);
  }

  getElem() {
    return this.elem;
  }

  update(doneTasks, allTasks) {
    this.allTasks.textContent = allTasks;
    this.doneTasks.textContent = doneTasks;
  }
}
