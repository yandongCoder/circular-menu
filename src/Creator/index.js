import Calculation from '../Calculation/index';
import createLists from "./createLists";
import createList from "./createList";
import createMenu from "./createMenu";
import createAnchor from "./createAnchor";
import createText from "./createText";
import createIcon from "./createIcon";
import createHorizontal from "./createHorizontal";

export default function Creator(parent, config){
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