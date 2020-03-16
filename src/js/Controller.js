import events from './events';

export default class Controller {
  constructor(view, model) {
    this.itemCounter = 0;
    this.$view = view;
    this.$model = model;

    view.on(events.REMOVE_ITEM, (index) => {
      // console.log("model see that smth tries to remove", index);
      this.$view.render(this.$model.removeItem(+index));
    });
  }

  renderList() {
    return this.$view.render(this.$model.getItems());
  }
}
