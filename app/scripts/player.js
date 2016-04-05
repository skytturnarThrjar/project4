window.Player = (function() {
	'use strict';

	var Controls = window.Controls;

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 30; // * 10 pixels per second
	var WIDTH = 5;
	var HEIGHT = 5;
	var INITIAL_POSITION_X = 30;
	var INITIAL_POSITION_Y = 25;
	var ROTATE = 0;

	var Player = function(el, game) {
		this.el = el;
		this.game = game;
		this.pos = { x: INITIAL_POSITION_X, y: INITIAL_POSITION_Y };
	};

	/**
	 * Resets the state of the player for a new game.
	 */
	Player.prototype.reset = function() {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
	};

	Player.prototype.onFrame = function(delta) {
		if (!Controls.keys.space) {
			ROTATE = -20;
			this.pos.y += delta * SPEED;
		}
		if (Controls.keys.space) {
			ROTATE = 100;
			if(document.getElementById('yoSound').className === 'on') {
				document.getElementById('yoSound').play();
			}
			this.pos.y -= delta * SPEED;
		}

		this.checkCollisionWithBounds();

		// Update UI
		this.el.css('transform', 'translate3d(' + this.pos.x + 'em, ' + this.pos.y + 'em, ' + 0 + 'em)' + 'rotate(' + ROTATE + 'deg)');
	};

	Player.prototype.checkCollisionWithPipes = function() {

	};

	Player.prototype.checkCollisionWithBounds = function() {
		if (this.pos.x < 0 ||
			this.pos.x + WIDTH > this.game.WORLD_WIDTH ||
			this.pos.y < 0 ||
			this.pos.y + HEIGHT > this.game.WORLD_HEIGHT) {
				if(document.getElementById('laugh').className === 'on') {
					document.getElementById('laugh').play();
				}
				return this.game.gameover();
		}
	};

	return Player;

})();
