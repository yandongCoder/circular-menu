import Element from "../index";
import Menu from "../../Element/Menu/index";
import Config from "../../Config/index";
import render from "./render";
import setHref from "./setHerf";
import getDisabled from "./getDisabled";
import setCallBack from "./setCallBack";
import Horizontal from "../Horizontal/index";
import hasSubMenus from "./hasSubMenus";
import extend from "../../extend";


var delayShow = null;// delayShow reference the last setTimeout triggered by any one of menu item(anchor)
const centralDegRatio = [1, 0.618, 0.618];
const sizeRatio = [1, 5/3, 25/9];
const percents = [0.32, 0.45, 0.45];

export default function Anchor(parent, config, menu, index, menuInstance) {
    this.parent = parent;
    this.config = config;
    this.element = document.createElement('a');
    this.menu = menu;
    this.horizontal = new Horizontal(this.element, config, menu, index);

    var self = this;

    if(this.hasSubMenus()){

        var totalAngle = this.config.centralDeg * centralDegRatio[menu.menuLevel] * menu.menus.length;
        var startDeg = this.config.getRotateDeg(index) - this.config.totalAngle / 2 + this.config.centralDeg / 2;

        var subConfig = extend(this.config, {
            totalAngle: totalAngle,//deg,
            percent: percents[menu.menuLevel],//%
            diameter: this.config.diameter * sizeRatio[menu.menuLevel],//px
            start: startDeg,//deg
            animation: "into",
            menus: menu.menus
        });

        this.subMenu = new Menu(config.container, new Config(subConfig), menu.menus, menuInstance);

        this.on('mouseenter', function () {
            delayShow = setTimeout(function () {
                self.subMenu
                    .styles({
                                top: menuInstance.element.offsetTop + menuInstance.config.radius + 'px',
                                left: menuInstance.element.offsetLeft + menuInstance.config.radius + 'px'
                            })
                    .show();
            }, 150);
        });

        // on(a, 'mouseleave', function (e) {
        //     if (!subMenu._container.contains(e.toElement)) {
        //         delayHide = setTimeout(function () {
        //             subMenu.hide();
        //         }, 200);
        //     }
        // });
        //
        // on(subMenu._container, 'mouseenter', function () {
        //     clearTimeout(delayShow);
        //     clearTimeout(delayHide);
        // });
        //
        // on(subMenu._container, 'mouseleave', function (e) {
        //     if (!a.contains(e.toElement)) {
        //         subMenu.hide();
        //     }
        // });
    }

}

Anchor.prototype = Object.create(Element.prototype);
Anchor.prototype.constructor = Anchor;
Anchor.prototype.render = render;
Anchor.prototype.setHref = setHref;
Anchor.prototype.getDisabled = getDisabled;
Anchor.prototype.setCallBack = setCallBack;
Anchor.prototype.hasSubMenus = hasSubMenus;