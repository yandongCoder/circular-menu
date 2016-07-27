import Creator from "./Creator/index";

export default function (config) {
    this._config = config;

    var _creator =  new Creator(this._element, config);
    _creator.createMenu();

    return this;
}