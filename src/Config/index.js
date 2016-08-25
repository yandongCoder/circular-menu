import getRotateDeg from './getRotateDeg';
import startDeg from './startDeg';
import {default as coverSize, coverRadius} from "./coverSize";
import menuSize from "./menuSize";
import clickZoneSize from "./clickZoneSize";
import listSize from "./listSize";
import textTop from "./textTop";
import extend from "../extend";

const DefaultConfig = {
    totalAngle: 360,//deg,
    spaceDeg: 0,//deg
    background: "#323232",
    backgroundHover: "#515151",
    pageBackground: "transparent",
    diameter: 300,//px
    position: 'top',
    horizontal: true,
    animation: "into",
    hideAfterClick: true
};




export default function Config(config) {
    config = extend(DefaultConfig, config);
    for (var k in config) {
        this[k] = config[k];
    }
    
    var itemsNum = this.menus.length,
        spaceNumber = this.totalAngle === 360 ? itemsNum : itemsNum - 1;

    this.radius = this.diameter / 2;
    this.coverRadius = coverRadius(this.radius, this.percent);
    this.clickZoneRadius = this.radius - this.coverRadius;
    
    
    this.listSize = listSize(this.diameter);
    this.clickZoneSize = clickZoneSize(this.diameter);
    this.menuSize = menuSize(this.diameter);
    this.coverSize = coverSize(this.coverRadius, this.percent);
    this.startDeg = startDeg(this.start, this.totalAngle, this.position);
    if(!this.centralDeg){
        this.centralDeg = (this.totalAngle - (this.spaceDeg * spaceNumber)) / itemsNum;
    }
    this.rotateUnit = this.centralDeg + this.spaceDeg;
    this.skewDeg = 90 - this.centralDeg;
    this.unskewDeg = -(90 - this.centralDeg / 2);
    this.textTop = textTop(this.clickZoneRadius);

    

}

Config.prototype = {
    constructor: Config,
    getRotateDeg: getRotateDeg
};