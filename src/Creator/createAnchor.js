import style from "./../style";
import classed from "./../classed";
import on from "./../on";
import styleSheet from "./styleSheet";
import createSubMenu from "./createSubMenu";

function hasSubMenus(menus){
    return menus instanceof Array && menus.length !== 0;
}

export default function (parent, data, index) {
    var a = document.createElement('a');
    a.href = data.href || "";

    style(a, 'width', this._calc.clickZoneSize.width);
    style(a, 'height', this._calc.clickZoneSize.height);
    style(a, 'right', this._calc.clickZoneSize.marginRight);
    style(a, 'bottom', this._calc.clickZoneSize.marginBottom);
    style(a, 'transform', 'skew('+ -this._calc.skewDeg +'deg) rotate('+ this._calc.unskewDeg +'deg) scale(1)');

    if(data.disabled) classed(a, 'disabled', true);


    var percent = this._config.percent * 100 + "%";
    styleSheet(a, 'background', 'radial-gradient(transparent '+ percent +', '+ this._config.background +' '+ percent +')');
    styleSheet(a, 'background', 'radial-gradient(transparent '+ percent +', '+ this._config.backgroundHover +' '+ percent +')', 'hover');

    
    if(data.click) on(a, 'click', data.click, data);

    parent.appendChild(a);

    this._createHorizontal(a, data, index);
    
    
    //toggle subMenu
    if(hasSubMenus(data.menus)){
        var subMenu = this._createSubMenu(data.menus, index);
        var delayHide = null;

        on(a, 'mouseenter', function(){
            subMenu.show();
        });

        on(a, 'mouseleave', function(e){
            if(!subMenu._element.contains(e.toElement)){
                delayHide = setTimeout(function(){
                    subMenu.hide();
                },200);
            }
        });


        on(subMenu._element, 'mouseenter', function(){
            clearTimeout(delayHide);
        });

        on(subMenu._element, 'mouseleave', function(e){
            if(!a.contains(e.toElement)){
                subMenu.hide();
            }
        });
    }
}