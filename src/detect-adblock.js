(function (win) {
	var undefined = void(0), doc = win.document, bait, timer, count = 0, sent = false,
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
		},
		onload = function () {
			timer = setInterval(function () {
				// maximum execution time reached, abort
				if (count === exports.maxCount) {
					win.clearTimeout(timer);
					report(false);
				}
				// an ad blocker has been detected, we report it
				if (checkBait() === true) {
					win.clearTimeout(timer);
					report(true);
				}
				count++;
			}, exports.interval);
		},
		checkBait = function () {
			if (bait === undefined) {
				createBait();
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
			sent = true;
			callbacks.forEach(function (cb) {
				cb(status);
			});
			removeBait();
		},
		removeBait = function () {
			doc.body.removeChild(bait);
		};

	// prevent multiple reports
	if (sent === true) {
		return;
	}

	if (win.addEventListener !== undefined) {
		win.addEventListener('load', onload, false);
	} else {
		win.attachEvent('onload', onload);
	}
	exports.on = function (callback) {
		callbacks.push(callback);
	};

	// default callback, report to xiti
	exports.on(function (status) {
		if (status === true) {
			// 1 : actif
			// 2 : inactif
			var x19 = 'x19=1';
			win.xt_multc = win.xt_multc ? win.xt_multc + '&' + x19 : x19;
		}
	});
	obs.detectAdblock = exports;
})(window);