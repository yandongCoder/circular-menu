export default function () {
    this.classed("horizontal", true);
    if(this.config.horizontal) this.styles({'transform': 'rotate('+ this.getHorizontalDeg() +'deg)'});

    this.parent.appendChild(this.element);

    this.icon.render();
    this.text.render();
}