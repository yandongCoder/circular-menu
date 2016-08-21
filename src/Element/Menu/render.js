export default function () {
    this.element = document.createElement('div');
    
    this.classed('circular-menu', true);

    this.styles({
                    "width": this.config.menuSize.width,
                    "height": this.config.menuSize.height,
                    "margin-top": this.config.menuSize.marginTop,
                    "margin-left": this.config.menuSize.marginLeft
                });
    

    var self = this;

    setTimeout(function () {
        self.styles({'display': 'block'});
    }, 100);

    this.styleSheets({
                         'width': this.config.coverSize.width,
                         'height': this.config.coverSize.height,
                         'margin-left': this.config.coverSize.marginLeft,
                         'margin-top': this.config.coverSize.marginTop,
                         'border': '3px solid ' + this.config.pageBackground
                     }, 'after');


    this.appendFirst(this.parent, this.element);

    this._createItems();

}