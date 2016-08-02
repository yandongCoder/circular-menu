import config from "./config";
import show from "./show";
import hide from "./hide";
import styles from "./styles";

export default function CMenu(element, pMenu){
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