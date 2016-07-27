export default function (config) {
    var radius = config.diameter / 2 + 4,
        square = radius * radius * 2;
    var coverRadius = Math.sqrt(square) * config.percent;
    
    return (radius - coverRadius) * 0.38 + 'px';
}