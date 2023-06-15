export default class Section {
  constructor(selectorContainer, { renderer }) {
    this._renderer = renderer;
    this._container = document.querySelector(selectorContainer);
  }

  rendererItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(htmlElement) {
    this._container.prepend(htmlElement);
  }
}
