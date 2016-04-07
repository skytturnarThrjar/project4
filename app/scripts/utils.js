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
        document.getElementById('chiching').className = 'off';
    }
    else if(audioClass === 'off') {
        document.getElementById('backgroundSong').play();
        document.getElementById('backgroundSong').volume = 0.5;
        document.getElementById('backgroundSong').className = 'on';
        document.getElementById('yoSound').className = 'on';
        document.getElementById('laugh').className = 'on';
        document.getElementById('chiching').className = 'on';
    }
};

var changeImage = function() {

    'use strict';
    var imageClass = document.getElementById('muteImage').className;
    if(imageClass === 'on') {
        document.getElementById('muteImage').className = 'off';
        document.getElementById('muteImage').src = '/images/volumeMute.png';
    }
    else if(imageClass === 'off') {
        document.getElementById('muteImage').className = 'on';
        document.getElementById('muteImage').src = '/images/volume.png';
    }
};
