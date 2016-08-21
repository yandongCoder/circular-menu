import Element from "../index";
import render from "./render";
import createItems from "./createItems";


export default function Menu(parent, config, menus, level) {
    Element.call(this);
    this.parent = parent;
    this.config = config;
    this.menus = menus;

    this.items = [];

}

Menu.prototype = Object.create(Element.prototype);

Menu.prototype.constructor = Menu;
Menu.prototype.render = render;
Menu.prototype._createItems = createItems;

