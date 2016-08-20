import classed from "./classed";
import styles from "./styles";
import styleSheets from "./styleSheets";

export default function Element() {
    
}

Element.prototype = {
    constructor: Element,
    styles: styles,
    styleSheets: styleSheets,
    classed: classed
};