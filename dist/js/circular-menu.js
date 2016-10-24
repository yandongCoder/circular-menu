//circular-menu
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.CMenu = factory());
}(this, function () { 'use strict';

    function rotateDeg (i){
        return this.startDeg + this.rotateUnit * i;
    }

    function rotateDeg$1 (i){
        return - (this.rotateDeg(i) + this.unskewDeg);
    }

    function startDeg(config) {
        var top = -(config.totalAngle - 180) / 2,
            positions = {
                top: top,
                left: top - 90,
                right: top + 90,
                bottom: top + 180
            };

        return config.start !== undefined ? config.start : positions[config.position];
    }

    const antialiasing = 3;

    function coverRadius(radius, percent) {
        var square = radius * radius * 2;
        return Math.sqrt(square) * percent + antialiasing;
    }

    function coverSize (coverRadius) {
        var l = coverRadius * 2;
        var m = -l / 2;

        l += "px";
        m += "px";
        
        return {
            width:  l,
            height: l,
            marginLeft: m,
            marginTop: m
        };
    }

    function menuSize (config) {
        var l = config.diameter;
        var m = - config.diameter / 2;

        l += "px";
        m += "px";

        return {
            width:  l,
            height: l,
            marginLeft: m,
            marginTop: m
        };
    }

    const fixedTop  = 10;

    function clickZoneSize (config) {
        var l = config.diameter;
        var m = - config.diameter / 2;

        l += "px";
        m += "px";

        return {
            width:  l,
            height: l,
            marginRight: m,
            marginBottom: m
        };
    }

    function listSize (config) {
        var l = (config.diameter / 2) + 'px';

        return {
            width:  l,
            height: l
        };
    }

    const middleRatio = 0.41;

    function textTop (clickZoneRadius) {
        return clickZoneRadius * middleRatio - fixedTop + 'px';

    }

    function Calculation(config) {
        this._config = config;

        var c = this.config = config,
            itemsNum = c.menus.length,
            spaceNumber = c.totalAngle === 360 ? itemsNum : itemsNum - 1;

        this.radius = config.diameter / 2;
        this.coverRadius = coverRadius(this.radius, config.percent);
        this.clickZoneRadius = this.radius - this.coverRadius;



        this.listSize = listSize(config);
        this.clickZoneSize = clickZoneSize(config);
        this.menuSize = menuSize(config);
        this.coverSize = coverSize(this.coverRadius);
        this.startDeg = startDeg(config);
        this.centralDeg = (c.totalAngle - (c.spaceDeg * spaceNumber)) / itemsNum;
        this.rotateUnit = this.centralDeg + c.spaceDeg;
        this.skewDeg = 90 - this.centralDeg;
        this.unskewDeg = - (90 - this.centralDeg / 2);
        this.textTop = textTop(this.clickZoneRadius);
    }

    Calculation.prototype = {
        constructor: Calculation,
        rotateDeg: rotateDeg,
        horizontalDeg: rotateDeg$1
    };

    function createLists (parent) {
        
        this._config.menus.forEach(function(v, k){

            this._createList(parent, v, k);
            
        }, this);

    }

    function defaultView(node) {
        return (node.ownerDocument && node.ownerDocument.defaultView) // node is a Node
            || (node.document && node) // node is a Window
            || node.defaultView; // node is a Document
    }

    function styleRemove(name) {
        this.style.removeProperty(name);
    }

    function styleConstant(name, value, priority) {
        this.style.setProperty(name, value, priority);
    }

    function styleFunction(name, value, priority) {
        var v = value.apply(this, arguments);
        if (v == null) this.style.removeProperty(name);
        else this.style.setProperty(name, v, priority);
    }

    function style(ele, name, value, priority) {

        var node;
        return arguments.length > 1
            ? ((value == null
            ? styleRemove : typeof value === "function"
            ? styleFunction
            : styleConstant).call(ele, name, value, priority == null ? "" : priority))
            : defaultView(node = ele)
            .getComputedStyle(node, null)
            .getPropertyValue(name);
    }

    function createList(parent, data, index){

        var list = document.createElement('li');
        style(list, 'width', this._calc.listSize.width);
        style(list, 'height', this._calc.listSize.height);
        style(list, 'transform', 'rotate('+ this._calc.rotateDeg(index) +'deg) skew('+ this._calc.skewDeg +'deg)');

        parent.appendChild(list);

        this._createAnchor(list, data, index);

    }

    function classArray(string) {
        return string.trim().split(/^|\s+/);
    }

    function classList(node) {
        return node.classList || new ClassList(node);
    }

    function ClassList(node) {
        this._node = node;
        this._names = classArray(node.getAttribute("class") || "");
    }

    ClassList.prototype = {
        add: function(name) {
            var i = this._names.indexOf(name);
            if (i < 0) {
                this._names.push(name);
                this._node.setAttribute("class", this._names.join(" "));
            }
        },
        remove: function(name) {
            var i = this._names.indexOf(name);
            if (i >= 0) {
                this._names.splice(i, 1);
                this._node.setAttribute("class", this._names.join(" "));
            }
        },
        contains: function(name) {
            return this._names.indexOf(name) >= 0;
        }
    };

    function classedAdd(node, names) {
        var list = classList(node), i = -1, n = names.length;
        while (++i < n) list.add(names[i]);
    }

    function classedRemove(node, names) {
        var list = classList(node), i = -1, n = names.length;
        while (++i < n) list.remove(names[i]);
    }

    function classedTrue(names) {
        classedAdd(this, names);
    }

    function classedFalse(names) {
        classedRemove(this, names);
    }

    function classedFunction(names, value) {
        (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
    }

    function classed(ele, name, value) {
        var names = classArray(name + "");

        if (arguments.length < 2) {
            var list = classList(this), i = -1, n = names.length;
            while (++i < n) if (!list.contains(names[i])) return false;
            return true;
        }

        var callee = (typeof value === "function"
            ? classedFunction : value
            ? classedTrue
            : classedFalse).call(ele, names, value);
    }

    var UID = {
        _current: 0,
        getNew: function(){
            this._current++;
            return this._current;
        }
    };
    function styleSheet (element, prop, value, pseudo) {
        
        var _this = element;
        var _sheetId = "sheetStyles";
        var _head = document.head || document.getElementsByTagName('head')[0];
        var _sheet = document.getElementById(_sheetId) || document.createElement('style');
        _sheet.id = _sheetId;
        var className = "s-S" + UID.getNew();
        
        _this.className += " " + className;



        _sheet.innerHTML += " ." + className + ( pseudo ? (":" + pseudo) : "" ) + "{" + prop + ":" + value + "}";
        _head.appendChild(_sheet);
        return this;
    };

    function createMenu(){
        var p = this._container;

        classed(p, 'circular-menu', true);
        style(p, 'width', this._calc.menuSize.width);
        style(p, 'height', this._calc.menuSize.height);
        style(p, 'margin-top', this._calc.menuSize.marginTop);
        style(p, 'margin-left', this._calc.menuSize.marginLeft);

        
        setTimeout(function(){
            style(p, 'display', 'block');
        },100);

        styleSheet(p, 'width', this._calc.coverSize.width, 'after');
        styleSheet(p, 'height', this._calc.coverSize.height, 'after');
        styleSheet(p, 'margin-left', this._calc.coverSize.marginLeft, 'after');
        styleSheet(p, 'margin-top', this._calc.coverSize.marginTop, 'after');
        styleSheet(p, 'border', "3px solid " + this._config.pageBackground, 'after');


        var ul = p.appendChild(document.createElement('ul'));
        this._createLists(ul);
    }

    function on (ele, type, callback, data) {
        ele.addEventListener(type, function(e){
            callback.call(this, e, data);
        });
    }

    function hasSubMenus(menus) {
        return menus instanceof Array && menus.length !== 0;
    }
    function ifDisabled(disabled){
        if(disabled instanceof Function)
            return disabled();
        else
            return Boolean(disabled);
    }

    function setHref(ele, href){
        if(!href) return;

        if(href instanceof Object){
            ele.href = href.url;
            ele.target = href.blank? "_blank" : "";
        }else{
            ele.href = href;
        }
    }



    var delayShow = null;// delayShow reference the last setTimeout triggered by any one of menu item(anchor)

    function createAnchor (parent, data, index) {
        var self = this;

        var delayHide = null;// delayHide reference the last setTimeout triggered by the menu item itself

        var a = document.createElement('a');

        setHref(a, data.href);

        a.setDisabled = function(){
            classed(a, 'disabled', ifDisabled(data.disabled));
        };
        this._anchors.push(a);


        style(a, 'width', this._calc.clickZoneSize.width);
        style(a, 'height', this._calc.clickZoneSize.height);
        style(a, 'right', this._calc.clickZoneSize.marginRight);
        style(a, 'bottom', this._calc.clickZoneSize.marginBottom);
        style(a, 'transform', 'skew(' + -this._calc.skewDeg + 'deg) rotate(' + this._calc.unskewDeg + 'deg) scale(1)');

        classed(a, 'disabled', ifDisabled(data.disabled));


        var percent = this._config.percent * 100 + "%";
        styleSheet(a, 'background', 'radial-gradient(transparent ' + percent + ', ' + this._config.background + ' ' + percent + ')');
        styleSheet(a, 'background', 'radial-gradient(transparent ' + percent + ', ' + this._config.backgroundHover + ' ' + percent + ')', 'hover');


        function clickCallBack(e, data){
            if (data.click) data.click.call(this, e, data);

            if(self._config.hideAfterClick){
                self._cMenu.hide();
                if(self._cMenu._pMenu) self._cMenu._pMenu.hide();
                if(subMenu) subMenu.hide();
            }
        }

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
                if (!a.contains(e.toElement) || e.toElement.children[0] === a) {
                    subMenu.hide();
                }
            });
        }
    }

    const sizeRatio = 0.65;
    const marginTopRatio = 0.2;
    const fontHeight = 13;

    function hasIcon(icon){
        if(icon === undefined) return false;
        else if(typeof icon === "string") return icon !== "";
        else return icon.length && icon[0] !== "";
    }

    function getIcon(icon){
        return typeof icon === "string"? icon : icon[0];
    }

    function getIconColor(icon){
        return typeof icon === "string"? null : icon[1];
    }

    function createIcon (parent, data, index) {
        if(!hasIcon(data.icon)) return;

        var span = document.createElement('span');

        var icon = getIcon(data.icon),
            color = getIconColor(data.icon);

        classed(span, icon + " cm-icon", true);
        style(span, 'color', color);

        var l = this._calc.clickZoneRadius * sizeRatio - fontHeight + "px",
            m = this._calc.clickZoneRadius * marginTopRatio - fontHeight + "px";
        style(span, 'width', l);
        style(span, 'height', l);
        style(span, 'font-size', l);
        style(span, 'margin-top', m);

        parent.appendChild(span);
    }

    const withIconMarginTop = "3px";
    const withIconTop = "-3px";

    function createText (parent, data, index) {

        var span = document.createElement('span');
        span.textContent = data.title;

        classed(span, 'text', true);
        style(span, 'margin-top', hasIcon(data.icon)? withIconMarginTop : this._calc.textTop);
        style(span, 'top', hasIcon(data.icon)? withIconTop : 0);

        parent.appendChild(span);
    }

    function createHorizontal (parent, data, index) {

        var div = document.createElement('div');
        classed(div, "horizontal", true);

        if(this._config.horizontal) style(div, 'transform', 'rotate('+ this._calc.horizontalDeg(index) +'deg)');

        parent.appendChild(div);

        this._createIcon(div, data, index);
        this._createText(div, data, index);
    }

    function extend$1 () {
        // Variables
        var extended = {};
        var deep = false;
        var i = 0;
        var length = arguments.length;

        // Check if a deep merge
        if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') {
            deep = arguments[0];
            i++;
        }

        // Merge the object into the extended object
        var merge = function (obj) {
            for (var prop in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                    // If deep merge and property is an object, merge properties
                    if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
                        extended[prop] = extend(true, extended[prop], obj[prop]);
                    } else {
                        extended[prop] = obj[prop];
                    }
                }
            }
        };

        // Loop through each object and conduct a merge
        for (; i < length; i++) {
            var obj = arguments[i];
            merge(obj);
        }

        return extended;

    };

    const sizeRatio$1 = 5 / 3;
    const percentRatio = 0.45;
    const centralDegRatio = 0.618;


    function createSubMenu(creator, menus, index) {
        var subMenu = document.createElement('div');

        classed(subMenu, 'circular-sub-menu', true);

        this._container.parentNode.insertBefore(subMenu, this._container);

        var totalAngle = this._calc.centralDeg * centralDegRatio * menus.length;
        var startDeg = this._calc.rotateDeg(index) - totalAngle / 2 + this._calc.centralDeg / 2;

        var config = extend$1(this._config, {
            totalAngle: totalAngle,//deg,
            percent: percentRatio,//%
            diameter: this._config.diameter * sizeRatio$1,//px
            start: startDeg,//deg
            animation: "into",
            menus: menus
        });
        
        return new CMenu(subMenu, creator._cMenu)
            .config(config);
    }

    function Creator(cMenu, config){
        this._cMenu = cMenu;
        this._container = cMenu._container;
        this._config = config;
        this._calc = new Calculation(config);
        this._anchors = [];
    }


    Creator.prototype = {
        constructor: Creator,
        createMenu: createMenu,
        _createLists: createLists,
        _createList: createList,
        _createAnchor: createAnchor,
        _createText: createText,
        _createHorizontal: createHorizontal,
        _createIcon: createIcon,
        _createSubMenu: createSubMenu
    };

    const defaultConfig = {
        totalAngle: 360,//deg,
        spaceDeg: 0,//deg
        background: "#323232",
        backgroundHover: "#515151",
        pageBackground: "transparent",
        percent: 0.32,//%
        diameter: 300,//px
        position: 'top',
        horizontal: true,
        animation: "into",
        hideAfterClick: true
    };


    function config (config) {

        config = extend$1(defaultConfig, config);

        this._creator = new Creator(this, config);
        this._creator.createMenu();

        return this;
    }

    function setCoordinate(coordinate){
        if( !(coordinate instanceof Array) || !(coordinate.length === 2) ) return;

        //TODO verify if has unit
        style(this._container, 'left', coordinate[0] + "px");
        style(this._container, 'top', coordinate[1] + "px");
    }

    //check disabled

    function setDisabled(){
        this._creator._anchors.forEach(function(v){
            v.setDisabled();
        });
    }

    function show (coordinate) {


        setDisabled.call(this);

        setCoordinate.call(this, coordinate);

        classed(this._container, 'opened-nav', true);
        return this;
    }

    function hide () {
        classed(this._container, 'opened-nav', false);
        return this;
    }

    function styles (styles) {
        if(!styles instanceof Object) return this;
        
        for(var k in styles){
            if(styles.hasOwnProperty(k)) style(this._container, k, styles[k]);
        }

        return this;
    }

    function CMenu(element, pMenu){
        this._container = element;
        
        if(pMenu) this._pMenu = pMenu;
    }

    CMenu.prototype = {
        constructor: CMenu,
        config: config,
        show: show,
        hide: hide,
        styles: styles

    };

    function index (selector) {
        return typeof selector === "string"
            ? new CMenu(document.querySelector(selector))
            : new CMenu(selector);
    }

    return index;

}));
//# sourceMappingURL=circular-menu.js.map
