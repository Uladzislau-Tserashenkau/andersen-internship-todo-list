import events from './events';

export default class Controller {
  constructor(view, model) {
    this.$view = view;
    this.$model = model;
    this.itemCounter = this.$model.getItems().length;

    view.on(events.REMOVE_ITEM, (index) => {
      this.$view.reRenderOnItemRemove(this.$model.removeItem(+index));
    });

    view.on(events.ADD_ITEM, (text) => {
      this.itemCounter += 1;
      this.$view.reRenderOnItemAdd(this.$model.addItem(text, this.itemCounter));
    });
  }

  renderList() {
    return this.$view.render(this.$model.getItems());
  }
}
