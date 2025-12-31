export function loadGrid(height = 24, width = 12, container) {
  for (let j = 1; j <= height; j++) {
    for (let i = 1; i <= width; i++) {
      let cell = document.createElement("div");
      cell.dataset.x = i;
      cell.dataset.y = j;
      cell.classList.add("cell");

      container.appendChild(cell);
    }
  }
}

export function getCellFromData(x, y, container) {
  let cell = container.children[(y - 1) * 12 + (x - 1)];
  if (!cell) {
    cell = document.createElement("div");
    cell.dataset.x = x;
    cell.dataset.y = y;
  }
  return cell;
}

export function isInChunk(targetCellData, chunkData) {
  for (let cellData of chunkData) {
    if (cellData.x === targetCellData.x && cellData.y === targetCellData.y) {
      return true;
    }
  }

  return false;
}

export function isFixed(cell) {
  if (cell.classList.contains("fixed")) {
    return true;
  } else return false;
}

export function getDimention(chunkData) {
  let maxX = -999;
  let maxY = -999;
  let minX = 999;
  let minY = 999;
  for (let cellData of chunkData) {
    if (cellData.x < minX) minX = cellData.x;
    if (cellData.y < minY) minY = cellData.y;
    if (cellData.x > maxX) maxX = cellData.x;
    if (cellData.y > maxY) maxY = cellData.y;
  }

  return { height: maxY - minY + 1, width: maxX - minX + 1 };
}

export function clearContiner(container) {
  for (let cell of container.children) {
    if (cell) {
      cell.classList.remove("active");
      cell.classList.remove("fixed");
    }
  }
}

export function fixChunk(chunkData, container) {
  for (let cellData of chunkData) {
    let cell = getCellFromData(cellData.x, cellData.y, container);
    if (cell) {
      cell.classList.remove("active");
      cell.classList.add("fixed");
    }
  }
}

export function getHighestXCoord(chunkData) {
  let maxX = -999;
  for (let cellData of chunkData) {
    if (cellData.x > maxX) maxX = cellData.x;
  }

  return maxX;
}

export function getLowestXCoord(chunkData) {
  let minX = 999;
  for (let cellData of chunkData) {
    if (cellData.x < minX) minX = cellData.x;
  }

  return minX;
}

export function getHighestYCoord(chunkData) {
  let maxY = -999;
  for (let cellData of chunkData) {
    if (cellData.y > maxY) maxY = cellData.y;
  }

  return maxY;
}

export function getLowestYCoord(chunkData) {
  let minY = 999;
  for (let cellData of chunkData) {
    if (cellData.y < minY) minY = cellData.y;
  }

  return minY;
}

export function getCenterCellCoord(chunkData) {
  let leftMostCoord = getLowestXCoord(chunkData);
  let topMostCoord = getLowestYCoord(chunkData);
  let chunkHeight = getDimention(chunkData).height;
  let chunkWidth = getDimention(chunkData).width;

  let centerX = leftMostCoord + Math.ceil(chunkWidth / 2) - 1;
  let centerY = topMostCoord + Math.ceil(chunkHeight / 2) - 1;

  console.log("Current chunk center : ", centerX, centerY);
  
  return {x : centerX, y : centerY};
}