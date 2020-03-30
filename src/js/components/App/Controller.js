import events from '../../events';

export default class Controller {
  constructor(view, model) {
    this.$view = view;
    this.$model = model;
    this.itemCounter = this.$model.getItems().length !== 0 ? this.$model.getItems().reduce((max, { id }) => (max < id ? id : max), -1) : 0;

    view.on(events.REMOVE_ITEM, (index) => {
      this.$view.reRenderOnItemRemove(this.$model.removeItem(+index));
    });

    view.on(events.ADD_ITEM, (text) => {
      this.itemCounter += 1;
      this.$view.reRenderOnItemAdd(this.$model.addItem(text, this.itemCounter));
    });

    view.on(events.FILTER_ITEMS, (filterType) => {
      this.$view.reRenderOnFilter(this.$model.getFilteredItems(filterType));
    });

    view.on(events.EDIT_ITEM, (index) => {
      this.$view.renderInput(this.$model.getItem(index));
    });

    view.on(events.ITEM_DONE, (index) => {
      this.$view.reRenderOnItemDone(this.$model.itemDone(index));
    });

    view.on(events.EDIT_FINISHED, (input) => {
      this.$view.renderUpdatedItem(this.$model.updateItem(input));
    });
  }

  renderList() {
    return this.$view.render(this.$model.getItems());
  }
}
