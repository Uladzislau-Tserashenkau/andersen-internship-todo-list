import events from './events';

export default class Controller {
  constructor(view, model) {
    this.$view = view;
    this.$model = model;
    this.itemCounter = this.$model.getItems().length;

    view.on(events.REMOVE_ITEM, (index) => {
      // console.log("model see that smth tries to remove", index);
      this.$view.render(this.$model.removeItem(+index));
    });
    view.on(events.ADD_ITEM, (text) => {
      this.itemCounter += 1;
      this.$view.render(this.$model.addItem(text, this.itemCounter));
    });
  }

  renderList() {
    return this.$view.render(this.$model.getItems());
  }
}
