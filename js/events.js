setTimeout(function(){
	let	offerBtns = document.querySelectorAll('.button');
	let	offerImg = document.querySelectorAll('.mfo__link');

	function offerGA(eLem) {
		for(let i = 0; i<eLem.length; i++) {
			eLem[i].addEventListener('mousedown', function(e) {
				if (e.which == 3) {
					return false;
				}

				gtag('event', 'click', {
					'event_category': 'button',
					'event_label': 'offer_click'
				});
			}, false);
			
		}
	}

	offerGA(offerBtns);
	offerGA(offerImg);
}, 1000);