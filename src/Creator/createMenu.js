import classed from "./../classed";
import style from "./../style";
import styleSheet from "./styleSheet";

export default function(){
    var p = this._container;

    classed(p, 'cn-wrapper', true);
    style(p, 'width', this._calc.menuSize.width);
    style(p, 'height', this._calc.menuSize.height);
    style(p, 'margin-top', this._calc.menuSize.marginTop);
    style(p, 'margin-left', this._calc.menuSize.marginLeft);

    styleSheet(p, 'width', this._calc.coverSize.width, 'after');
    styleSheet(p, 'height', this._calc.coverSize.height, 'after');
    styleSheet(p, 'margin-left', this._calc.coverSize.marginLeft, 'after');
    styleSheet(p, 'margin-top', this._calc.coverSize.marginTop, 'after');
    styleSheet(p, 'border', "3px solid " + this._config.pageBackground, 'after');


    var ul = p.appendChild(document.createElement('ul'));
    this._createLists(ul);
}