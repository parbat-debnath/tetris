import * as utility from "./utility.js";
export function freeFallChunk(_chunkData, container, speed) {
  let containerWidth = +container.dataset.width || 12;
  let chunkWidth = utility.getDimention(_chunkData).width;
  let currentY = 0;

  let startingPoint = Math.floor(
    Math.random() * (containerWidth - chunkWidth + 1)
  );

  return new Promise(function (resolve, reject) {
    let chunkData = structuredClone(_chunkData);
    let chunkHeight = utility.getDimention(_chunkData).height;
    let chunkWidth = utility.getDimention(_chunkData).width;
    for (let cellData of chunkData) {
      cellData.x += startingPoint;
      cellData.y -= chunkHeight;
      if(cellData.y > currentY) currentY = cellData.y;
    }

    let intarvalId = setInterval(() => {
      if (!canMoveDown(chunkData, container)) {
        if (currentY < chunkHeight) {
          clearInterval(intarvalId);
          console.log("Top occupied : game over");
          reject();
          return;
        } else {
          clearInterval(intarvalId);
          resolve();
          return;
        }
      }

      for (let cellData of chunkData) {
        let cell = utility.getCellFromData(
          cellData.x + 1,
          cellData.y + 1,
          container
        );
        if (cell) cell.classList.remove("active");
      }

      for (let cellData of chunkData) {
        if (cellData.y > currentY) currentY = cellData.y;
        cellData.y++;
        let cell = utility.getCellFromData(
          cellData.x + 1,
          cellData.y + 1,
          container
        );
        if (cell) {
          cell.classList.add("active");
          if (cellData.y > currentY) {
            // updating currentY
            currentY = cellData.y;
            
          }
        }
      }
    }, speed);
  });
}

function canMoveDown(chunkData, container) {
  // returns true if cell below is not active or cell itself is not defined else, returns false.
  for (let cellData of chunkData) {
    let nextCellData = { x: cellData.x, y: cellData.y + 1 };
    let nextCell = utility.getCellFromData(
      cellData.x + 1,
      cellData.y + 2,
      container
    );

    // checking for chunk occupency

    if (nextCell) {
      if (
        utility.isOccupied(nextCell) &&
        !utility.isInChunk(nextCellData, chunkData)
      ) {
        console.log("settled");
        return false;
      }
    }

    // checking for ground

    if (nextCellData.y >= +container.dataset.height) {
      console.log("Ground reached.");

      return false;
    }
  }

  return true;
}