import style from "./../Element/style";
import classed from "./../Element/classed";
import on from "./../Element/on";
import styleSheet from "./../Element/styleSheet";

function hasSubMenus(menus) {
    return menus instanceof Array && menus.length !== 0;
}
function ifDisabled(disabled){
    if(disabled instanceof Function)
        return disabled();
    else
        return Boolean(disabled);
}





var delayShow = null;// delayShow reference the last setTimeout triggered by any one of menu item(anchor)

export default function (parent, data, index) {
    var self = this;

    var delayHide = null;// delayHide reference the last setTimeout triggered by the menu item itself

    var a = document.createElement('a');

    setHref(a, data.href);

    a.setDisabled = function(){
        classed(a, 'disabled', ifDisabled(data.disabled));
    };
    this._anchors.push(a);


    on(a, 'click', clickCallBack, data);

    parent.appendChild(a);

    this._createHorizontal(a, data, index);
    
    
    //toggle subMenu
    if (hasSubMenus(data.menus)) {
        var subMenu = this._createSubMenu(self, data.menus, index);

        on(a, 'mouseenter', function () {
            delayShow = setTimeout(function () {
                subMenu
                    .styles({
                                top: self._container.offsetTop + self._calc.radius + 'px',
                                left: self._container.offsetLeft + self._calc.radius + 'px'
                            })
                    .show();
            }, 150);
        });

        on(a, 'mouseleave', function (e) {
            if (!subMenu._container.contains(e.toElement)) {
                delayHide = setTimeout(function () {
                    subMenu.hide();
                }, 200);
            }
        });

        on(subMenu._container, 'mouseenter', function () {
            clearTimeout(delayShow);
            clearTimeout(delayHide);
        });

        on(subMenu._container, 'mouseleave', function (e) {
            if (!a.contains(e.toElement)) {
                subMenu.hide();
            }
        });
    }
}