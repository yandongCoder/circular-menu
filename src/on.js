export default function on (ele, type, callback, data) {
    ele.addEventListener(type, function(e){
        callback.call(this, e, data);
    });
}