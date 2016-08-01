import style from "./../style";
import classed from "./../classed";
import {hasIcon} from "./createIcon";

const withIconMarginTop = "3px";
const withIconTop = "-3px";

export default function (parent, data, index) {

    var span = document.createElement('span');
    span.textContent = data.title;

    classed(span, 'text', true);
    style(span, 'margin-top', hasIcon(data.icon)? withIconMarginTop : this._calc.textTop);
    style(span, 'top', hasIcon(data.icon)? withIconTop : 0);

    parent.appendChild(span);
}