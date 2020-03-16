import EventEmitter from "./EventEmitter";

export default class View extends EventEmitter {
  constructor(anchor) {
    super();
    this.anchor = anchor;
  }

  render(items) {
    if (document.getElementById("root").children.length) {
      document.getElementById("root").children[0].remove();
    }
    const list = document.createElement("ul");
    items.forEach(item => {
      const liElem = document.createElement("li");
      liElem.innerText = item.text;
      liElem.dataset.itemId = item.id;
      list.appendChild(liElem);
    });
    list.addEventListener("click", e => {
      this.emit("removeItem", e.target.dataset.itemId);
    });
    this.anchor.appendChild(list);
  }
}
