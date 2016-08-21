import config from "./config";
import show from "./show";
import hide from "./hide";
import styles from "./Element/styles";
import createMenus from "./createMenus";

export default function CMenu(element, config){//pMenu
    this.element = element;
    this.menus = [];
    this.config = config;

    this._createMenus();
}

CMenu.prototype = {
    constructor: CMenu,
    _createMenus: createMenus,
    //config: config,//get,set config
    show: show,
    hide: hide,
    styles: styles

};