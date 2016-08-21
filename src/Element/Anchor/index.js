import Element from "../index";
import render from "./render";
import setHref from "./setHerf";
import getDisabled from "./getDisabled";
import setCallBack from "./setCallBack";
import Horizontal from "../Horizontal/index";


export default function Anchor(parent, config, menu, index) {
    this.parent = parent;
    this.config = config;
    this.element = document.createElement('a');
    this.menu = menu;
    this.horizontal = new Horizontal(this.element, config, menu, index);

}

Anchor.prototype = Object.create(Element.prototype);
Anchor.prototype.constructor = Anchor;
Anchor.prototype.render = render;
Anchor.prototype.setHref = setHref;
Anchor.prototype.getDisabled = getDisabled;
Anchor.prototype.setCallBack = setCallBack;