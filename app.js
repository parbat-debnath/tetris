import * as mod from './modules/logic.js'

const gameArea = document.querySelector("#gamearea");


gameArea.dataset.height = "24";
gameArea.dataset.width = "12";

mod.loadMatrix(gameArea);

let square = [{x : 0, y : 0}, {x : 0, y : 1}, {x : 1, y : 0}, {x : 1, y : 1}];

mod.startFall(2,square, gameArea);