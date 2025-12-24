export function loadMatrix(gamearea) {
  // generates a matrix of size 30 X 24

  for (let j = 1; j <= +gamearea.dataset.height; j++) {
    for (let i = 1; i <= +gamearea.dataset.width; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.id = `${i},${j}`;
      cell.dataset.x = i;
      cell.dataset.y = j;
      gamearea.appendChild(cell);
    }
  }
}

export function getCell(x, y, container) {
  return container.children[(y - 1) * 12 + x - 1];
}

// cell data -----> let square = [{x : 0, y : 0}, {x : 0, y : 1}, {x : 1, y : 0}, {x : 1, y : 1}];

export function startFall(startingPosX = 0, block, container) {
  let movingY = -1;
  let speed = 100;
  let previousCells = [];

  function move() {
    if (canMoveFurther(previousCells, container)) {
      for (let cell of previousCells) {
        if (cell) cell.classList.remove("active"); // removes the previous active cells
      }

      previousCells = [];

      for (let cellData of block) {
        let cell = getCell(
          cellData.x + 1 + startingPosX,
          cellData.y + movingY,
          container
        );

        previousCells.push(cell);
        if (cell) cell.classList.add("active");
      }
    }
  }

  setInterval(() => {
    move();
    if (canMoveFurther(previousCells, container)) movingY++;
  }, speed);

  function canMoveFurther(cellStack, container) {
    for (let cell of cellStack) {
      if (!cell) continue;

      let curX = +cell.dataset.x;
      let curY = +cell.dataset.y;
      if (curY >= +container.dataset.height) {
        return false;
      }

      let frontCell = getCell(+cell.dataset.x, +cell.dataset.y + 1, container);
      if (frontCell) {
        if (
          frontCell.classList.contains("active") &&
          !isInCellStack(cellStack, frontCell)
        ) {
          console.log("got here");
          return false;
        }
      }
    }

    return true;
  }
}

// determines dimention of arrays

// function getDimention(cellArray = []) {
//   let maxX = -999;
//   let minX = 999;
//   let maxY = -999;
//   let minY = 999;

//   for (let cell of cellArray) {
//     if (cell.x < minX) minX = cell.x;
//     if (cell.x > maxX) maxX = cell.x;
//     if (cell.y < minY) minY = cell.y;
//     if (cell.y > maxY) minY = cell.y;
//   }

//   return { height: maxY - minY + 1, width: maxX - minX + 1 };
// }

function isInCellStack(cellStack, cell) {
  for (let cellElement of cellStack) {
    if (cellElement === cell) return true;
  }

  return false;
}