import config from "./config";
import show from "./show";
import hide from "./hide";
import styles from "./styles";

export default function CMenu(element){
    this._container = element;
}

CMenu.prototype = {
    constructor: CMenu,
    config: config,
    show: show,
    hide: hide,
    styles: styles

};