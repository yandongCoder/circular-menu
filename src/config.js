import Creator from "./Creator/index";
import extend from "./extend";

const defaultConfig = {
    totalAngle: 360,//deg,
    spaceDeg: 0,//deg
    background: "#323232",
    backgroundHover: "#515151",
    pageBackground: "#52be7f",
    percent: 0.32,//%
    diameter: 300,//px
    position: 'top',
    horizontal: true,
    animation: "into"
};

export default function (config) {

    config = extend(defaultConfig, config);

    this._creator = new Creator(this._element, config);
    this._creator.createMenu();

    return this;
}