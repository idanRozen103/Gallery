const KEY = 'questions'
var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;

function createQuestsTree() {
    gQuestsTree = loadFromStorage(KEY)
    if (!gQuestsTree) {
        gQuestsTree = createQuest('Male?');

        gQuestsTree.yes = createQuest('Gandhi');
        gQuestsTree.no = createQuest('Rita');
    }
    gCurrQuest = gQuestsTree;
    gPrevQuest = null;

}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}

function moveToNextQuest(res) {
    gPrevQuest = gCurrQuest;  // TODO: update the gPrevQuest, gCurrQuest global vars
    gCurrQuest = gPrevQuest[res]

}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
    gPrevQuest[gLastRes] = createQuest(newQuestTxt)   // TODO: Create and Connect the 2 Quests to the quetsions tree
    gPrevQuest[gLastRes].yes = createQuest(newGuessTxt)
    gPrevQuest[gLastRes][lastRes] = createQuest(gCurrQuest.txt)
    saveToStorage(KEY, gQuestsTree);
}
   

function getCurrQuest() {
    return gCurrQuest
}

function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}

function loadFromStorage(key) {
    var val = localStorage.getItem(key)
    return JSON.parse(val)
}