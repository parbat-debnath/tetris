import * as utility from "./utility.js";
import * as main from "../game.js";

export let currentY;

export function increaseCurrentYBy(number) {
  currentY += number;
}

export function freeFallChunk(chunkData, container, speed) {
  currentY = utility.getHighestYCoord(chunkData);
  return new Promise(function (resolve, reject) {
    let currentTaskId = setInterval(() => {
      if (canMoveDown(main.currentChunkData, container)) {
        // removing current "active" class from current active cells
        for (let cellData of main.currentChunkData) {
          let cell = utility.getCellFromData(cellData.x, cellData.y, container);
          if (cell) {
            cell.classList.remove("active");
          }
        }

        // changing chunkData's value to new position

        for (let cellData of main.currentChunkData) {
          cellData.y++;
        }

        
        main.setCurrentChunkData(main.currentChunkData); // -----> updating current chunk data
        currentY = utility.getHighestYCoord(main.currentChunkData);

        // adding "active" class to new chunk positions

        for (let cellData of main.currentChunkData) {
          let cell = utility.getCellFromData(cellData.x, cellData.y, container);
          cell.classList.add("active");
        }
      } else {
        // cannot move down : either chunk settled or game over

        if (currentY < utility.getDimention(main.currentChunkData).height) {
          // -----> game over
          console.log("Game over : top reached");
          clearInterval(currentTaskId);
          reject();
          return;
        } else {
          // -----> reached bottom : settled
          utility.fixChunk(main.currentChunkData, container);
          let completedLayers = main.getCompletedLayers();
          for(let layer of completedLayers) {
            main.updateScore();
          }
          main.clearLayers(main.getCompletedLayers());
          utility.resetToBottom(container);
          clearInterval(currentTaskId);
          main.increaseSpeedBy(1.0005);
          resolve();
          return;
        }
      }
    }, speed);

    main.setTaskId(currentTaskId);
  });
}

export function canMoveDown(chunkData, container) {
  for (let cellData of chunkData) {
    let nextCell = utility.getCellFromData(
      cellData.x,
      cellData.y + 1,
      container
    );

    // cheking if bottom reached
    if (nextCell.dataset.y > +container.dataset.height) {
      return false;
    } else if (utility.isFixed(nextCell)) {
      return false;
    }
  }

  return true;
}

export function canMoveRight(chunkData, container) {
  let rightMostCoord = utility.getHighestXCoord(chunkData);
  // checking for border
  if (rightMostCoord >= +container.dataset.width) {
    return false;
  }

  for (let cellData of chunkData) {
    if (cellData.x === rightMostCoord) {
      let nextCell = utility.getCellFromData(cellData.x + 1, cellData.y, container);
      // checking for fixed cells
      if (utility.isFixed(nextCell)) {
        return false;
      }
    }
  }

  return true;
}

export function canMoveLeft(chunkData, container) {
  let leftMostCoord = utility.getLowestXCoord(chunkData);
  // checking for border
  if (leftMostCoord <= 1) {
    return false;
  }

  for (let cellData of chunkData) {
    if (cellData.x === leftMostCoord) {
      let nextCell = utility.getCellFromData(cellData.x - 1, cellData.y, container);
      // checking for fixed cells
      if (utility.isFixed(nextCell)) {
        return false;
      }
    }
  }

  return true;
}

export function canRotate(chunkData, container) {
  for(let cellData of chunkData) {    // checking for fixed cells
    let cell = utility.getCellFromData(cellData.x, cellData.y, container);
    if(utility.isFixed(cell)) {
      return false;
    }
  }

  for(let cellData of chunkData) {    // checking for boundery condition
    if(cellData.x > +container.dataset.width || cellData.x < 1 || cellData.y > +container.dataset.height) {
      return false;
    }
  }

  return true;
}