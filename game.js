import * as logic from "./modules/logic.js";
import * as utility from "./modules/utility.js";

export const gameArea = document.querySelector("#gamearea");
gameArea.dataset.height = 24;

export let gamePaused;

export function toggleGamePlayPause() {
  if(gamePaused) gamePaused = false;
  else gamePaused = true;
}

const square_chunk = [
  { x: 0, y: 0 },
  { x: 0, y: 1 },
  { x: 1, y: 0 },
  { x: 1, y: 1 },
];
const z_chunk = [
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: 1, y: 1 },
  { x: 2, y: 1 },
];
const reverseZ_chunk = [
  { x: 0, y: 1 },
  { x: 1, y: 1 },
  { x: 1, y: 0 },
  { x: 2, y: 0 },
];
const l_chunk = [
  { x: 0, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: 2 },
  { x: 0, y: 3 },
];
const t_chunk = [
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: 1, y: 1 },
  { x: 2, y: 0 },
];

const chunks = [];
chunks.push(square_chunk);
chunks.push(z_chunk);
chunks.push(reverseZ_chunk);
chunks.push(l_chunk);
chunks.push(t_chunk);

let speed = 100;
export let currenTaskId;

export function setTaskId(id) {
  currenTaskId = id;
}

function gameStart() {
  gamePaused = false;
  utility.loadGrid(24, 12, gameArea);
  dropRandomChunkLoop(chunks);
}

export function play() {}

export function pause() {
  clearInterval(currenTaskId);
}

export function reset(taskId) {
  clearInterval(currenTaskId);
  utility.clearContiner(gameArea);
  dropRandomChunkLoop(chunks);
}

function gameOver() {
  alert("Game Over");
  utility.clearContiner(gameArea);
  return;
}

function dropRandomChunk(chunks) {
  let chunk = chunks[Math.floor(Math.random() * chunks.length)];
  let promise = logic.freeFallChunk(chunk, gameArea, speed); // -----> passing chunk data

  return promise;
}

function dropRandomChunkLoop(chunks) {
  dropRandomChunk(chunks)
    .then(() => {
      dropRandomChunkLoop(chunks);
    })
    .catch(() => {
      gameOver();
    });
}

gameStart();