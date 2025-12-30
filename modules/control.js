import * as main from'../game.js'
import * as utility from './utility.js'

const control = document.querySelector("#control");
control.focus();
control.value = "";
control.addEventListener("blur", () => {
  control.focus();
});

control.addEventListener("keydown", (event) => {
  console.log(`${event.key} is pressed`);
  control.value = "";
  if (event.key === "ArrowLeft") {
    console.log("Attempt to move left");
    moveLeft();
  } else if (event.key === "ArrowDown") {
    console.log("Attempt to move down");
    moveDown();
  } else if (event.key === "ArrowRight") {
    console.log("Attempt to move right");
    moveRight();
  } else if (event.key === "ArrowUp") {
    console.log("Attempt to move bottom");
    moveBottom();
  } else if (event.key === " " && !main.gamePaused) {
    console.log("Attempt to pause");
    main.toggleGamePlayPause();
    main.pause();
  } else if (event.key === " " && main.gamePaused) {
    console.log("Attempt to resume");
    resume();
  } else if (event.key === "r" || event.key === "R") {
    console.log("Attempt to rotate");
    rotateChunk();
  } else if (event.key === "Enter") {
    console.log("Attempt to reset");
    utility.clearContiner(main.gameArea);
    main.reset();
  }
});
