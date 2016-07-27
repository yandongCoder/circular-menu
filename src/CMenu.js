import config from "./config";

export default function CMenu(element){
    this._element = element;
}

CMenu.prototype = {
    constructor: CMenu,
    config: config

};