export default function (ele, type, callback, data) {
    ele.addEventListener(type, function(e){
        callback.call(this, e, data);
    });
}