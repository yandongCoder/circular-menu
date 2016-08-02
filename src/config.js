import Creator from "./Creator/index";
import extend from "./extend";

const defaultConfig = {
    totalAngle: 360,//deg,
    spaceDeg: 0,//deg
    background: "#323232",
    backgroundHover: "#515151",
    pageBackground: "#ffffff",
    percent: 0.32,//%
    diameter: 300,//px
    position: 'top',
    horizontal: true,
    animation: "into"
};


export default function (config) {

    config = extend(defaultConfig, config);

    this._creator = new Creator(this, config);
    this._creator.createMenu();

    return this;
}