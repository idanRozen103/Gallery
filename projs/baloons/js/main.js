'use strict';

var gBalloons = []
// var gBalloons = createBalloons(10)

var gInterval;


function init() {
    createBalloon(+prompt('Choose baloons number'))
    gInterval = setInterval(moveBalloon, 250)
}


// @CR - It's better to have a createBaloons function that will cal the createBallon function
function createBalloon(num) {
    var strHTML = '';
    var marginLeft = getRandomInteger(50,100);
    for (var i = 0; i < num; i++) {
        gBalloons.push({ bottom: 0, speed: getRandomInteger(5, 50) });
        strHTML = '<div class="balloon balloon' + (i + 1) + '" onclick="popUBalloon(' + (i + 1) + ')" style="margin-left:' +
            marginLeft + 'px; width: 130px; height: 175px; background: linear-gradient(45deg,' + getRandomColor() + ', rgb(255, 239, 205)" ></div>'
        var elSky = document.querySelector('.sky');
        elSky.innerHTML += strHTML
        marginLeft += getRandomInteger(50,150)
        // @CR - you can also inject into the HTML (marginLeft * i ) insted of increasing it
    }
}


function moveBalloon() {
    for (var i = 0; i < gBalloons.length; i++) {
        var elBalloon = document.querySelector('.balloon' + (i + 1));
        gBalloons[i].bottom += gBalloons[i].speed;
        elBalloon.style.bottom = gBalloons[i].bottom + 'px';
        // clearInterval(gInterval);       
    }

}

function popUBalloon(num) {
    var elBalloon = document.querySelector('.balloon' + num);
    elBalloon.style.width = '150px';
    elBalloon.style.height = '200px';
    elBalloon.style.visibility = 'hidden';
    elBalloon.style.opacity = '0';
     elBalloon.style.transition = 'visibility 1s, opacity 0.1s linear';
    var sound = new Audio("/audio/audio_file.mp3")
    sound.play();
}
// @CR - very good! nice use of CSS


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getRandomInteger(min, max) {
    var num = Math.floor((Math.random() * (max - min)) + min);
    return num;
}


/*  -----------------------------------------------------------
function createBalloons(num) {
    var balloons = []
    for (var i = 0; i < num; i++) {
        Balloons.push(createBalloon());
    }
    return balloons
}


function createBalloon() {
    return {
        bottom: 0,
        speed: getRandomInteger(5, 50)
    }
}


function renderBalloon (){
                                                //לסיים
}
 */