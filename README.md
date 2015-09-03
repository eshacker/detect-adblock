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
  xtnv = document;
  xtsd = "http://logixxx";
  xtdmc = ".example.com";
  xtsite = "123456";
  xtn2 = "1";
  xtpage = "Nom::De::Page_Ici";
  xtdi = "";
  xt_multc = "&x1=&x2=&x3=&x4=&x5=&x8=&x15=";
  
  document.addEventListener("detectAdblock", function (event) {
  
  	// après la détection, on rempli l'indicateur x19
  	var detected = event.detail.status || false,
  		multcVar = xt_multc + '&x19' + '=' + (detected === true ? '1' : '2');
  	window.xtparam = window.xtparam ? window.xtparam + multcVar : multcVar;
  
  	// appel du script xtcore
  	var script = document.createElement('script');
  	script.async = 1;
  	script.src = "/scripts/xtcore.js";
  	document.body.appendChild(script);
  });
</script>
```