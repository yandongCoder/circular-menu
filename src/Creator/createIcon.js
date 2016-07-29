import style from "./style";
import classed from "./classed";

export function hasIcon(icon){
    return icon !== "";
}

export default function (parent, data, index) {
    if(!hasIcon(data.icon)) return;

    var span = document.createElement('span');

    classed(span, data.icon, true);
    //style(span, 'margin-top', this._calc.textTop);

    parent.appendChild(span);
}