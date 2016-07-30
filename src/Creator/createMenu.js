import classed from "./classed";
import style from "./style";
import pseudoStyle from "./pseudoStyle";

export default function(){
    var p = this._parent;

    classed(p, 'cn-wrapper opened-nav', true);
    style(p, 'width', this._calc.menuSize.width);
    style(p, 'height', this._calc.menuSize.height);
    style(p, 'margin-top', this._calc.menuSize.marginTop);
    style(p, 'margin-left', this._calc.menuSize.marginLeft);

    pseudoStyle(p, 'after', 'width', this._calc.coverSize.width);
    pseudoStyle(p, 'after', 'height', this._calc.coverSize.height);
    pseudoStyle(p, 'after', 'margin-left', this._calc.coverSize.marginLeft);
    pseudoStyle(p, 'after', 'margin-top', this._calc.coverSize.marginTop);
    pseudoStyle(p, 'after', 'border', "3px solid " + this._config.pageBackground);

    var ul = p.appendChild(document.createElement('ul'));
    this._createLists(ul);
}