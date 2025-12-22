export function loadMatrix(gamearea) {
  // generates a matrix of size 30 X 24

  for (let j = 1; j <= 24; j++) {
    for (let i = 1; i <= 12; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.id = `${i},${j}`;
      //cell.textContent = `${i},${j}`;
      gamearea.appendChild(cell);
    }
  }
}

export function getCell(x, y, container) {
  return container.children[(y - 1) * 12 + x - 1];
}

// cell data -----> let square = [{x : 0, y : 0}, {x : 0, y : 1}, {x : 1, y : 0}, {x : 1, y : 1}];

export function startFall(block, container) {
  let movingY = 0;
  let speed = 1000;
  setTimeout(() => {
    let interval1 = setInterval(() => {
      if (movingY > 21) {
        // for now it will always reach the ground
        clearInterval(interval1);
        clearInterval(interval2);
        for (let cellData of block) {
          let cell = getCell(
            cellData.x + 1,
            cellData.y + movingY + 1,
            container
          );
          cell.classList.add("active");
        }
      } else {
        for (let j = 1; j <= 24; j++) {
          for (let i = 1; i <= 12; i++) {
            for (let cellData of block) {
              let cell = getCell(
                cellData.x + 1,
                cellData.y + movingY + 1,
                container
              );
              if (typeof cell != undefined) cell.classList.remove("active");   // clears block
            }
          }
        }
        movingY++;
      }
    }, speed * 0.9);
  }, speed);

  let interval2 = setInterval(() => {
    // shows block
    for (let cellData of block) {
      let cell = getCell(cellData.x + 1, cellData.y + movingY + 1, container);
      if (typeof cell != undefined) cell.classList.add("active");
    }
  }, speed);
}