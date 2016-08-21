export default function () {
    this.styles({
                    'width': this.config.listSize.width,
                    'height': this.config.listSize.height,
                    'transform': 'rotate(' + this.config.rotateDeg(this.index) + 'deg) skew(' + this.config.skewDeg + 'deg)'
                });

    this.parent.appendChild(this.element);

    this.anchor.render();


}