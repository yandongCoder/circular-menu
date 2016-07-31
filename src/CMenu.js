import config from "./config";
import show from "./show";
import hide from "./hide";

export default function CMenu(element){
    this._element = element;
}

CMenu.prototype = {
    constructor: CMenu,
    config: config,
    show: show,
    hide: hide

};