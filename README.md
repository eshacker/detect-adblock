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
    
    // on adblock detection, fills the x19 variable
    var detected = event.detail.status || false,
    		multcVar = '&x19' + '=' + (detected === true ? '1' : '2'),
    		win = window, doc = document;
    window.xtparam = window.xtparam ? window.xtparam + multcVar : multcVar;
    
    // verification du status
    if (detected === true)
      console.log("AdBlocker detected");
    else
      console.log("AdBlocker not detected");

  	// appel script xiti
		var script = document.createElement('script');
		script.async = 1; script.src = "/script/xtcore.js";
		document.body.appendChild(script);
  });
</script>
```
