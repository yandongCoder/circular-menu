import Creator from "./Creator/index";
import extend from "./extend";




export default function (config) {

    config = extend(defaultConfig, config);

    this._creator = new Creator(this, config);
    this._creator.createMenu();

    return this;
}