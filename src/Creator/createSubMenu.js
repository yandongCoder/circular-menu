import classed from "./../classed";
import CMenu from "../CMenu";
const sizeRatio = 5/3;
const percentRatio = 0.45;
const centralDegRatio = 0.618;


export default function createSubMenu (creator, menus, index) {
    var subMenu = document.createElement('div');

    classed(subMenu, 'circular-sub-menu', true);

    this._container.parentNode.insertBefore(subMenu, this._container);

    var totalAngle = this._calc.centralDeg * centralDegRatio * menus.length;
    var startDeg = this._calc.rotateDeg(index) - totalAngle / 2 + this._calc.centralDeg / 2;

    return  new CMenu(subMenu, creator._cMenu)
        .config({
                    totalAngle: totalAngle,//deg,
                    spaceDeg: this._config.spaceDeg,//deg
                    percent: percentRatio,//%
                    diameter: this._config.diameter * sizeRatio,//px
                    horizontal: this._config.horizontal,
                    start: startDeg,//deg
                    animation: "into",
                    menus: menus
                });
}
