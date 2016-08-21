export default function on (type, callback, data) {
    this.element.addEventListener(type, function(e){
        callback.call(this, e, data);
    });
}