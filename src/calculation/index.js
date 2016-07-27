import rotateDeg from './rotateDeg';
import horizontalDeg from './horizontalDeg';
import startDeg from './startDeg';
import coverSize from "./coverSize";
import menuSize from "./menuSize";
import clickZoneSize from "./clickZoneSize";
import listSize from "./listSize";
import textTop from "./textTop";


export default function Calculation(config) {
    this._config = config;

    var c = this.config = config,
        itemsNum = c.menus.length,
        spaceNumber = c.totalAngle === 360 ? itemsNum : itemsNum - 1;
    // $background: #52be7f;
    // $percent: 0.32;
    // $items : 7;// item number;
    // $total-angle: 360deg; //sum angle of all items, < 360 semi-circle, = 360 complete-circle
    // $space: 0deg; // space between items
    // $diameter: 400px;//complete circle radius
    // $space-number: if($total-angle == 360deg, $items, $items - 1);
    // $central-angle: ($total-angle - ($space * $space-number )) / $items;// - ($space * ($items - 1) ) //central angle of each item, it must < 90 deg
    // $rotate: $central-angle + $space;
    // $skew: 90deg - $central-angle;
    //
    // $unskew: - (90deg - $central-angle / 2);
    // $top: - ( ($total-angle - 180deg) / 2); // - ( ($total-angle + ($items - 1) * $space - 180deg) / 2);
    // $left: $top - 90deg;
    // $right: $top + 90deg;
    // $bottom: $top + 180deg;
    // $start: $top;
    // $text-top: $diameter / 2 * $percent / 2 + 5px;
    // $time: 0.3s;


    this.listSize = listSize(config);
    this.clickZoneSize = clickZoneSize(config);
    this.menuSize = menuSize(config);
    this.coverSize = coverSize(config);
    this.startDeg = startDeg(config);
    this.centralDeg = (c.totalAngle - (c.spaceDeg * spaceNumber)) / itemsNum;
    this.rotateUnit = this.centralDeg + c.spaceDeg;
    this.skewDeg = 90 - this.centralDeg;
    this.unskewDeg = - (90 - this.centralDeg / 2);
    this.textTop = textTop(config);
}

Calculation.prototype = {
    constructor: Calculation,
    rotateDeg: rotateDeg,
    horizontalDeg: horizontalDeg
};