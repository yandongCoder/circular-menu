export default function (){
    if(this.menu.disabled instanceof Function)
        return this.menu.disabled();
    else
        return Boolean(this.menu.disabled);
}