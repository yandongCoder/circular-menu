const antialiasing = 3;

export function coverRadius(radius, percent) {
    var square = radius * radius * 2;
    return Math.sqrt(square) * percent + antialiasing;
}

export default function (coverRadius) {
    var l = coverRadius * 2;
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