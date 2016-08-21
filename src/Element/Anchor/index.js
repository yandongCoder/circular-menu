import Element from "../index";
import render from "./render";
import setHref from "./setHerf";
import getDisabled from "./getDisabled";


export default function Anchor(parent, config, menu) {
    this.parent = parent;
    this.config = config;
    this.element = document.createElement('a');
    this.menu = menu;

}

Anchor.prototype = Object.create(Element.prototype);
Anchor.prototype.constructor = Anchor;
Anchor.prototype.render = render;
Anchor.prototype.setHref = setHref;
Anchor.prototype.getDisabled = getDisabled;