import classed from "./classed";
import style from "./style";

function setCoordinate(coordinate){
    if( !(coordinate instanceof Array) || !(coordinate.length === 2) ) return;

    //TODO verify if has unit
    style(this._container, 'left', coordinate[0] + "px");
    style(this._container, 'top', coordinate[1] + "px");
}

//check disabled

function setDisabled(){
    this._creator._anchors.forEach(function(v){
        v.setDisabled();
    });
}

export default function (coordinate) {


    setDisabled.call(this);

    setCoordinate.call(this, coordinate);

    classed(this._container, 'opened-nav', true);
    return this;
}