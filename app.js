import * as util from './utils/logic.js'

const gameArea = document.querySelector("#gamearea");

util.loadMatrix(gameArea);

let square = [{x : 0, y : 0}, {x : 0, y : 1}, {x : 1, y : 0}, {x : 1, y : 1}];

util.startFall(square, gameArea);