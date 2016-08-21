export default function (diameter) {
    var l = diameter;
    var m = - diameter / 2;

    l += "px";
    m += "px";

    return {
        width:  l,
        height: l,
        marginLeft: m,
        marginTop: m
    };
}