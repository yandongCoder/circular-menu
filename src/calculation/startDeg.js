export default function startDeg(config) {
    var top = -(config.totalAngle - 180) / 2,
        positions = {
            top: top,
            left: top - 90,
            right: top + 90,
            bottom: top + 180
        };

    return config.start !== undefined ? config.start : positions[config.position];
}