/*!
 * swewsh.js - adds swipe touch event support to any website.
 * http://prayingmadness.com
 *
 * Copyright (c) 2011 Scott Kosman
 * Dual licensed under the MIT and GPL licenses.
 *
 */

var Swewsh = Swewsh || {};

Swewsh.Global = (function (window, document, undefined) {
	
	self = {
		x : null,
		y : null,
		dx : null,
		x_threshold : 5,
		y_threshold : 40,
		callback : null,
	
		init: function(event, callback) {
			self.callback = callback;
			document.addEventListener('touchstart', self.start, false);
		},
	
		start: function(event) {
			//Fire only on single-finger touch, multi-touch gets ignored.
			if (event.touches.length === 1) {
				self.x = event.touches[0].pageX;
				self.y = event.touches[0].pageY;
			
				//Add events listeners for touchmove and touchend
				document.addEventListener('touchmove', self.move, false);
				document.addEventListener('touchend', self.end, false);
			}
		},
	
		move: function(event) {
			//Fire only on single-finger touch, multi-touch gets ignored.
			if (event.touches.length === 1) {
				var dx = event.touches[0].pageX - self.x;
				var dy = event.touches[0].pageY - self.y;				

				//Set initial swewsh
				if (self.dx === null) {
					self.dx = dx;
					event.preventDefault();
				//Cancel if direction changes or vertical movement exceeds threshold
				} else if ((self.dx < 0 && dx > 0) || (self.dx > 0 && dx < 0) || (Math.abs(dy) > self.y_threshold)) {
					self.cancel();
				}
			}
		},

		end: function(event) {
			if (Math.abs(self.dx) > self.x_threshold) {
				//Determine direction and fire callback, sending the diretion name to the callback as an argument
				var direction = (self.dx > 0) ? 'right' : 'left';
				self.callback(direction);
			}
			self.cancel();
		},
	
		cancel: function() {		
			//Event listener garbage cleanup
			document.removeEventListener('touchmove', self.move);
			document.removeEventListener('touchend', self.end);

			//Reset variables for next Swewsh
			self.x = null;
			self.y = null;
			self.dx = null;
		}
	};
	
	return self;
	
} (this, this.document));


// This is the magic that gets fired after a Swewsh is registered.
function handleSwewsh(dir) {
	alert(dir); //will either be "left" or "right", so an if/else or ternary operator will let you kick out your jams.
}


//Specify callback function, set this sucker to fire onload.
window.onload = function(event) {
	Swewsh.Global.init(event, handleSwewsh);
};