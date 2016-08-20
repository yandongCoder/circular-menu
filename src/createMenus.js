import Menu from "./Menu/index";

export default function () {
    this.config.menus.forEach(function(v, i){
        var menu = new Menu(this.element, this.config.diameter);
        this.menus.push(menu);
        menu.render();
    }, this);
}