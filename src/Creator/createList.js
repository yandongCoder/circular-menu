import style from "./../style";


export default function(parent, data, index){

    var list = document.createElement('li');
    style(list, 'width', this._calc.listSize.width);
    style(list, 'height', this._calc.listSize.height);
    style(list, 'transform', 'rotate('+ this._calc.rotateDeg(index) +'deg) skew('+ this._calc.skewDeg +'deg)');

    parent.appendChild(list);

    this._createAnchor(list, data, index);

}