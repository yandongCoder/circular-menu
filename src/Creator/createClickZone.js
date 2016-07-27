import style from "./style";

export default function (parent, data, index) {
    var a = document.createElement('a');
    a.href = data.href;

    style(a, 'width', this._calc.clickZoneSize.width);
    style(a, 'height', this._calc.clickZoneSize.height);
    style(a, 'right', this._calc.clickZoneSize.marginRight);
    style(a, 'bottom', this._calc.clickZoneSize.marginBottom);
    style(a, 'transform', 'skew('+ -this._calc.skewDeg +'deg) rotate('+ this._calc.unskewDeg +'deg) scale(1)');

    parent.appendChild(a);

    this._createHorizontal(a, data, index);
}