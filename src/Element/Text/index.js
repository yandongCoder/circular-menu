import Element from "../index";
import render from "./render";

export default function Text(parent, config, menu, icon) {
    this.parent = parent;
    this.menu = menu;
    this.config = config;
    this.icon = icon;
    this.element = document.createElement('span');
}

Text.prototype = Object.create(Element.prototype);
Text.prototype.constructor = Text;
Text.prototype.render = render;