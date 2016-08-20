import styleSheet from "./styleSheet";

export default function (styles, pseudo) {
    if(!styles instanceof Object) return this;
    
    for(var k in styles){
        if(styles.hasOwnProperty(k)) styleSheet(this.element, k, styles[k], pseudo);
    }

    return this;
}