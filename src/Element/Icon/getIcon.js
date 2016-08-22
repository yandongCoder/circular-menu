export default function () {
    var icon = this.menu.icon;
    return typeof icon === "string"? icon : icon[0];
}