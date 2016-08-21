export default function startDeg(start, totalAngle, position) {
    var top = -(totalAngle - 180) / 2,
        positions = {
            top: top,
            left: top - 90,
            right: top + 90,
            bottom: top + 180
        };

    return start !== undefined ? start : positions[position];
}