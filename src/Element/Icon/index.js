import Element from "../index";
import render from "./render";
import hasIcon from "./hasIcon";
import getIcon from "./getIcon";
import getIconColor from "./getIconColor";

export default function Icon(parent, config, menu) {
    this.parent = parent;
    this.menu = menu;
    this.config = config;
    this.element = document.createElement('span');
}

Icon.prototype = Object.create(Element.prototype);
Icon.prototype.constructor = Icon;
Icon.prototype.render = render;
Icon.prototype.hasIcon = hasIcon;
Icon.prototype.getIcon = getIcon;
Icon.prototype.getIconColor = getIconColor;