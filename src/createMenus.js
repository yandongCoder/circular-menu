import Menu from "./Element/Menu/index";

export default function () {

    createMenu.call(this, this.config.menus, 0);

}

function createMenu(menus, level) {

    var menu = new Menu(this.element, this.config, menus, level);
    menu.render();

    this.menus.push(menu);

    ++level;
    
    menus.forEach(function (v, i) {
        if (v.menus) {
            createMenu.call(this, v.menus, level);
        }
    }, this);
}