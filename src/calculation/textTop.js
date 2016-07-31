import {fixedTop} from "./clickZoneSize";

const middleRatio = 0.41;

export default function (clickZoneRadius) {
    return clickZoneRadius * middleRatio - fixedTop + 'px';

}