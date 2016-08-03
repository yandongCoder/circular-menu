# Circular-Menu
aka, circular menu, wheel menu, circular navigation, wheel navigation.

## Live Demo
[jsfiddle Demo](https://jsfiddle.net/yandongCoder/kL4j7xor/10/)

## Browser compatibility

I tested in newer chrome, firefox, and IE Edge.

## Config

### Options

- totalAngle: 
    - value: ```0-360``` (unit is unnecessary)
    - default: ```360```deg (complete circle)
- spaceDeg: 
    - value: ```Int``` (0-5 is suitable)
    - default: ```0``` (The default is good)
- background: 
    - value: Acceptable CSS color value
    - default: ```#323232```
- backgroundHover: 
    - value: Acceptable CSS color value
    - default: ```#515151```
- pageBackground: 
    - value: Acceptable CSS color value ( You should pass the color of your page. )
    - default: ```#ffffff```
- diameter(circular menu radius): 
    - value:  Int (unit is unnecessary)
    - default: ```300```px
- position: 
    - value: "top" | "left" | "right" | "bottom"
    - default: "top"
- start: 
    - value: ```0-360``` (unit is unnecessary)
    - default: ```0``` deg
- horizontal (Horizontal icon and text): 
    - value: ```true | false```
    - default: ```true```
- hideAfterClick (Whether hide menu after click): 
    - value: ```true | false```
    - default: ```true```
    
- menus: (Array of objects, specifying menu items, the number of items must > 4 ! )
    - title: String (Title is not too long, otherwise it will overflow container)
    - icon: String (css class, e.g. "fa fa-facebook" "custom-icon icon1")
    - href:
      - String (like "http://google.com" or "#hash")
      - Object (like ```{url: "..", blank: true}``` )
        - url: String
        - blank: ```true | false``` (True will open a new browser tab)
    - click: Function (click callback function)
    - disabled:
        - String: ```true | false```
        - Function: (Function must return boolean value)
        
### Method

- styles(properties) 
    add styles to menus
    - properties: acceptable css properties object ( like ```{ "background-color": "#ffe", "border-left": "5px solid #ccc" }```)
- show (show menus)

- hide (hide menus)