import Menu from "./Element/Menu/index";
import Config from "./Config/index";

export default function createMenus() {
    createMenu.call(this, this.config.menus, -1);
}

function createMenu(menus, level) {

    ++level;

    menus.forEach(function (v, i) {
        v.menuLevel = level;
        if (v.menus) {
            createMenu.call(this, v.menus, level);
        }
    }, this);
}