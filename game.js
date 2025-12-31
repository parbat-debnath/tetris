import * as logic from "./modules/logic.js";
import * as utility from "./modules/utility.js";

export const gameArea = document.querySelector("#gamearea");
gameArea.dataset.height = 24;
gameArea.dataset.width = 12;

export let gamePaused;
export let currentChunkData;
const scoreBoard = document.querySelector("#score");
let score = 0;
scoreBoard.textContent = score;

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
  { x: 1, y: 2 },
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

export function restart() {
  gamePaused = false;
  score = 0;
  updateScore();
  clearInterval(currenTaskId);
  utility.clearContiner(gameArea);
  console.clear();
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
  if (logic.canMoveRight(currentChunkData, gameArea) && !gamePaused) {
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
    return;
  }
}

export function moveLeft() {
  if (logic.canMoveLeft(currentChunkData, gameArea) && !gamePaused) {
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
    return;
  }
}

export function moveDown() {
  if (logic.canMoveDown(currentChunkData, gameArea) && !gamePaused) {
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
    return;
  }
}

export function moveBottom() {
  while (logic.canMoveDown(currentChunkData, gameArea) && !gamePaused) {
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

export function rotate() {
  if (!gamePaused) {
    let chunkData = structuredClone(currentChunkData);
    let centerX = utility.getCenterCellCoord(chunkData).x;
    let centerY = utility.getCenterCellCoord(chunkData).y;

    for (let cellData of chunkData) {
      // rotating
      let relX = cellData.x - centerX;
      let relY = cellData.y - centerY;

      let newX = -relY;
      let newY = relX;

      cellData.x = newX + centerX;
      cellData.y = newY + centerY;
    }

    let offSetX = utility.getCenterCellCoord(chunkData).x - centerX;
    let offSetY = utility.getCenterCellCoord(chunkData).y - centerY;

    for (let cellData of chunkData) {
      cellData.x -= offSetX;
      cellData.y -= offSetY;
    }

    if (logic.canRotate(chunkData, gameArea)) {
      // removing 'active' class from current cells
      for (let cellData of currentChunkData) {
        let cell = utility.getCellFromData(cellData.x, cellData.y, gameArea);
        cell.classList.remove("active");
      }

      // updating current cells
      setCurrentChunkData(chunkData);

      // adding 'active' class to current cells
      for (let cellData of chunkData) {
        let cell = utility.getCellFromData(cellData.x, cellData.y, gameArea);
        cell.classList.add("active");
      }

      return;
    }

    if (
      utility.getLowestXCoord(chunkData) < 1 ||
      utility.getHighestXCoord(chunkData) > +gameArea.dataset.width
    ) {

      let maxOffHorizontalBoundery = 0;
      if (utility.getLowestXCoord(chunkData) < 1) {   // left boundery
        maxOffHorizontalBoundery = utility.getLowestXCoord(chunkData);

        for (let cellData of chunkData) {
          cellData.x -= maxOffHorizontalBoundery - 1;
        }
      } else {    // right boundery
        maxOffHorizontalBoundery =
          utility.getHighestXCoord(chunkData) - +gameArea.dataset.width;
        for (let cellData of chunkData) {
          cellData.x -= maxOffHorizontalBoundery;
        }
      }

      // removing 'active' class from current cells
      for (let cellData of currentChunkData) {
        let cell = utility.getCellFromData(cellData.x, cellData.y, gameArea);
        cell.classList.remove("active");
      }

      // updating current cells
      setCurrentChunkData(chunkData);

      // adding 'active' class to current cells
      for (let cellData of currentChunkData) {
        let cell = utility.getCellFromData(cellData.x, cellData.y, gameArea);
        cell.classList.add("active");
      }

      return;
    } else {
      return;
    }
  }
}

export function getCompletedLayers() {
  let clearedLevels = [];
  let i , j;
  for(j = +gameArea.dataset.height; j > 0; j--) {
    for(i = +gameArea.dataset.width; i > 0; i--) {
      let cell = utility.getCellFromData(i, j, gameArea);
      if(!cell.classList.contains("fixed")) {
        break;
      }
    }
    if(i === 0) clearedLevels.push(j);
  }

  return clearedLevels;
}

export function clearLayers(levelsToBeCleared = []) {
  for(let level of levelsToBeCleared) {
    for(let i = +gameArea.dataset.width; i > 0; i--) {
      let cell = utility.getCellFromData(i, level, gameArea);
      cell.classList.remove("fixed");
    }
  }
}

export function updateScore() {
  let completedLayers = getCompletedLayers();
  for(let layers of completedLayers) {
    score++;
    scoreBoard.textContent = score;
    console.log(score);
  }
}

gameStart();
