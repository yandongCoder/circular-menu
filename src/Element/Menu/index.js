import Element from "../index";
import render from "./render";

const sizeRatio = [1, 5/3, 25/9];
//const percent = [0.32, 0.45, 0.45];
//const centralDegRatio = [1, 0.618, 0.618];

export default function Menu(parent, config, menus, level) {
    this.parent = parent;

    var diameter = config.diameter * sizeRatio[level];
    this.width = this.height = diameter + "px";
    this.marginLeft = this.marginTop = diameter / 2 + "px";
    this.pageBackground = config.pageBackground;

    this.items = [];
    this._createItems();

}

Menu.prototype = Element.prototype;

Menu.prototype.constructor = Menu;
Menu.prototype.render = render;

