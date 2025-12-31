import * as main from'../game.js'
import * as utility from './utility.js'

const control = document.querySelector("#control");
control.focus();
control.value = "";
control.addEventListener("blur", () => {
  control.focus();
});

control.addEventListener("keydown", (event) => {
  control.value = "";
  if (event.key === "ArrowLeft") {
    main.moveLeft();
  } else if (event.key === "ArrowDown") {
    main.moveDown();
  } else if (event.key === "ArrowRight") {
    main.moveRight();
  } else if (event.key === "ArrowUp") {
    main.moveBottom();
  } else if (event.key === " " && !main.gamePaused) {
    main.toggleGamePlayPause();
    main.pause();
  } else if (event.key === " " && main.gamePaused) {
    main.resume();
  } else if (event.key === "r" || event.key === "R") {
    main.rotate();
  } else if (event.key === "Enter") {
    utility.clearContiner(main.gameArea);
    main.restart();
  }
});