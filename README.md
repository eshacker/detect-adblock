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
  xt_multc = "&x1=&x2=&x4=&x5=&x6=&x7=&x8=&x9=&x10=&x11=&x12=&x13=&x14=&x15=";
  
  (function (win) {
    var doc = win.document;
    doc.addEventListener('detectAdblock', function (event) {
      // après la détection, on remplit l'indicateur x19
      var detected = event.detail.status || false,
        multcVar = win.xt_multc + '&x19' + '=' + (detected === true ? '1' : '2'),
        deviceDetect = function () {
          var userAgent = win.navigator.userAgent.toLowerCase(),
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
        multcVar += "&x3=" + (deviceDetect() || '1');
      } catch (e) {
        console.debug('deviceDetect failed!');
      }

      win.xtparam = win.xtparam ? win.xtparam + multcVar : multcVar;

      // appel du script xtcore
      var script = doc.createElement('script');
      script.async = 1;
      script.src = "/scripts/xtcore.js";
      doc.body.appendChild(script);
    }, false);
  })(window);
</script>
```