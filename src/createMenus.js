import Menu from "./Element/Menu/index";

export default function () {
    this.config.menus.forEach(function(v, i){
        var menu = new Menu(this.element, this.config.diameter, this.config.pageBackground);
        this.menus.push(menu);
        menu.render();
    }, this);
}