import config from "./config";
import show from "./show";
import hide from "./hide";
import createMenus from "./createMenus";
import Element from "./Element/index";

export default function CMenu(element, config){//pMenu
    this.element = element;
    this.menus = [];
    this.config = config;

    this._createMenus();
}


CMenu.prototype = Object.create(Element.prototype);
CMenu.prototype.constructor = CMenu;
CMenu.prototype._createMenus = createMenus;
CMenu.prototype.show = show;
CMenu.prototype.hide = hide;
//CMenu.prototype.config = config;