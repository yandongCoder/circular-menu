import rotateDeg from './rotateDeg';
import horizontalDeg from './horizontalDeg';
import startDeg from './startDeg';
import {default as coverSize, coverRadius} from "./coverSize";
import menuSize from "./menuSize";
import clickZoneSize from "./clickZoneSize";
import listSize from "./listSize";
import textTop from "./textTop";

export default function Calculation(config) {
    this._config = config;

    var c = this.config = config,
        itemsNum = c.menus.length,
        spaceNumber = c.totalAngle === 360 ? itemsNum : itemsNum - 1;

    this.radius = config.diameter / 2;
    this.coverRadius = coverRadius(this.radius, config.percent);
    this.clickZoneRadius = this.radius - this.coverRadius;



    this.listSize = listSize(config);
    this.clickZoneSize = clickZoneSize(config);
    this.menuSize = menuSize(config);
    this.coverSize = coverSize(this.coverRadius);
    this.startDeg = startDeg(config);
    this.centralDeg = (c.totalAngle - (c.spaceDeg * spaceNumber)) / itemsNum;
    this.rotateUnit = this.centralDeg + c.spaceDeg;
    this.skewDeg = 90 - this.centralDeg;
    this.unskewDeg = - (90 - this.centralDeg / 2);
    this.textTop = textTop(this.clickZoneRadius);
}

Calculation.prototype = {
    constructor: Calculation,
    rotateDeg: rotateDeg,
    horizontalDeg: horizontalDeg
};