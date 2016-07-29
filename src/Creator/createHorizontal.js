import style from "./style";

export default function (parent, data, index) {

    var div = document.createElement('div');
    
    if(this._config.horizontal) style(div, 'transform', 'rotate('+ this._calc.horizontalDeg(index) +'deg)');

    parent.appendChild(div);

    this._createIcon(div, data, index);
    this._createText(div, data, index);
}