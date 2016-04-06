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
	var PIPEWIDTH = 9;

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
		// if(gameover) {
		//
		// }
		// if (!Controls.keys.space) {
		// 	ROTATE = -20;
		// 	this.pos.y += delta * SPEED;
		// }
		if (Controls.keys.space) {
			this.game.isAlive = true;
			ROTATE = 100;
			if(document.getElementById('yoSound').className === 'on') {
				document.getElementById('yoSound').play();
			}
			this.pos.y -= delta * SPEED;
		}
		else if (this.game.isAlive) {
			ROTATE = -20;
			this.pos.y += delta * SPEED;
		}

		this.checkCollisionWithPipes();
		this.checkCollisionWithBounds();

		// Update UI
		this.el.css('transform', 'translate3d(' + this.pos.x + 'em, ' + this.pos.y + 'em, ' + 0 + 'em)' + 'rotate(' + ROTATE + 'deg)');
		this.el.css('-webkit-transform', 'translate3d(' + this.pos.x + 'em, ' + this.pos.y + 'em, ' + 0 + 'em)' + 'rotate(' + ROTATE + 'deg)');
		this.el.css('-moz-transform', 'translate3d(' + this.pos.x + 'em, ' + this.pos.y + 'em, ' + 0 + 'em)' + 'rotate(' + ROTATE + 'deg)');
	};

	Player.prototype.checkCollisionWithPipes = function() {
		for(var i = 0; i < this.game.pipe.pipes.length; i++) {
			var pipeX = Math.floor(this.game.pipe.pipes[i].top.pos.x);

			var help = this.game.pipe.pipes[i].top.pipe[0].style.height;
			var pipeTopY = parseFloat(help);

			var help2 = this.game.pipe.pipes[i].bottom.pipe[0].style.height;
			help2 = parseFloat(help2);

			var pipeBottomY = this.game.WORLD_HEIGHT - help2;//+ parseInt(help2);

			if(-this.pos.x + WIDTH - 35 >= pipeX && -this.pos.x - 35 < pipeX + PIPEWIDTH){

					console.log('pipeTopY ' + pipeTopY);
					console.log('pipeBottomY ' + pipeBottomY);

					console.log(' Math.floor(this.pos.y)' +  Math.floor(this.pos.y));
					console.log('y + height:', this.pos.y + HEIGHT);
					console.log('pipeBottomY < Math.floor(this.pos.y) && Math.floor(this.pos.y) < pipeTopY' + pipeBottomY < Math.floor(this.pos.y) && Math.floor(this.pos.y) < pipeTopY);

					if(pipeBottomY <= this.pos.y + HEIGHT || this.pos.y <= pipeTopY)
					{
							console.log('DIE');
							return this.game.gameover();
					}
					else {
						console.log('LIFA');
					}
			}
		}
	};

	Player.prototype.checkCollisionWithBounds = function() {
		if (this.pos.y + HEIGHT > this.game.WORLD_HEIGHT) {
			this.game.isAlive = false;
			if(document.getElementById('laugh').className === 'on') {
				document.getElementById('laugh').play();
			}
			return this.game.gameover();
		}
	};

	return Player;

})();
