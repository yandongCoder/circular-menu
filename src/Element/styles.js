import style from "./style";

export default function (styles) {
    if(!styles instanceof Object) return this;
    
    for(var k in styles){
        if(styles.hasOwnProperty(k)) style(this.element, k, styles[k]);
    }

    return this;
}