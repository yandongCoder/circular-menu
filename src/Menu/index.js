import render from "./render";

export default function Menu(parent, diameter) {
    this.parent = parent;
    this.width = this.height = diameter;
    this.marginLeft = this.marginTop = diameter / 2;
}

Menu.prototype = {
    constructor: Menu,
    render: render
};
