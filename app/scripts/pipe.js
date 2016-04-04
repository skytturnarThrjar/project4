window.Pipe = (function() {
  'use strict';

  var Pipe = function(pipe, posX, posY) {
    this.pipe = pipe;
    this.pos = {x: posX, y: posY};
  };

  return Pipe;
})();
