export function getColorELementList() {
    
    return document.querySelectorAll('#game__board > li');
}

export function getColorListELement() {
    
    return document.getElementById('game__board');
}

export function getTimerELement() {
    
    return document.getElementById('game__timer');
}

export function getReplayButton() {
    
    return document.getElementById('replay__button');
}

export function setTimerText(text) {

    const timerText = getTimerELement();
    if(timerText) timerText.textContent = text;
}

export function checkColorIsFull() {

    const colorItem = document.querySelectorAll('#game__board > li:not(.active)');
    
    return colorItem.length == 0;
}