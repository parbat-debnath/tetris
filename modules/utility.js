export function loadGrid(height = 24, width = 12, container) {
  for (let j = 1; j <= height; j++) {
    for (let i = 1; i <= width; i++) {
      let cell = document.createElement("div");
      cell.dataset.x = i + 1;
      cell.dataset.y = j + 1;
      cell.classList.add("cell");

      container.appendChild(cell);
    }
  }
}

export function getCellFromData(x, y, container) {
  let cell = container.children[(y - 1) * 12 + (x - 1)];
  if(!cell) {
    cell = document.createElement("div");
    cell.dataset.x = x;
    cell.dataset.y = y;
  }

  return cell
}

export function isInChunk(targetCellData, chunkData) {
  for(let cellData of chunkData) {
    if(cellData.x === targetCellData.x && cellData.y === targetCellData.y) {
      return true;}
  }
  
  return false;
}

export function isOccupied(cell) {
  if(cell.classList.contains("active")) {
    return true;
  } else return false;
}

export function getDimention(chunkData) {
  let maxX = -999;
  let maxY = -999;
  let minX = 999;
  let minY = 999;
  for(let cellData of chunkData) {
    if(cellData.x < minX) minX = cellData.x;
    if(cellData.y < minY) minY = cellData.y;
    if(cellData.x > maxX) maxX = cellData.x;
    if(cellData.x > maxY) maxY = cellData.y;
  }

  return {height : (maxY - minY + 1), width : (maxX - minX + 1)};
}

export function clearContiner(container) {
  for(let cell of container.children) {
    if(cell) cell.classList.remove("active");
  }
}