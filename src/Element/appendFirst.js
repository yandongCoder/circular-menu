export default function(parent, element){
    if(parent.firstChild) parent.insertBefore(element, parent.firstChild);
    else parent.appendChild(element);
}