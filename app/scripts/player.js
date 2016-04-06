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
			var pipeX = this.game.pipe.pipes[i].top.pos.x;
			var pipeTopY = this.game.pipe.pipes[i].top.pos.y + this.game.pipe.pipes[i].top.pipe[0].style.height;
			var pipeBottomY = this.game.pipe.pipes[i].bottom.pos.y + this.game.pipe.pipes[i].bottom.pipe[0].style.height;
			pipeTopY = pipeTopY.substring(1, pipeTopY.length - 2);
			pipeBottomY = pipeBottomY.substring(1, pipeBottomY.length - 2);


			// if(pipeX >= this.pos.x + WIDTH && pipeX < this.pos.x + WIDTH + PIPEWIDTH) {
			//if(Math.floor(pipeX) < Math.floor(this.pos.x + WIDTH) && Math.floor(pipeX + PIPEWIDTH) < Math.floor(this.pos.x)) {
			//if(pipeX >= this.pos.x + WIDTH && pipeX < this.pos.x + WIDTH + PIPEWIDTH){

			if(-this.pos.x + WIDTH -35 >= pipeX && -this.pos.x - 35 < pipeX + PIPEWIDTH){
				console.log('DIEDIE');


				if(Math.floor(this.pos.y) < pipeTopY && Math.floor(this.pos.y) + HEIGHT > pipeBottomY ) {
					console.log('LIFA');
				}
				else {
					console.log(Math.floor(this.pos.y) + ' < ' + pipeTopY  );
					console.log(Math.floor(this.pos.y) + HEIGHT + ' > ' + pipeBottomY);
					console.log(pipeBottomY);

					console.log('OKO');
					console.log('KIM' + this.pos.y);
					console.log(pipeTopY);
					//console.log(this.pos.x + WIDTH);
					console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx');
					return this.game.gameover();

				}
				// return this.game.gameover();

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
