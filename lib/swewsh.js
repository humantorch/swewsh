/*!
 * swewsh.js - adds swipe touch event support to any website.
 * http://prayingmadness.com
 *
 * Copyright (c) 2011 Scott Kosman
 * Dual licensed under the MIT and GPL licenses.
 *
 */

var Swewsh = {
	x : null,
	y : null,
	dx : null,
	x_threshold : 5,
	y_threshold : 40,
	callback : null,
	
	init: function(event, callback) {
		Swewsh.callback = callback;
		document.addEventListener('touchstart', Swewsh.start, false);
	},
	
	start: function(event) {
		//Fire only on single-finger touch, multi-touch gets ignored.
		if (event.touches.length === 1) {
			Swewsh.x = event.touches[0].pageX;
			Swewsh.y = event.touches[0].pageY;
			
			//Add events listeners for touchmove and touchend
			document.addEventListener('touchmove', Swewsh.move, false);
			document.addEventListener('touchend', Swewsh.end, false);
		}
	},
	
	move: function(event) {
		//Fire only on single-finger touch, multi-touch gets ignored.
		if (event.touches.length === 1) {
			var dx = event.touches[0].pageX - Swewsh.x;
			var dy = event.touches[0].pageY - Swewsh.y;				

			//Set initial swewsh
			if (Swewsh.dx === null) {
				Swewsh.dx = dx;
				event.preventDefault();
			//Cancel if direction changes or vertical movement exceeds threshold
			} else if ((Swewsh.dx < 0 && dx > 0) || (Swewsh.dx > 0 && dx < 0) || (Math.abs(dy) > Swewsh.y_threshold)) {
				Swewsh.cancel();
			}
		}
	},

	end: function(event) {
		if (Math.abs(Swewsh.dx) > Swewsh.x_threshold) {
			//Determine direction and fire callback, sending the diretion name to the callback as an argument
			var direction = (Swewsh.dx > 0) ? 'right' : 'left';
			Swewsh.callback(direction);
		}
		Swewsh.cancel();
	},
	
	cancel: function() {		
		//Event listener garbage cleanup
		document.removeEventListener('touchmove', Swewsh.move);
		document.removeEventListener('touchend', Swewsh.end);

		//Reset variables for next Swewsh
		Swewsh.x = null;
		Swewsh.y = null;
		Swewsh.dx = null;
	}
};


// This is the magic that gets fired after a Swewsh is registered.
function handleSwewsh(dir) {
	alert(dir); //will either be "left" or "right", so an if/else or ternary operator will let you kick out your jams.
}


//Specify callback function, set this sucker to fire onload.
window.onload = function(event) {
	Swewsh.init(event, handleSwewsh);
};