import classed from "./classed";
import styles from "./styles";
import styleSheet from "./styleSheet";
import styleSheets from "./styleSheets";
import appendFirst from "./appendFirst";
import on from "./on";

export default function Element() {
    
}

Element.prototype = {
    constructor: Element,
    styles: styles,
    styleSheet: styleSheet,
    styleSheets: styleSheets,
    classed: classed,
    appendFirst: appendFirst,
    on: on
};