# About

The extension is experimental.

Color Assist allows you to highlight your code blocks.  
By default the highligh scope is defined by `//#color` and `//#`

## Example

```JavaScript
//#red
function log() {
  console.log("hello");
}
//#
```

## What color are available?

All 140 web colors: [link](https://htmlcolorcodes.com/)

### It will look like that:

<img src="./assets/color-assist.png" width="70%">

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
<!-- custom symbol -->
<!-- hex colors -->

highlight in minimap too (just like errors)
what's the bug when changing file types?
comment blocks support
