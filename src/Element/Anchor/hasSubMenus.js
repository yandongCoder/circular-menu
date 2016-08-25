export default function hasSubMenus() {
    return this.menu.menus instanceof Array && this.menu.menus.length !== 0;
}