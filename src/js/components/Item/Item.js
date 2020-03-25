import DeleteButton from '../DeleteButton/DeleteButton';
import TextContainer from '../TextContainer/TextContainer';

export default class Item {
  constructor(text, id) {
    this.elem = document.createElement('li');
    this.elem.appendChild(new TextContainer(text));
    this.elem.dataset.itemId = id;
    this.elem.appendChild(new DeleteButton());
    return this.elem;
  }
}
