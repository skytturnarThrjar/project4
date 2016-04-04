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
  if(audioClass === 'on') {
    document.getElementById('backgroundSong').pause();
    document.getElementById('backgroundSong').className = 'off';
    document.getElementById('yoSound').className = 'off';
    document.getElementById('laugh').className = 'off';
  }
  else if(audioClass === 'off') {
    document.getElementById('backgroundSong').play();
    document.getElementById('backgroundSong').volume = 0.5;
    document.getElementById('backgroundSong').className = 'on';
    document.getElementById('yoSound').className = 'on';
    document.getElementById('laugh').className = 'on';
  }


};
