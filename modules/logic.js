import * as utility from "./utility.js";
export function freeFallChunk(_chunkData, container, speed) {
  return new Promise(function (resolve, reject) {
    let chunkData = structuredClone(_chunkData);
    let intarvalId = setInterval(() => {
      if (!canMoveDown(chunkData, container)) {
          clearInterval(intarvalId);
        resolve();
        return;
      }

      let chunkHeight = utility.getDimention(_chunkData).height;
      console.log(chunkHeight);
      
      let chunkWidth = utility.getDimention(_chunkData).width;

      for (let cellData of chunkData) {
        let cell = utility.getCellFromData(
          cellData.x + 1,
          cellData.y + 1,
          container
        );
        if (cell) cell.classList.remove("active");
      }

      for (let cellData of chunkData) {
        cellData.y++;
        let cell = utility.getCellFromData(
          cellData.x + 1,
          cellData.y + 1,
          container
        );
        if (cell) cell.classList.add("active");
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
