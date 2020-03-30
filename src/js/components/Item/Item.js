import DeleteButton from '../DeleteButton/DeleteButton';
import TextContainer from '../TextContainer/TextContainer';
import DoneButton from '../DoneButton/DoneButton';

export default class Item {
  constructor(text, id, done) {
    this.elem = document.createElement('li');
    this.elem.appendChild(new TextContainer(text));
    this.elem.dataset.itemId = id;
    this.elem.appendChild(new DoneButton());
    this.elem.appendChild(new DeleteButton());
    if (done) {
      this.elem.classList.add('done');
    }
    return this.elem;
  }
}
