(function (win) {
	var undefined = void(0), doc = win.document, bait, timer, count = 0, reported = false,
		blockerDetected = false,
		obs = win.Obs || {}, exports = {
			maxCount: 30,
			interval: 100,
			className: 'pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links',
			style: 'width: 1px !important; height: 1px !important; position: absolute !important; left: -10000px !important; top: -1000px !important;'
		}, callbacks = [],
		createBait = function () {
			// create bait
			bait = doc.createElement('div');
			bait.setAttribute('class', exports.className);
			bait.setAttribute('style', exports.style);
			bait = doc.body.appendChild(bait);

			bait.offsetParent;
			bait.offsetHeight;
			bait.offsetLeft;
			bait.offsetTop;
			bait.offsetWidth;
			bait.clientHeight;
			bait.clientWidth;
		},
		onload = function () {
			timer = setInterval(function () {
				// maximum execution time reached, abort
				if (count === exports.maxCount) {
					win.clearInterval(timer);
					report(false);
				}// an ad blocker has been detected, we report it
				else if (checkBait() === true) {
					win.clearInterval(timer);
					blockerDetected = true;
					report(true);
				}
				count++;
			}, exports.interval);
		},
		checkBait = function () {
			if (bait === undefined) {
				createBait();
			}
			if (win.document.body.getAttribute('abp') !== null
				|| bait.offsetParent === null
				|| bait.offsetHeight == 0
				|| bait.offsetLeft == 0
				|| bait.offsetTop == 0
				|| bait.offsetWidth == 0
				|| bait.clientHeight == 0
				|| bait.clientWidth == 0) {
				return true;
			}
			if (win.getComputedStyle !== undefined) {
				var baitStyles = win.getComputedStyle(bait, null);
				if (baitStyles.getPropertyValue('display') === 'none'
					|| baitStyles.getPropertyValue('visibility') === 'hidden'
					|| /about:/.test(baitStyles.getPropertyValue('-moz-binding'))) { // pour adblock plus sur Firefox
					return true;
				}
			}
			return false;
		},
		report = function (status) {
			reported = true;

			// trigger event
			triggerEvent(win.document, {status: status});

			// executes the callbacks
			callbacks.forEach(function (cb) {
				cb(status);
			});
			removeBait();
		},
		removeBait = function () {
			try {
				doc.body.removeChild(bait);
			} catch (e) {
			}
		},
		triggerEvent = function (el, data) {
			var options = {
				bubbles: true,
				cancelable: true,
				detail: data
			}, event, name = 'ObsDetectAdblock';
			if (doc.createEvent) {
				// Standard Event
				event = win.document.createEvent('CustomEvent');
				event.initCustomEvent(name, options.bubbles, options.cancelable, options.detail);
				el.dispatchEvent(event);
			} else {
				// IE Event
				event = win.document.createEventObject();
				for (var key in options) {
					event[key] = options[key];
				}
				el.fireEvent('on' + name, event);
			}
		};

	// prevent multiple reports
	if (reported === true) {
		return;
	}

	exports.on = function (callback) {
		// executes the callback immediately if a blocker has been detected
		if (reported) {
			callback(blockerDetected);
		} else {
			// adds the callback to a list
			callbacks.push(callback);
		}
	};
	onload();
	obs.detectAdblock = exports;
})(window);
