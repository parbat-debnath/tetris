import * as logic from "./modules/logic.js";
import * as utility from "./modules/utility.js";

export const gameArea = document.querySelector("#gamearea");
gameArea.dataset.height = 24;
gameArea.dataset.width = 12;

export let gamePaused;
export let currentChunkData;

export function toggleGamePlayPause() {
  if (gamePaused) gamePaused = false;
  else gamePaused = true;
}

export function setCurrentChunkData(chunkData) {
  currentChunkData = structuredClone(chunkData);
}

const square_chunk = [
  { x: 0, y: 0 },
  { x: 0, y: 1 },
  { x: 1, y: 0 },
  { x: 1, y: 1 },
];
const Z_chunk = [
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
const I_chunk = [
  { x: 0, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: 2 },
  { x: 0, y: 3 },
];
const T_chunk = [
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: 1, y: 1 },
  { x: 2, y: 0 },
];
const L_chunk = [
  { x: 0, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: 2 },
  { x: 2, y: 2 },
];
const reverseL_chunk = [
  { x: 1, y: 0 },
  { x: 1, y: 1 },
  { x: 1, y: 2 },
  { x: 0, y: 2 },
];

export const chunks = [];
chunks.push(square_chunk);
chunks.push(Z_chunk);
chunks.push(reverseZ_chunk);
chunks.push(I_chunk);
chunks.push(T_chunk);
chunks.push(L_chunk);
chunks.push(reverseL_chunk);

let speed = 600;
export let currenTaskId;

export function setTaskId(id) {
  currenTaskId = id;
}

function gameStart() {
  gamePaused = false;
  utility.loadGrid(24, 12, gameArea);
  dropRandomChunkLoop(chunks);
}

export function resume() {
  gamePaused = false;
  let promise = logic.freeFallChunk(currentChunkData, gameArea, speed);
  promise
    .then(() => {
      dropRandomChunkLoop(chunks);
    })
    .catch(() => {
      gameOver();
    });
}

export function pause() {
  clearInterval(currenTaskId);
  gamePaused = true;
}

export function reset(taskId) {
  gamePaused = false;
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

  currentChunkData = structuredClone(chunk);

  let containerWidth = +gameArea.dataset.width || 12;
  let chunkWidth = utility.getDimention(currentChunkData).width;
  let startingPoint = Math.floor(
    Math.random() * (containerWidth - chunkWidth + 1)
  );

  setStartingPoint(currentChunkData, startingPoint); // -----> setting chunk at a random position
  chunkOffsetY(currentChunkData); // -----> offsetting chunk according to chunk height
  chunkOffsetX(currentChunkData); // -----> offsetting x by one

  let promise = logic.freeFallChunk(currentChunkData, gameArea, speed); // -----> passing chunk data

  return promise;
}

function setStartingPoint(chunkData, startingPoint) {
  for (let cellData of chunkData) {
    cellData.x += startingPoint;
  }
}

function chunkOffsetY(chunkData) {
  let chunkHeight = utility.getDimention(chunkData).height;
  for (let cellData of chunkData) {
    cellData.y -= chunkHeight + 1;
  }
}

function chunkOffsetX(chunkData) {
  for (let cellData of chunkData) {
    cellData.x++;
  }
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

export function moveRight() {
  if (logic.canMoveRight(currentChunkData, gameArea)) {
    for (let cellData of currentChunkData) {
      let cell = utility.getCellFromData(cellData.x, cellData.y, gameArea);
      cell.classList.remove("active"); // removing "active" from current chunk
    }

    for (let cellData of currentChunkData) {
      // updating position position
      cellData.x++;
    }

    setCurrentChunkData(currentChunkData);

    for (let cellData of currentChunkData) {
      let cell = utility.getCellFromData(cellData.x, cellData.y, gameArea);
      cell.classList.add("active"); // adding "active" from current chunk
    }
  } else {
    console.log("cannot move right");
  }
}

export function moveLeft() {
  if (logic.canMoveLeft(currentChunkData, gameArea)) {
    for (let cellData of currentChunkData) {
      let cell = utility.getCellFromData(cellData.x, cellData.y, gameArea);
      cell.classList.remove("active"); // removing "active" from current chunk
    }

    for (let cellData of currentChunkData) {
      // updating position position
      cellData.x--;
    }

    setCurrentChunkData(currentChunkData);

    for (let cellData of currentChunkData) {
      let cell = utility.getCellFromData(cellData.x, cellData.y, gameArea);
      cell.classList.add("active"); // adding "active" from current chunk
    }
  } else {
    console.log("cannot move left");
  }
}

export function moveDown() {
  if (logic.canMoveDown(currentChunkData, gameArea)) {
    for (let cellData of currentChunkData) {
      let cell = utility.getCellFromData(cellData.x, cellData.y, gameArea);
      cell.classList.remove("active"); // removing "active" from current chunk
    }

    for (let cellData of currentChunkData) {
      // updating position position
      cellData.y++;
    }

    setCurrentChunkData(currentChunkData);

    for (let cellData of currentChunkData) {
      let cell = utility.getCellFromData(cellData.x, cellData.y, gameArea);
      cell.classList.add("active"); // adding "active" from current chunk
    }
  } else {
    console.log("cannot move down");
  }
}

export function moveBottom() {
  while (logic.canMoveDown(currentChunkData, gameArea)) {
    for (let cellData of currentChunkData) {
      let cell = utility.getCellFromData(cellData.x, cellData.y, gameArea);
      cell.classList.remove("active"); // removing "active" from current chunk
    }

    for (let cellData of currentChunkData) {
      // updating position position
      cellData.y++;
    }

    setCurrentChunkData(currentChunkData);

    for (let cellData of currentChunkData) {
      let cell = utility.getCellFromData(cellData.x, cellData.y, gameArea);
      cell.classList.add("active"); // adding "active" from current chunk
    }
  }
}

gameStart();
