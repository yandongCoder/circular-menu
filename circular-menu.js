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
    function pseudoStyle (element, pseudo, prop, value) {
        
        var _this = element;
        var _sheetId = "pseudoStyles";
        var _head = document.head || document.getElementsByTagName('head')[0];
        var _sheet = document.getElementById(_sheetId) || document.createElement('style');
        _sheet.id = _sheetId;
        var className = "pseudoStyle" + UID.getNew();
        
        _this.className += " " + className;
        
        _sheet.innerHTML += " ." + className + ":" + pseudo + "{" + prop + ":" + value + "}";
        _head.appendChild(_sheet);
        return this;
    };

    function createMenu(){
        var p = this._parent;

        classed(p, 'cn-wrapper opened-nav', true);
        style(p, 'width', this._calc.menuSize.width);
        style(p, 'height', this._calc.menuSize.height);
        style(p, 'margin-top', this._calc.menuSize.marginTop);
        style(p, 'margin-left', this._calc.menuSize.marginLeft);

        pseudoStyle(p, 'after', 'width', this._calc.coverSize.width);
        pseudoStyle(p, 'after', 'height', this._calc.coverSize.height);
        pseudoStyle(p, 'after', 'margin-left', this._calc.coverSize.marginLeft);
        pseudoStyle(p, 'after', 'margin-top', this._calc.coverSize.marginTop);
        pseudoStyle(p, 'after', 'border', "3px solid " + this._config.pageBackground);

        var ul = p.appendChild(document.createElement('ul'));
        this._createLists(ul);
    }

    function createAnchor (parent, data, index) {
        var a = document.createElement('a');
        a.href = data.href;

        style(a, 'width', this._calc.clickZoneSize.width);
        style(a, 'height', this._calc.clickZoneSize.height);
        style(a, 'right', this._calc.clickZoneSize.marginRight);
        style(a, 'bottom', this._calc.clickZoneSize.marginBottom);
        style(a, 'transform', 'skew('+ -this._calc.skewDeg +'deg) rotate('+ this._calc.unskewDeg +'deg) scale(1)');
        //radial-gradient(transparent $percent * 100%, #515151 $percent * 100%);

        var percent = this._config.percent * 100 + "%";
        style(a, 'background', 'radial-gradient(transparent '+ percent +', '+ this._config.background +' '+ percent +')');

        parent.appendChild(a);

        this._createHorizontal(a, data, index);
    }

    const sizeRatio = 0.65;
    const marginTopRatio = 0.25;
    const fontHeight = 13;

    function hasIcon(icon){
        if(typeof icon === "string") return icon !== "";
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

        classed(span, icon, true);
        style(span, 'color', color);

        var l = this._calc.clickZoneRadius * sizeRatio - fontHeight + "px",
            m = this._calc.clickZoneRadius * marginTopRatio - fontHeight + "px";
        style(span, 'width', l);
        style(span, 'height', l);
        style(span, 'font-size', l);
        style(span, 'margin-top', m);

        parent.appendChild(span);
    }

    const withIconTop = "3px";

    function createText (parent, data, index) {

        var span = document.createElement('span');
        span.textContent = data.title;

        classed(span, 'text', true);
        style(span, 'margin-top', hasIcon(data.icon)? withIconTop : this._calc.textTop);

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

    function Creator(parent, config){
        this._parent = parent;
        this._config = config;
        this._calc = new Calculation(config);
    }


    Creator.prototype = {
        constructor: Creator,
        createMenu: createMenu,
        _createLists: createLists,
        _createList: createList,
        _createAnchor: createAnchor,
        _createText: createText,
        _createHorizontal: createHorizontal,
        _createIcon: createIcon
    };

    function config (config) {
        this._config = config;

        var _creator =  new Creator(this._element, config);
        _creator.createMenu();

        return this;
    }

    function CMenu(element){
        this._element = element;
    }

    CMenu.prototype = {
        constructor: CMenu,
        config: config

    };

    function index (selector) {
        return typeof selector === "string"
            ? new CMenu(document.querySelector(selector))
            : new CMenu(selector);
    }

    return index;

}));
//# sourceMappingURL=circular-menu.js.map
