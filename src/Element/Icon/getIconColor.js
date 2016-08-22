export default function () {
    var icon = this.menu.icon;
    return typeof icon === "string"? null : icon[1];
}