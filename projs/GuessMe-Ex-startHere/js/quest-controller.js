'use strict';

// NOTE: This is a global used only in the controller
var gLastRes = null;

$(document).ready(init);

function init() {
    createQuestsTree()
}

function onStartGuessing() {
    $('header').css({ "background-color": "white", 'transform': 'translateX(-20%)', 'transition': ' transform 1s' })
    $('header').removeClass('shadow')
    $('.game-start').hide()       // TODO: hide the game-start section

    renderQuest();
    $('.quest').show();      // TODO: show the quest section
}

function renderQuest() {
    if (!gLastRes) $('.quest h2').text(gCurrQuest.txt)      // TODO: select the <h2> inside quest and update its text by the currQuest text

    else {
        $('.quest h2').text(gPrevQuest[gLastRes].txt)
    }
}

function onUserResponse(res) {
    if (isChildless(getCurrQuest())) {       // If this node has no children
        if (res === 'yes') {
            alert('Yes, I knew it!');             // TODO: improve UX
        } else {
            alert('I dont know...teach me!')
            $('.quest').hide()              // TODO: hide and show new-quest section
            $('.new-quest').show()
        }
    } else {
        gLastRes = res          // TODO: update the lastRes global var
        moveToNextQuest(res);
        renderQuest();
    }
}

function onAddGuess() {
    var $ElGuess = $('[name=newGuess]')     // TODO: Get the inputs' values
    var newGuess = $ElGuess.val() 

    var $elQuest = $('[name=newQuest]')
    var newQuest = $elQuest.val()
 
    addGuess(newQuest, newGuess, 'no')   // TODO: Call the service addGuess 
    onRestartGame();
}


function onRestartGame() {
    $('.new-quest').hide();
    gLastRes = null;
    $('.game-start').show();
    init();
}

