export function getCell(x, y, container) {
  return container.children[(y - 1) * 12 + x - 1];
}

export function isInCellStack(cellStack, cell) {
  for (let cellElement of cellStack) {
    if (cellElement === cell) return true;
  }

  return false;
}

export function getDimention(cellArray = []) {
  let maxX = -999;
  let minX = 999;
  let maxY = -999;
  let minY = 999;

  for (let cell of cellArray) {
    if (cell.x < minX) minX = cell.x;
    if (cell.x > maxX) maxX = cell.x;
    if (cell.y < minY) minY = cell.y;
    if (cell.y > maxY) maxY = cell.y;
  }

  return { height: maxY - minY + 1, width: maxX - minX + 1 };
}