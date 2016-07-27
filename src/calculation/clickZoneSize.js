export default function (config) {
    var l = config.diameter;
    var m = - config.diameter / 2;

    l += "px";
    m += "px";

    return {
        width:  l,
        height: l,
        marginRight: m,
        marginBottom: m
    };
}