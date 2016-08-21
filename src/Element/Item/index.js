import Element from "../index";
import render from "./render";
import Anchor from "../Anchor/index";

export default function Item(parent, config, menu, index) {
    Element.call(this);
    this.parent = parent.firstChild;
    this.element = document.createElement('li');
    this.config = config;
    this.index = index;
    
    this.anchor = new Anchor(this.element, config, menu);
}

Item.prototype = Object.create(Element.prototype);
Item.prototype.constructor = Item;
Item.prototype.render = render;