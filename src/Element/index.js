import classed from "./classed";
import styles from "./styles";
import styleSheets from "./styleSheets";
import appendFirst from "./appendFirst";

export default function Element() {
    
}

Element.prototype = {
    constructor: Element,
    styles: styles,
    styleSheets: styleSheets,
    classed: classed,
    appendFirst: appendFirst
};