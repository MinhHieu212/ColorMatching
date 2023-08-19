import { getReplayButton } from "./selector.js";

function shuffleList(arr) {
    
    if(!Array.isArray(arr) || arr.length <= 2) return;

    for(let i = arr.length - 1 ; i > 1 ; i--) {

        const j = Math.floor(Math.random() * i);
        const temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
    }
}


export function getColorList(number) {

    const hueList = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink' , 'monochrome'];
    const subColorList = [];

    for(let i = 0 ; i < number ; i++) {

        const color = randomColor({
            luminosity: 'dark',
            hue:  hueList[i % hueList.length]
        });

        subColorList.push(color);
    }

    const colorList = [...subColorList, ...subColorList];

    shuffleList(colorList);

    return colorList;
}

export function showButtonReplay() {

    const buttonReplay = getReplayButton();
    if(buttonReplay) buttonReplay.classList.add('show');
} 

export function hideButtonReplay() {
    
    const buttonReplay = getReplayButton();
    if(buttonReplay) buttonReplay.classList.remove('show');
}

export function createTimer({seconds , onChange , onFinish}) {

    
    let intervalId = null;
    function start() {

        clear();
        let currentSeconds = seconds;
        intervalId = setInterval(() => {
            
            onChange(currentSeconds);
            currentSeconds--;
            if(currentSeconds < 0) {

                onFinish();
                clear();
            }
        }, 1000); 
    } 

    function clear() {

        clearInterval(intervalId);
    }

    return {
        start,
        clear
    }
}

export function setBackgroungColor(color) {
    const bgcolor = document.getElementById('game__page');
    if(bgcolor)  bgcolor.style.backgroundColor = color;
    else console.log('acdac');
}