export default function () {
    this.element = document.createElement('li');

    this.styles({
                    'width': this.config.listSize.width,
                    'height': this.config.listSize.height,
                    'transform': 'rotate(' + this.config.rotateDeg(this.index) + 'deg) skew(' + this.config.skewDeg + 'deg)'
                });
    // style(list, 'width', this._calc.listSize.width);
    // style(list, 'height', this._calc.listSize.height);
    // style(list, 'transform', 'rotate('+ this._calc.rotateDeg(index) +'deg) skew('+ this._calc.skewDeg +'deg)');
    
    this.parent.appendChild(this.element);
}