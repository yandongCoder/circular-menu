export default function (parent) {
    
    this._config.menus.forEach(function(v, k){

        this._createList(parent, v, k);
        
    }, this);

}