# detect-adblock
Détection de adblock

## Standard usage

```html
<script src="src/detect-adblock.js"></script>
<script>
  document.addEventListener("detectAdblock", function(event){
    if (event.detail.status === true)
      console.log("AdBlocker detected");
    else
      console.log("AdBlocker not detected");
  });
</script>
```

## Xiti usage

```html
<script src="src/detect-adblock.js"></script>
<script>
  
  document.addEventListener("detectAdblock", function(event){
    var fillXtMultcVar = function (xNumber, value) {
      var multcVar = '&x' + xNumber + '=' + value;
      win.xtparam = win.xtparam ? win.xtparam + multcVar : multcVar;
    };
    
    // on adblock detection, fills the x19 variable
    var detected = event.detail.status || false;
    
    fillXtMultcVar(19, detected === true ? '1' : '2');
    
    if (event.detail.status === true)
      console.log("AdBlocker detected");
    else
      console.log("AdBlocker not detected");
  });
</script>
```
