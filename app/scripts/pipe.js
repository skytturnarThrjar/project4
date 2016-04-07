window.Pipe = (function() {

    'use strict';

    var SPEED = 20;
    var GAP = 15;
    var MAX = 34;
    var MIN = 9;
    var PipeElement = function(pipe, posX, posY) {
        this.pipe = pipe;
        this.pos = {x: posX, y: posY};
    };

    var Pipe = function(el, game) {
        this.el = el;
        this.game = game;
        this.pipes = [
            {top: new PipeElement(this.el.find('.pipeTop1'), this.game.WORLD_WIDTH/2, 0), bottom: new PipeElement(this.el.find('.pipeBottom1'), this.game.WORLD_WIDTH/2, 0), id: 1},
            {top: new PipeElement(this.el.find('.pipeTop2'), this.game.WORLD_WIDTH, 0), bottom: new PipeElement(this.el.find('.pipeBottom2'), this.game.WORLD_WIDTH, 0), id: 2},
            {top: new PipeElement(this.el.find('.pipeTop3'), this.game.WORLD_WIDTH * 1.5, 0), bottom: new PipeElement(this.el.find('.pipeBottom3'), this.game.WORLD_WIDTH * 1.5, 0), id: 3}
        ];
    };

    Pipe.prototype.onFrame = function(delta) {
        if(this.game.isAlive) {
            for(var i = 0; i < this.pipes.length; i++) {
                this.pipes[i].top.pos.x -= delta * SPEED;
                this.pipes[i].bottom.pos.x -= delta * SPEED;
                this.pipes[i].top.pipe.css('transform', 'translateZ(0) translateX(' + this.pipes[i].top.pos.x + 'em');
                this.pipes[i].bottom.pipe.css('transform', 'translateZ(0) translateX(' + this.pipes[i].bottom.pos.x + 'em');
                this.pipes[i].top.pipe.css('-webkit-transform', 'translateZ(0) translateX(' + this.pipes[i].top.pos.x + 'em');
                this.pipes[i].bottom.pipe.css('-webkit-transform', 'translateZ(0) translateX(' + this.pipes[i].bottom.pos.x + 'em');
                this.pipes[i].top.pipe.css('-moz-transform', 'translateZ(0) translateX(' + this.pipes[i].top.pos.x + 'em');
                this.pipes[i].bottom.pipe.css('-moz-transform', 'translateZ(0) translateX(' + this.pipes[i].bottom.pos.x + 'em');

                //Pípan komin út fyrir -> stilla hana uppá nýtt
                if(this.pipes[i].top.pos.x < -this.game.WORLD_WIDTH) {
                    this.pipes[i].top.pos.x = this.game.WORLD_WIDTH / 2;
                    this.pipes[i].bottom.pos.x = this.game.WORLD_WIDTH / 2;
                    var height = Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
                    var bottomHeight = this.game.WORLD_HEIGHT - height - GAP;
                    this.pipes[i].top.pipe.css('height', height + 'em');
                    this.pipes[i].bottom.pipe.css('height', bottomHeight + 'em');
                }
            }
        }
    };

    Pipe.prototype.reset = function() {
      //Stilla pípurnar uppá nýtt
        this.pipes[0].top.pos.x = this.game.WORLD_WIDTH / 2;
        this.pipes[0].bottom.pos.x = this.game.WORLD_WIDTH / 2;
        this.pipes[1].top.pos.x = this.game.WORLD_WIDTH;
        this.pipes[1].bottom.pos.x = this.game.WORLD_WIDTH;
        this.pipes[2].top.pos.x = this.game.WORLD_WIDTH * 1.5;
        this.pipes[2].bottom.pos.x = this.game.WORLD_WIDTH * 1.5;

        for(var i = 0; i < this.pipes.length; i++) {
            if(this.game.firstGame) {
                var height = Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
                var bottomHeight = this.game.WORLD_HEIGHT - height - GAP;
                this.pipes[i].top.pipe.css('height', height + 'em');
                this.pipes[i].bottom.pipe.css('height', bottomHeight + 'em');
            }
            this.pipes[i].top.pipe.css('transform', 'translateZ(0) translateX(' + this.pipes[i].top.pos.x + 'em');
            this.pipes[i].bottom.pipe.css('transform', 'translateZ(0) translateX(' + this.pipes[i].bottom.pos.x + 'em');
            this.pipes[i].top.pipe.css('-webkit-transform', 'translateZ(0) translateX(' + this.pipes[i].top.pos.x + 'em');
            this.pipes[i].bottom.pipe.css('-webkit-transform', 'translateZ(0) translateX(' + this.pipes[i].bottom.pos.x + 'em');
            this.pipes[i].top.pipe.css('-moz-transform', 'translateZ(0) translateX(' + this.pipes[i].top.pos.x + 'em');
            this.pipes[i].bottom.pipe.css('-moz-transform', 'translateZ(0) translateX(' + this.pipes[i].bottom.pos.x + 'em');
        }
        this.game.firstGame = false;
    };

    return Pipe;
})();
