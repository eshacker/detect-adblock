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
  		multcVar = xt_multc + '&x19' + '=' + (detected === true ? '1' : '2'),
  		device_detect = function () {
  			var userAgent = navigator.userAgent.toLowerCase(),
  				isMobile = (/iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(userAgent)),
  				isTablet = (/ipad|android 3.0|xoom|sch-i800|playbook|tablet|kindle|silk/i.test(userAgent)),
  				deviceDedected = '1';
  			if (isMobile) {
  				if ((userAgent.search("android") > -1) && (userAgent.search("mobile") > -1)) deviceDedected = '2';					
  				else if ((userAgent.search("android") > -1) && !(userAgent.search("mobile") > -1)) deviceDedected = '3';
  				else deviceDedected = '2';
  			}
  			if (isTablet) deviceDedected = '3';
  			return deviceDedected;
  		};
  	try {
  		multcVar = multcVar + "&x3=" + (device_detect() || '1');
  	} catch (e) {
  		console.debug('device_detect failed !');
  	}
  
  	window.xtparam = window.xtparam ? window.xtparam + multcVar : multcVar;
  
  	// appel du script xtcore
  	var script = document.createElement('script');
  	script.async = 1;
  	script.src = "/scripts/xtcore.js";
  	document.body.appendChild(script);
  });
</script>
```