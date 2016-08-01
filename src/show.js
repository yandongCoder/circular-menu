import classed from "./classed";
export default function (styles) {

    if(styles) this.styles(styles);
    
    classed(this._container, 'opened-nav', true);
    return this;
}