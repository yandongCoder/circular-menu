import Item from "../Item/index";

export default function () {
    this.element.appendChild(document.createElement('ul'));

    this.menus.forEach(function (v, i) {
        var item = new Item(this.element, this.config, v, i);
        item.render();
        this.items.push(item);
    }, this);
}