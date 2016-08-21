import Element from "../index";
import render from "./render";

export default function Item(parent, config, menu, index) {
    Element.call(this);
    this.parent = parent.firstChild;
    this.config = config;
    this.index = index;
    this.menu = menu;
}

Item.prototype = Object.create(Element.prototype);
Item.prototype.constructor = Item;
Item.prototype.render = render;