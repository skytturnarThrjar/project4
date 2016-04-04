/**
 * Cross browser RequestAnimationFrame
 */
if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (function() {
        'use strict';
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(/* function */ callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();
}

var mute = function() {
  'use strict';
  var audioClass = document.getElementById('backgroundSong').className;
  console.log(audioClass);
  if(audioClass === 'on') {
    document.getElementById('backgroundSong').pause();
    document.getElementById('backgroundSong').className = '';
    document.getElementById('backgroundSong').className = 'off';
  }
  else if(audioClass === 'off') {
    document.getElementById('backgroundSong').play();
    document.getElementById('backgroundSong').className = '';
    document.getElementById('backgroundSong').className = 'on';
  }
};
