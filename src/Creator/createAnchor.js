import style from "./style";

export default function (parent, data, index) {
    var a = document.createElement('a');
    a.href = data.href;

    style(a, 'width', this._calc.clickZoneSize.width);
    style(a, 'height', this._calc.clickZoneSize.height);
    style(a, 'right', this._calc.clickZoneSize.marginRight);
    style(a, 'bottom', this._calc.clickZoneSize.marginBottom);
    style(a, 'transform', 'skew('+ -this._calc.skewDeg +'deg) rotate('+ this._calc.unskewDeg +'deg) scale(1)');
    //radial-gradient(transparent $percent * 100%, #515151 $percent * 100%);

    var percent = this._config.percent * 100 + "%";
    style(a, 'background', 'radial-gradient(transparent '+ percent +', '+ this._config.background +' '+ percent +')');

    parent.appendChild(a);

    this._createHorizontal(a, data, index);
}