export default function getHorizontalDeg (){
    return -(this.config.getRotateDeg(this.index) + this.config.unskewDeg);
}