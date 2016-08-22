import Element from "../index";
import render from "./render";
import Icon from "../Icon/index";
import Text from "../Text/index";


export default function Horizontal(parent, config, menu, index) {
    this.parent = parent;
    this.config = config;
    this.menu = menu;
    this.index = index;

    this.element = document.createElement('div');
    
    this.icon = new Icon(this.element, config, menu);

    this.text = new Text(this.element, config, menu, this.icon);
}

Horizontal.prototype = Object.create(Element.prototype);
Horizontal.prototype.constructor = Horizontal;
Horizontal.prototype.render = render;