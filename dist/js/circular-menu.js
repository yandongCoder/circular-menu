//circular-menu
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.CMenu = factory());
}(this, function () { 'use strict';

    function getRotateDeg (i) {
        var rotateDeg = this.startDeg + this.rotateUnit * i;
        if(this.level === 0) return rotateDeg;
        else return rotateDeg - this.totalAngle / 2 + this.centralDeg / 2;
    }

    function startDeg(start, totalAngle, position) {
        var top = -(totalAngle - 180) / 2,
            positions = {
                top: top,
                left: top - 90,
                right: top + 90,
                bottom: top + 180
            };

        return start !== undefined ? start : positions[position];
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

    function menuSize (diameter) {
        var l = diameter;
        var m = - diameter / 2;

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

    function clickZoneSize (diameter) {
        var l = diameter;
        var m = - diameter / 2;

        l += "px";
        m += "px";

        return {
            width:  l,
            height: l,
            marginRight: m,
            marginBottom: m
        };
    }

    function listSize (diameter) {
        var l = (diameter / 2) + 'px';

        return {
            width:  l,
            height: l
        };
    }

    const middleRatio = 0.41;

    function textTop (clickZoneRadius) {
        return clickZoneRadius * middleRatio - fixedTop + 'px';

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

    const DefaultConfig = {
        totalAngle: 360,//deg,
        spaceDeg: 0,//deg
        background: "#323232",
        backgroundHover: "#515151",
        pageBackground: "transparent",
        diameter: 300,//px
        position: 'top',
        horizontal: true,
        animation: "into",
        hideAfterClick: true
    };

    const sizeRatio = [1, 5/3, 25/9];
    const percents = [0.32, 0.45, 0.45];
    const centralDegRatio = [1, 0.618, 0.618];


    function Config(config, level) {
        this.level = level;

        config = extend$1(DefaultConfig, config);
        for (var k in config) {
            this[k] = config[k];
        }

        this.diameter = this.diameter * sizeRatio[level];
        this.percent = percents[level];


        
        var itemsNum = this.menus.length,
            spaceNumber = this.totalAngle === 360 ? itemsNum : itemsNum - 1;
        
        this.radius = this.diameter / 2;
        this.coverRadius = coverRadius(this.radius, this.percent);
        this.clickZoneRadius = this.radius - this.coverRadius;
        
        
        this.listSize = listSize(this.diameter);
        this.clickZoneSize = clickZoneSize(this.diameter);
        this.menuSize = menuSize(this.diameter);
        this.coverSize = coverSize(this.coverRadius, this.percent);
        this.startDeg = startDeg(this.start, this.totalAngle, this.position);
        this.centralDeg = (this.totalAngle - (this.spaceDeg * spaceNumber)) / itemsNum;
        this.rotateUnit = this.centralDeg + this.spaceDeg;
        this.skewDeg = 90 - this.centralDeg;
        this.unskewDeg = -(90 - this.centralDeg / 2);
        this.textTop = textTop(this.clickZoneRadius);

        if(level > 0){
            this.totalAngle = this.centralDeg * centralDegRatio[level] * this.menus.length;
            //this.startDeg = this._calc.rotateDeg(index) - totalAngle / 2 + this._calc.centralDeg / 2;
        }
    }

    Config.prototype = {
        constructor: Config,
        getRotateDeg: getRotateDeg
    };

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

    function classed(name, value, ele) {

        var names = classArray(name + "");

        if (arguments.length < 2) {
            var list = classList(this), i = -1, n = names.length;
            while (++i < n) if (!list.contains(names[i])) return false;
            return true;
        }

        var callee = (typeof value === "function"
            ? classedFunction : value
            ? classedTrue
            : classedFalse).call(ele || this.element, names, value);
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

    function on (type, callback, data) {
        this.element.addEventListener(type, function(e){
            callback.call(this, e, data);
        });
    }

    function setCoordinate(coordinate){
        if( !(coordinate instanceof Array) || !(coordinate.length === 2) ) return;

        //TODO verify if has unit
        style(this._container, 'left', coordinate[0] + "px");
        style(this._container, 'top', coordinate[1] + "px");
    }

    //check disabled

    // function setDisabled(){
    //     this._creator._anchors.forEach(function(v){
    //         v.setDisabled();
    //     });
    // }

    function show (coordinate) {


        //setDisabled.call(this);

        setCoordinate.call(this, coordinate);

        this.menus[0].show();

        return this;
    }

    function hide () {
        classed(this._container, 'opened-nav', false);
        return this;
    }

    function styles (styles) {
        if(!styles instanceof Object) return this;
        
        for(var k in styles){
            if(styles.hasOwnProperty(k)) style(this.element, k, styles[k]);
        }

        return this;
    }

    function styleSheets (styles, pseudo) {
        if(!styles instanceof Object) return this;
        
        for(var k in styles){
            if(styles.hasOwnProperty(k)) styleSheet(this.element, k, styles[k], pseudo);
        }

        return this;
    }

    function appendFirst(parent, element){
        if(parent.firstChild) parent.insertBefore(element, parent.firstChild);
        else parent.appendChild(element);
    }

    function Element() {
        
    }

    Element.prototype = {
        constructor: Element,
        styles: styles,
        styleSheet: styleSheet,
        styleSheets: styleSheets,
        classed: classed,
        appendFirst: appendFirst,
        on: on
    };

    function render () {
        

        this.classed('circular-menu', true);

        this.styles({
                        "width": this.config.menuSize.width,
                        "height": this.config.menuSize.height,
                        "margin-top": this.config.menuSize.marginTop,
                        "margin-left": this.config.menuSize.marginLeft
                    });
        

        var self = this;

        setTimeout(function () {
            self.styles({'display': 'block'});
        }, 100);

        this.styleSheets({
                             'width': this.config.coverSize.width,
                             'height': this.config.coverSize.height,
                             'margin-left': this.config.coverSize.marginLeft,
                             'margin-top': this.config.coverSize.marginTop,
                             'border': '3px solid ' + this.config.pageBackground
                         }, 'after');


        this.appendFirst(this.parent, this.element);

        this._createItems();

    }

    function render$1 () {
        this.styles({
                        'width': this.config.listSize.width,
                        'height': this.config.listSize.height,
                        'transform': 'rotate(' + this.config.getRotateDeg(this.index) + 'deg) skew(' + this.config.skewDeg + 'deg)'
                    });

        this.parent.appendChild(this.element);

        this.anchor.render();


    }

    function render$2 () {
        this.setHref(this.menu.href);
        this.setCallBack();

        this.styles({
                       "width": this.config.clickZoneSize.width,
                       "height": this.config.clickZoneSize.height,
                       "right": this.config.clickZoneSize.marginRight,
                       "bottom": this.config.clickZoneSize.marginBottom,
                       "transform": 'skew(' + -this.config.skewDeg + 'deg) rotate(' + this.config.unskewDeg + 'deg) scale(1)'
                   });

        this.classed('disabled', this.getDisabled());

        var percent = this.config.percent * 100 + "%";
        this.styleSheet(this.element, 'background', 'radial-gradient(transparent ' + percent + ', ' + this.config.background + ' ' + percent + ')');
        this.styleSheet(this.element, 'background', 'radial-gradient(transparent ' + percent + ', ' + this.config.backgroundHover + ' ' + percent + ')', 'hover');



        this.parent.appendChild(this.element);

        this.horizontal.render();
    }

    function setHref$1 (href){
        if(!href) return;

        if(href instanceof Object){
            this.element.href = href.url;
            this.element.target = href.blank? "_blank" : "";
        }else{
            this.element.href = href;
        }
    }

    function getDisabled (){
        if(this.menu.disabled instanceof Function)
            return this.menu.disabled();
        else
            return Boolean(this.menu.disabled);
    }

    function setCallBack () {
        var self = this;
        this.on('click', clickCallBack, this.menu);

        function clickCallBack(e, data){
            if (data.click) data.click.call(this, e, data);

            // if(self._config.hideAfterClick){
            //     self._cMenu.hide();
            //     if(self._cMenu._pMenu) self._cMenu._pMenu.hide();
            //     if(subMenu) subMenu.hide();
            // }
        }


    }

    function render$3 () {
        this.classed("horizontal", true);
        if(this.config.horizontal) this.styles({'transform': 'rotate('+ this.getHorizontalDeg() +'deg)'});

        this.parent.appendChild(this.element);

        this.icon.render();
        this.text.render();
    }

    const sizeRatio$3 = 0.65;
    const marginTopRatio$1 = 0.2;
    const fontHeight$1 = 13;

    function render$4 () {
        if(!this.hasIcon()) return;

        var icon = this.getIcon(),
            color = this.getIconColor(),
            l = this.config.clickZoneRadius * sizeRatio$3 - fontHeight$1 + "px",
            m = this.config.clickZoneRadius * marginTopRatio$1 - fontHeight$1 + "px";
        
        this.classed(icon + " cm-icon", true);

        this.styles({
                        "color": color,
                        "width": l,
                        "height": l,
                        "font-size": l,
                        "margin-top": m
                    });
        
        this.parent.appendChild(this.element);
    }

    function hasIcon$1 () {
        var icon = this.menu.icon;
        if(icon === undefined) return false;
        else if(typeof icon === "string") return icon !== "";
        else return icon.length && icon[0] !== "";
    }

    function getIcon$1 () {
        var icon = this.menu.icon;
        return typeof icon === "string"? icon : icon[0];
    }

    function getIconColor$1 () {
        var icon = this.menu.icon;
        return typeof icon === "string"? null : icon[1];
    }

    function Icon(parent, config, menu) {
        this.parent = parent;
        this.menu = menu;
        this.config = config;
        this.element = document.createElement('span');
    }

    Icon.prototype = Object.create(Element.prototype);
    Icon.prototype.constructor = Icon;
    Icon.prototype.render = render$4;
    Icon.prototype.hasIcon = hasIcon$1;
    Icon.prototype.getIcon = getIcon$1;
    Icon.prototype.getIconColor = getIconColor$1;

    const withIconMarginTop$1 = "3px";
    const withIconTop$1 = "-3px";

    function render$5 () {
        this.element.textContent = this.menu.title;
        
        this.classed('text', true);
        
        this.styles({
                        "margin-top": this.icon.hasIcon() ? withIconMarginTop$1 : this.config.textTop,
                        "top": this.icon.hasIcon() ? withIconTop$1 : 0
                    });

        this.parent.appendChild(this.element);
    }

    function Text(parent, config, menu, icon) {
        this.parent = parent;
        this.menu = menu;
        this.config = config;
        this.icon = icon;
        this.element = document.createElement('span');
    }

    Text.prototype = Object.create(Element.prototype);
    Text.prototype.constructor = Text;
    Text.prototype.render = render$5;

    function getHorizontalDeg (){
        return -(this.config.getRotateDeg(this.index) + this.config.unskewDeg);
    }

    function Horizontal(parent, config, menu, index) {
        this.parent = parent;
        this.config = config;
        this.menu = menu;
        this.index = index;

        this.element = document.createElement('div');
        
        this.icon = new Icon(this.element, config, menu);

        this.text = new Text(this.element, config, menu, this.icon);
    }

    Horizontal.prototype = Object.create(Element.prototype);
    Horizontal.prototype.constructor = Horizontal;
    Horizontal.prototype.render = render$3;
    Horizontal.prototype.getHorizontalDeg = getHorizontalDeg;

    function Anchor(parent, config, menu, index) {
        this.parent = parent;
        this.config = config;
        this.element = document.createElement('a');
        this.menu = menu;
        this.horizontal = new Horizontal(this.element, config, menu, index);

    }

    Anchor.prototype = Object.create(Element.prototype);
    Anchor.prototype.constructor = Anchor;
    Anchor.prototype.render = render$2;
    Anchor.prototype.setHref = setHref$1;
    Anchor.prototype.getDisabled = getDisabled;
    Anchor.prototype.setCallBack = setCallBack;

    function Item(parent, config, menu, index) {
        Element.call(this);
        this.parent = parent.firstChild;
        this.element = document.createElement('li');
        this.config = config;
        this.index = index;
        
        this.anchor = new Anchor(this.element, config, menu, index);
    }

    Item.prototype = Object.create(Element.prototype);
    Item.prototype.constructor = Item;
    Item.prototype.render = render$1;

    function createItems () {
        this.element.appendChild(document.createElement('ul'));

        this.menus.forEach(function (v, i) {
            var item = new Item(this.element, this.config, v, i);
            item.render();
            this.items.push(item);
        }, this);
    }

    function show$1 () {
        this.classed('opened-nav', true);
    }

    function hide$1 () {
        
    }

    function Menu(parent, config, menus, level) {
        Element.call(this);
        this.parent = parent;
        this.element = document.createElement('div');
        this.config = config;
        this.menus = menus;

        this.items = [];

    }

    Menu.prototype = Object.create(Element.prototype);

    Menu.prototype.constructor = Menu;
    Menu.prototype.render = render;
    Menu.prototype._createItems = createItems;
    Menu.prototype.show = show$1;
    Menu.prototype.hide = hide$1;

    function createMenus () {

        createMenu$1.call(this, this.config.menus, 0);
    }

    function createMenu$1(menus, level) {
        var menu = new Menu(this.element, new Config(this.config, level), menus);
        menu.render();

        this.menus.push(menu);

        ++level;
        
        menus.forEach(function (v, i) {
            if (v.menus) {
                createMenu$1.call(this, v.menus, level);
            }
        }, this);
    }

    function CMenu(element, config){//pMenu
        this.element = element;
        this.menus = [];
        this.config = config;

        this._createMenus();
    }


    CMenu.prototype = Object.create(Element.prototype);
    CMenu.prototype.constructor = CMenu;
    CMenu.prototype._createMenus = createMenus;
    CMenu.prototype.show = show;
    CMenu.prototype.hide = hide;
    //CMenu.prototype.config = config;

    function index (selector, config) {
        return typeof selector === "string"
            ? new CMenu(document.querySelector(selector), config)
            : new CMenu(selector, config);
    }

    return index;

}));
//# sourceMappingURL=circular-menu.js.map
