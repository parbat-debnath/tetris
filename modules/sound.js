export const audioCtx = new (window.AudioContext || window.webkitAudioContext) ();
let soundLibrary = {};

async function loadSound(name, url) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
    soundLibrary[name] = audioBuffer;
}


loadSound('gameOver', '../assets/sounds/game-over.mp3');
loadSound('gameStart', '../assets/sounds/game-start.mp3');
loadSound('lineCleared', '../assets/sounds/line-cleared.mp3');
loadSound('move', '../assets/sounds/move.mp3');
loadSound('teleportDown', '../assets/sounds/teleport-down.mp3');
loadSound('victory', '../assets/sounds/victory.mp3');

export function playSFX(name) {
    if(!soundLibrary[name]) {
        console.log("sound library doesn't contains", name);
        return;
    }

    const source = audioCtx.createBufferSource();
    source.buffer = soundLibrary[name];
    source.connect(audioCtx.destination);
    source.start(0);
}