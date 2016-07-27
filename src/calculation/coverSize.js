export default function (config) {
    var radius = config.diameter / 2 + 4,
        square = radius * radius * 2;
    var l = Math.sqrt(square) * config.percent * 2;
    var m = -l / 2;

    l += "px";
    m += "px";
    
    return {
        width:  l,
        height: l,
        marginLeft: m,
        marginTop: m
    };
}