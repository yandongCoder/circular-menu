export default function () {
    this.classed("horizontal", true);
    if(this.config.horizontal) this.styles({'transform': 'rotate('+ this.config.horizontalDeg(this.index) +'deg)'});

    this.parent.appendChild(this.element);
}