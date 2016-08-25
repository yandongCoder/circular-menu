import config from "./config";
import Menu from "./Element/Menu/index";
import Config from "./Config/index";
import show from "./show";
import hide from "./hide";
import Element from "./Element/index";
import markMenuLevel from "./markMenuLevel";

export default function CMenu(element, config){//pMenu
    this.element = element;
    config.container = element;
    this.config = config;

    this._markMenuLevel();
    this.menu = new Menu(this.element, new Config(this.config), config.menus);
    this.menu.render();
}


CMenu.prototype = Object.create(Element.prototype);
CMenu.prototype.constructor = CMenu;
CMenu.prototype.show = show;
CMenu.prototype.hide = hide;
CMenu.prototype._markMenuLevel = markMenuLevel;
//CMenu.prototype.config = config;