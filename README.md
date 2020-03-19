# About

Color Assist allows you to highlight your code blocks.  
It is for "visual" coders.  

# How to use

To highlight a block of code you need to wrap it with Color Assist scope.  
The highligh scope is defined by `//#color` and `//#`  
See below  

## Examples

### JavaScript

```JavaScript
//#red
function log() {
  console.log("hello");
}
//#
```

### It will look like that:

<img src="./assets/color-assist-js.png" width="70%">

### Python

```Python
##magenta
def my_function_0():
  print("Hello magenta")
##

##orange
def my_function_1():
  print("Hello orange")
##
```

### It will look like that:

<img src="./assets/color-assist-py.png" width="70%">

## What colors are available?

All 140 web colors: [link](https://htmlcolorcodes.com/)

## What else it can do?

Color Assist can also highlight accordingly the ruler.  
See the right side of the image above.  
Also, the opacity can be adjusted.  

# Settings

```JSON
{
"color-assist.opacity": 0.1,
"color-assist.ruler": "off"
}
```

# Todo

<!-- options for ruler color (off/only) -->
<!-- darker ruler colors -->
<!-- custom symbol? -->
<!-- hex colors? -->
<!-- check if contributes works   -->

highlight in minimap too (just like errors)  
what's the bug when changing file types?  
comment blocks support  
