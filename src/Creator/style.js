import defaultView from "../window";

function styleRemove(name) {
    this.style.removeProperty(name);
}

function styleConstant(name, value, priority) {
    this.style.setProperty(name, value, priority);
}

function styleFunction(name, value, priority) {
    var v = value.apply(this, arguments);
    if (v == null) this.style.removeProperty(name);
    else this.style.setProperty(name, v, priority);
}

export default function(ele, name, value, priority) {

    var node;
    return arguments.length > 1
        ? ((value == null
        ? styleRemove : typeof value === "function"
        ? styleFunction
        : styleConstant).call(ele, name, value, priority == null ? "" : priority))
        : defaultView(node = ele)
        .getComputedStyle(node, null)
        .getPropertyValue(name);
}
