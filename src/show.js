import classed from "./classed";
import style from "./style";

function setCoordinate(coordinate){
    if( !(coordinate instanceof Array) || !(coordinate.length === 2) ) return;

    //TODO verify if has unit
    style(this._container, 'left', coordinate[0] + "px");
    style(this._container, 'top', coordinate[1] + "px");
}

export default function (coordinate) {

    setCoordinate.call(this, coordinate);

    classed(this._container, 'opened-nav', true);
    return this;
}