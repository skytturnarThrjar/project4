window.Pipe = (function() {
  'use strict';


  var SPEED = 30;
  var PipeElement = function(pipe, posX, posY) {
    this.pipe = pipe;
    this.pos = {x: posX, y: posY};
  };

  var Pipe = function(el, game) {
    this.el = el;
    this.game = game;
    this.pipes = [
      {id: 'first', top: new PipeElement(this.el.find('.pipeTop1'), 0, 0), bottom: new PipeElement(this.el.find('.pipeBottom1'), 0, 0)},
      {id: 'second', top: new PipeElement(this.el.find('.pipeTop2'), this.game.WORLD_WIDTH / 2, 0), bottom: new PipeElement(this.el.find('.pipeBottom2'), this.game.WORLD_WIDTH / 2, 0)},
      {id: 'third', top: new PipeElement(this.el.find('.pipeTop3'), (this.game.WORLD_WIDTH / 2) * 2, 0), bottom: new PipeElement(this.el.find('.pipeBottom3'), (this.game.WORLD_WIDTH / 2) * 2, 0)}
    ];
  };

  Pipe.prototype.reset = function() {

  };

  Pipe.prototype.onFrame = function(delta) {

    for(var i = 0; i< this.pipes.length; i++) {
      this.pipes[i].top.pos.x -= delta * SPEED;
      this.pipes[i].bottom.pos.x -= delta * SPEED;

      this.pipes[i].top.pipe.css('transform', 'translateZ(0) translateX(' + this.pipes[i].top.pos.x + 'em');
      this.pipes[i].bottom.pipe.css('transform', 'translateZ(0) translateX(' + this.pipes[i].bottom.pos.x + 'em');

      if(this.pipes[i].top.pos.x < -this.game.WORLD_WIDTH) {
        this.pipes[i].top.pos.x = 50;
        this.pipes[i].bottom.pos.x = 50;
        var height = 35;
        var upperHeight = this.game.WORLD_HEIGHT - (height + 15);
        this.pipes[i].top.pipe.css('height' + height + 'em');
        this.pipes[i].bottom.pipe.css('height' + upperHeight + 'em');
      }
    }
  };

  return Pipe;
})();
