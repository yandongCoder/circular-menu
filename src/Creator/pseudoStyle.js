var UID = {
    _current: 0,
    getNew: function(){
        this._current++;
        return this._current;
    }
};
export default function (element, pseudo, prop, value) {
    
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