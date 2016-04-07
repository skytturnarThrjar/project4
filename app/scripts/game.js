
window.Game = (function() {
	'use strict';
	/**
	 * Main game class.
	 * @param {Element} el jQuery element containing the game.
	 * @constructor
	 */
	var Game = function(el) {
		this.el = el;
		this.player = new window.Player(this.el.find('.Player'), this);
		this.pipe = new window.Pipe(this.el, this);
		this.isPlaying = false;
		this.isAlive = false;
		this.firstGame = true;
		this.currentPipe = 0;
		this.score = 0;

		// Cache a bound onFrame since we need it each frame.
		this.onFrame = this.onFrame.bind(this);
	};

	/**
	 * Runs every frame. Calculates a delta and allows each game
	 * entity to update itself.
	 */
	Game.prototype.onFrame = function() {
		// Check if the game loop should stop.
		if (!this.isPlaying) {
			return;
		}

		// Calculate how long since last frame in seconds.
		var now = +new Date() / 1000,
				delta = now - this.lastFrame;
		this.lastFrame = now;

		// Update game entities.
		this.pipe.onFrame(delta);
		this.player.onFrame(delta);

		// Request next frame.
		window.requestAnimationFrame(this.onFrame);
	};

	/**
	 * Starts a new game.
	 */
	Game.prototype.start = function() {
		// Restart the onFrame loop
		this.lastFrame = +new Date() / 1000;
		window.requestAnimationFrame(this.onFrame);
		this.isPlaying = true;
		this.currentPipe = 0;
		document.getElementById('backgroundSong').volume = 0.5;
		document.getElementById('backgroundSong').play();

		this.reset();
	};

	/**
	 * Resets the state of the game so a new game can be started.
	 */
	Game.prototype.reset = function() {
		this.player.reset();
		this.pipe.reset();
	};

	/**
	 * Signals that the game is over.
	 */
	Game.prototype.gameover = function() {
		this.isPlaying = false;
		// Should be refactored into a Scoreboard class.
		var that = this;
		var scoreboardEl = this.el.find('.Scoreboard');
		document.getElementById('scoreResults').innerHTML = this.score;
		if(document.getElementById('laugh').className === 'on') {
			document.getElementById('laugh').play();
		}
		document.getElementById('backgroundSong').pause();

		scoreboardEl
			.addClass('is-visible')
			.find('.Scoreboard-restart')
				.on('click touchstart tap' , function() {
					scoreboardEl.removeClass('is-visible');
					that.pipe.reset();
					that.start();
				});
	};

	/**
	 * Some shared constants.
	 */
	Game.prototype.WORLD_WIDTH = 102.4;
	Game.prototype.WORLD_HEIGHT = 57.6;

	return Game;
})();
