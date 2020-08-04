'use strics';

var gCurrQuestIdx = 0;
var pic = document.querySelector('.box img')
var answer1 = document.querySelector('.answer.answer1')
var answer2 = document.querySelector('.answer.answer2')
var gElZoom = false;

gQuest = [
    { id: 1, picSrc:  "./img/1.jpg", opts: ['Budapest', 'China'], correctOptIndex: 1 },
    { id: 2, picSrc: "./img/2.jpg", opts: ['South Africa', 'Ramat-Gan Safari Park'], correctOptIndex: 2 },
    { id: 3, picSrc: "./img/3.jpg", opts: ['mushrooms', 'Potato chips'], correctOptIndex: 1 }
]

function init() {
    
    gCurrQuestIdx = 0
    gElZoom = true;
    // zoom()
    createQuest();
    renderQuest();
}

function renderQuest() {
    gElZoom = true
    if (gCurrQuestIdx > 0) {
        document.querySelector('.reset-button').innerText = 'Start Over';
    }
    pic.src = gQuest[gCurrQuestIdx].picSrc;
    answer1.innerText = `${gQuest[gCurrQuestIdx].opts[0]}`;
    answer2.innerText = `${gQuest[gCurrQuestIdx].opts[1]}`;
    zoom()
}

function createQuest() {
    document.querySelector('.reset-button').innerText = 'New Game'
    pic.src = gQuest[0].picSrc;
    answer1.innerText = `${gQuest[0].opts[0]}`;
    answer2.innerText = `${gQuest[0].opts[1]}`;

}

function checkAnswer(optIdx) {
    if (optIdx !== gQuest[gCurrQuestIdx].correctOptIndex) {
        alert('try again')
    } else {
        alert('great!')
        gCurrQuestIdx++
        if (gCurrQuestIdx === gQuest.length) {
            if (confirm('Good job! \nStart over?')) {
                init()
            } else {
                return
            }
        }
        renderQuest()
    }
}

function zoom() {
    gElZoom = !gElZoom
    if (gElZoom) {
        
        pic.style.zIndex = 10;
        pic.style.zoom = 1.50;
        pic.style.margin = '2px -40px';
        pic.style.cursor = 'zoom-out';

    }
    else {
        pic.style.zoom = 1;
        pic.style.marginTop = '5px';
        pic.style.marginLeft = '10%';
        pic.style.width = '40vw';
        pic.style.maxHeight = '55vh';
        pic.style.cursor = 'zoom-in';
    }
}

