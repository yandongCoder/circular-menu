const sizeRatio = 0.65;
const marginTopRatio = 0.2;
const fontHeight = 13;

export default function () {
    if(!this.hasIcon()) return;

    var icon = this.getIcon(),
        color = this.getIconColor(),
        l = this.config.clickZoneRadius * sizeRatio - fontHeight + "px",
        m = this.config.clickZoneRadius * marginTopRatio - fontHeight + "px";
    
    this.classed(icon + " cm-icon", true);

    this.styles({
                    "color": color,
                    "width": l,
                    "height": l,
                    "font-size": l,
                    "margin-top": m
                });
    
    this.parent.appendChild(this.element);
}