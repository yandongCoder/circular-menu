import Element from "../index";
import render from "./render";


export default function Horizontal(parent, config, menu, index) {
    this.parent = parent;
    this.config = config;
    this.menu = menu;
    this.index = index;

    this.element = document.createElement('div');
}

Horizontal.prototype = Object.create(Element.prototype);
Horizontal.prototype.constructor = Horizontal;
Horizontal.prototype.render = render;