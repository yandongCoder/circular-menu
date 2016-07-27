import style from "./style";

export default function (parent, data, index) {

    var span = document.createElement('span');
    span.textContent = data.title;

    style(span, 'margin-top', this._calc.textTop);

    parent.appendChild(span);
}