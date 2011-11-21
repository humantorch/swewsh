/*jslint browser: true */
/*global alert */

// The previous two lines are for JSLintMate, the awesome TextMate JSLint bundle which you should totally check out.
// https://github.com/rondevera/jslintmate

var Swewsh = {
	x : null,
	y : null,
	dx : null,
	x_threshold : 5,
	y_threshold : 40,
	callback : null,

	cancel : function() {
		//Remove event listeners for touchmove and touchend
		document.removeEventListener('touchmove', Swewsh.move);
		document.removeEventListener('touchend', Swewsh.end);

		//Reset variables
		Swewsh.x = null;
		Swewsh.y = null;
		Swewsh.dx = null;
	},

	end : function(event) {
		if (Math.abs(Swewsh.dx) > Swewsh.x_threshold) {
			//Determine direction and call callback
			var direction = (Swewsh.dx > 0) ? 'right' : 'left';
			Swewsh.callback(direction);
		}
		//Reset swewsh
		Swewsh.cancel();
	},

	move : function(event) {
		//Handle only for single touch
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

	start : function(event) {
		//Handle only for single touch
		if (event.touches.length === 1) {
			Swewsh.x = event.touches[0].pageX;
			Swewsh.y = event.touches[0].pageY;
			
			//Add events listeners for touchmove and touchend
			document.addEventListener('touchmove', Swewsh.move, false);
			document.addEventListener('touchend', Swewsh.end, false);
		}
	},

	init : function(event, callback) {
		Swewsh.callback = callback;
		document.addEventListener('touchstart', Swewsh.start, false);
	}
};

// This is the magic that gets fired after a Swewsh is registered.

function handleSwewsh(dir) {
	alert(dir); //will either be "left" or "right", so an if/else or ternary operator will let you kick out your jams.
}

//Specify callback function
window.onload = function(event) {
	Swewsh.init(event, handleSwewsh);
};