export default function () {
    var self = this;
    this.on('click', clickCallBack, this.menu);

    function clickCallBack(e, data){
        if (data.click) data.click.call(this, e, data);

        // if(self._config.hideAfterClick){
        //     self._cMenu.hide();
        //     if(self._cMenu._pMenu) self._cMenu._pMenu.hide();
        //     if(subMenu) subMenu.hide();
        // }
    }


}