export default function (href){
    if(!href) return;

    if(href instanceof Object){
        this.element.href = href.url;
        this.element.target = href.blank? "_blank" : "";
    }else{
        this.element.href = href;
    }
}