import CMenu from "./src/CMenu";

export default function (selector, config) {
    return typeof selector === "string"
        ? new CMenu(document.querySelector(selector), config)
        : new CMenu(selector, config);
}

