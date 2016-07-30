import style from "./style";
import classed from "./classed";
import {hasIcon} from "./createIcon";

const withIconTop = "3px";

export default function (parent, data, index) {

    var span = document.createElement('span');
    span.textContent = data.title;

    classed(span, 'text', true);
    style(span, 'margin-top', hasIcon(data.icon)? withIconTop : this._calc.textTop);

    parent.appendChild(span);
}