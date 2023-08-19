import { GAME_STATUS, GAME_TIME, PAIRS_COLOR } from "./constant.js";
import { checkColorIsFull, getColorELementList, getColorListELement, getReplayButton, setTimerText } from "./selector.js";
import { createTimer, getColorList, hideButtonReplay, showButtonReplay , setBackgroungColor} from "./utils.js";


// global variant
let gamrStatus = GAME_STATUS.PLAYING;
let selection = [];
let timer = createTimer(
    {
        seconds: GAME_TIME,
        onChange: handlerOnChange,
        onFinish: handlerOnFinish
    }
);

function handlerOnChange(seconds) {
    setTimerText(seconds);
}

function handlerOnFinish() {
    setTimerText('GAME OVER');
    showButtonReplay();
    gamrStatus = GAME_STATUS.FINISH;
    selection = [];
}

function initColor() {
    setBackgroungColor('#defcfc');
    const colorList = getColorList(PAIRS_COLOR);
    const liList = getColorELementList();
    liList.forEach((liItem , index) => {

        liItem.dataset.color = colorList[index];
        const overlay = liItem.querySelector('.overlay__color');
        if(overlay) overlay.style.backgroundColor = colorList[index]; 
    })
}

function handlerColorElemtClick(liElement) {
    
    const blockCLick = [GAME_STATUS.FINISH ,  GAME_STATUS.BLOCKING].includes(gamrStatus);  
    const isClicked = liElement.classList.contains('active');

    if(!liElement || blockCLick || isClicked) return;

    liElement.classList.add('active');
    selection.push(liElement);

    if(selection.length < 2) return;

    const firstColor = selection[0].dataset.color;
    const secondColor = selection[1].dataset.color;
    const isMatch = firstColor == secondColor;

    if(isMatch) {

        setBackgroungColor(firstColor);
        const isWin =  checkColorIsFull();
        if(isWin) {

            showButtonReplay();
            setTimerText('YOU WIN');
            gamrStatus = GAME_STATUS.FINISH;
            timer.clear();
        }

        selection = [];
        return; 
    }


    gamrStatus = GAME_STATUS.BLOCKING;
    setTimeout(() => {

        selection[0].classList.remove('active');
        selection[1].classList.remove('active');
        selection = [];
        if(gamrStatus != GAME_STATUS.FINISH) gamrStatus = GAME_STATUS.PLAYING;
    }, 500);
}

function attactColorClick() {

    const colorBoard = getColorListELement();
    if(colorBoard) {
   
        colorBoard.addEventListener('click' , (event) => {

            if(event.target.tagName != 'LI') return;
            handlerColorElemtClick(event.target);
        })
    }
}

function resetGame() {
    // reset Global
    const buttonReplay = getReplayButton();
    buttonReplay.textContent = "REPLAY";
    console.log('reset game');
    gamrStatus = GAME_STATUS.PLAYING;
    selection = [];   

    // reset DOM elemets
    setTimerText('');
    hideButtonReplay();
    const LiList = getColorELementList();
    LiList.forEach((liItem) =>  {
        liItem.classList = '';
    })
    // Re-genarate colorList
    initColor();
    // Start timer for new game
    startTimer();
}

function attactEventButton() {

    const buttonReplay = getReplayButton();
    if(buttonReplay) {

        buttonReplay.addEventListener('click', resetGame);
    }
}

function startTimer() {

    timer.start();
}


(() => {    

    initColor();
    attactColorClick();
    attactEventButton();
    showButtonReplay();
})();