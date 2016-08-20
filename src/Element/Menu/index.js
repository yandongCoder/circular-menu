import Element from "../index";
import render from "./render";

export default function Menu(parent, diameter, pageBackground) {
    this.parent = parent;
    this.width = this.height = diameter + "px";
    this.marginLeft = this.marginTop = diameter / 2 + "px";
    this.pageBackground = pageBackground;
}


Menu.prototype = Element.prototype;

Menu.prototype.constructor = Menu;
Menu.prototype.render = render;
