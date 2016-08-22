export default function () {
    var icon = this.menu.icon;
    if(icon === undefined) return false;
    else if(typeof icon === "string") return icon !== "";
    else return icon.length && icon[0] !== "";
}