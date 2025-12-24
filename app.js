import * as util from './utils/logic.js'

const gameArea = document.querySelector("#gamearea");


gameArea.dataset.height = "24";
gameArea.dataset.width = "12";

util.loadMatrix(gameArea);

let square = [{x : 0, y : 0}, {x : 0, y : 1}, {x : 1, y : 0}, {x : 1, y : 1}];

util.startFall(2,square, gameArea);