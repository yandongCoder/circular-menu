export default function () {
    this.setHref(this.menu.href);
    this.setCallBack();

    this.styles({
                   "width": this.config.clickZoneSize.width,
                   "height": this.config.clickZoneSize.height,
                   "right": this.config.clickZoneSize.marginRight,
                   "bottom": this.config.clickZoneSize.marginBottom,
                   "transform": 'skew(' + -this.config.skewDeg + 'deg) rotate(' + this.config.unskewDeg + 'deg) scale(1)'
               });

    this.classed('disabled', this.getDisabled());

    var percent = this.config.percent * 100 + "%";
    this.styleSheet(this.element, 'background', 'radial-gradient(transparent ' + percent + ', ' + this.config.background + ' ' + percent + ')');
    this.styleSheet(this.element, 'background', 'radial-gradient(transparent ' + percent + ', ' + this.config.backgroundHover + ' ' + percent + ')', 'hover');



    this.parent.appendChild(this.element);

    this.horizontal.render();
}