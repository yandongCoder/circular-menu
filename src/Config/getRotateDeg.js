export default function (i) {
    var rotateDeg = this.startDeg + this.rotateUnit * i;
    if(this.level === 0) return rotateDeg;
    else return rotateDeg - this.totalAngle / 2 + this.centralDeg / 2;
}