import config from "./config";
import show from "./show";
import hide from "./hide";
import styles from "./Element/styles";
import _createMenus from "./createMenus";
import extend from "./extend";


const DefaultConfig = {
    totalAngle: 360,//deg,
    spaceDeg: 0,//deg
    background: "#323232",
    backgroundHover: "#515151",
    pageBackground: "transparent",
    percent: 0.32,//%
    diameter: 300,//px
    position: 'top',
    horizontal: true,
    animation: "into",
    hideAfterClick: true
};

export default function CMenu(element, config){//pMenu
    this.element = element;
    this.menus = [];

    this.config = extend(DefaultConfig, config);


    this._createMenus();
}

CMenu.prototype = {
    constructor: CMenu,
    _createMenus: _createMenus,
    config: config,//get,set config
    show: show,
    hide: hide,
    styles: styles

};