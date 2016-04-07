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
	var PIPEWIDTH = 10.8;

	var Player = function(el, game) {
		this.el = el;
		this.game = game;
		this.pos = { x: INITIAL_POSITION_X, y: INITIAL_POSITION_Y };
	};

	Player.prototype.reset = function() {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
		document.getElementById('start').style.display = 'block';
		this.game.score = 0;
	};

	Player.prototype.onFrame = function(delta) {
		if (Controls.keys.space) {
			document.getElementById('start').style.display = 'none';
			this.game.isAlive = true;
			ROTATE = 70;
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

			var heightTop = this.game.pipe.pipes[i].top.pipe[0].style.height;
			var pipeTopY = parseFloat(heightTop);

			var heightBottom = this.game.pipe.pipes[i].bottom.pipe[0].style.height;
			heightBottom = parseFloat(heightBottom);

			var pipeBottomY = this.game.WORLD_HEIGHT - heightBottom;//+ parseInt(help2);

			if(-this.pos.x + WIDTH - 35 >= pipeX && -this.pos.x - 35 < pipeX + PIPEWIDTH){
				if(pipeBottomY + 4 <= this.pos.y + HEIGHT || this.pos.y  + 3 <= pipeTopY) {
					return this.game.gameover();
				}
			}
			//TJEKKA HVORT EG SE KOMIN EINUM LENGRA EN SÚLAN
			else if(pipeX + PIPEWIDTH >= -68 && pipeX + PIPEWIDTH <= -67) {
				if(this.game.currentPipe !== this.game.pipe.pipes[i].id){
					this.game.score++;
					console.log(this.game.score);
					this.game.currentPipe = this.game.pipe.pipes[i].id;
				}
			}
		}
	};

	Player.prototype.checkCollisionWithBounds = function() {
		console.log(this.game.WORLD_HEIGHT + this.game.WORLD_HEIGHT*0.5);
		console.log(this.pos.Y + WIDTH);
		if (this.pos.y + HEIGHT > this.game.WORLD_HEIGHT - this.game.WORLD_HEIGHT*0.09) {
			this.game.isAlive = false;
			return this.game.gameover();
		}
	};

	return Player;

})();
