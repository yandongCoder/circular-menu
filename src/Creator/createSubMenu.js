import style from "./../style";
import classed from "./../classed";

const sizeRatio = 5/3;
const percentRatio = 0.45;
const centralDegRatio = 0.618;


export default function createSubMenu (menus, index) {
    var subMenu = document.createElement('div');

    classed(subMenu, 'sub-menu', true);

    this._container.parentNode.insertBefore(subMenu, this._container);

    var totalAngle = this._calc.centralDeg * centralDegRatio * menus.length;
    var startDeg = this._calc.rotateDeg(index) - totalAngle / 2 + this._calc.centralDeg / 2;


    return CMenu(subMenu)
        .config({
                    totalAngle: totalAngle,//deg,
                    spaceDeg: 0,//deg
                    background: "#323232",
                    backgroundHover: "#123321",
                    pageBackground: "#52be7f",
                    percent: percentRatio,//%
                    diameter: this._config.diameter * sizeRatio,//px
                    horizontal: this._config.horizontal,
                    start: startDeg,//deg
                    animation: "into",
                    menus: menus
                });
}
