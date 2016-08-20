export default function () {
    this.element = document.createElement('div');
    
    this.classed('circular-menu', true);

    this.styles({
                    "width": this.width,
                    "height": this.height,
                    "marginTop": this.marginTop,
                    "marginLeft": this.marginLeft
                });
    

    var self = this;
    setTimeout(function () {
        self.styles({'display': 'block'});
    }, 100);

    this.styleSheets({
                         'width': this.width,
                         'height': this.height,
                         'margin-left': this.marginLeft,
                         'margin-top': this.marginTop,
                         'border': '3px solid ' + this.pageBackground
                     }, 'after');

    
    this.parent.appendChild(this.element);

    //var ul = p.appendChild(document.createElement('ul'));
    //this._createLists(ul);
}