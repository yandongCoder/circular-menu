const withIconMarginTop = "3px";
const withIconTop = "-3px";

export default function () {
    this.element.textContent = this.menu.title;
    
    this.classed('text', true);
    
    this.styles({
                    "margin-top": this.icon.hasIcon() ? withIconMarginTop : this.config.textTop,
                    "top": this.icon.hasIcon() ? withIconTop : 0
                });

    this.parent.appendChild(this.element);
}