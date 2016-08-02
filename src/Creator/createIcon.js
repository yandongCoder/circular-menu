import style from "./../style";
import classed from "./../classed";

const sizeRatio = 0.65;
const marginTopRatio = 0.2;
const fontHeight = 13;

export function hasIcon(icon){
    if(icon === undefined) return false;
    else if(typeof icon === "string") return icon !== "";
    else return icon.length && icon[0] !== "";
}

function getIcon(icon){
    return typeof icon === "string"? icon : icon[0];
}

function getIconColor(icon){
    return typeof icon === "string"? null : icon[1];
}

export default function (parent, data, index) {
    if(!hasIcon(data.icon)) return;

    var span = document.createElement('span');

    var icon = getIcon(data.icon),
        color = getIconColor(data.icon);

    classed(span, icon + " cm-icon", true);
    style(span, 'color', color);

    var l = this._calc.clickZoneRadius * sizeRatio - fontHeight + "px",
        m = this._calc.clickZoneRadius * marginTopRatio - fontHeight + "px";
    style(span, 'width', l);
    style(span, 'height', l);
    style(span, 'font-size', l);
    style(span, 'margin-top', m);

    parent.appendChild(span);
}