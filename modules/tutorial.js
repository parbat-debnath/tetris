export function showPCTutorial(container) {
  return new Promise(function (resolve) {
    const tutorialBox = document.createElement("div");
    tutorialBox.classList.add("tutorial-box");
    const tutorialHeading = document.createElement("h1");
    tutorialHeading.classList.add("tutorial-heading");
    tutorialHeading.textContent = "TETRIS";

    const tutorial1 = document.createElement("div");
    tutorial1.classList.add('tutorial-element');
    const tutorial1Btn = document.createElement("div");
    tutorial1Btn.classList.add("tutorial-btn");
    tutorial1Btn.textContent = "→";
    const tutorial1Message = document.createElement("p");
    tutorial1Message.classList.add("tutorial-message");
    tutorial1Message.textContent = "Move Right";
    tutorial1.appendChild(tutorial1Btn);
    tutorial1.appendChild(tutorial1Message);
    
    const tutorial2 = document.createElement("div");
    tutorial2.classList.add('tutorial-element');
    const tutorial2Btn = document.createElement("div");
    tutorial2Btn.classList.add("tutorial-btn");
    tutorial2Btn.textContent = "←";
    const tutorial2Message = document.createElement("p");
    tutorial2Message.classList.add("tutorial-message");
    tutorial2Message.textContent = "Move Left";
    tutorial2.appendChild(tutorial2Btn);
    tutorial2.appendChild(tutorial2Message);
    
    const tutorial3 = document.createElement("div");
    tutorial3.classList.add('tutorial-element');
    const tutorial3Btn = document.createElement("div");
    tutorial3Btn.classList.add("tutorial-btn");
    tutorial3Btn.textContent = "↑";
    const tutorial3Message = document.createElement("p");
    tutorial3Message.classList.add("tutorial-message");
    tutorial3Message.textContent = "Teleport Down";
    tutorial3.appendChild(tutorial3Btn);
    tutorial3.appendChild(tutorial3Message);
    
    const tutorial4 = document.createElement("div");
    tutorial4.classList.add('tutorial-element');
    const tutorial4Btn = document.createElement("div");
    tutorial4Btn.classList.add("tutorial-btn");
    tutorial4Btn.textContent = "↓";
    const tutorial4Message = document.createElement("p");
    tutorial4Message.classList.add("tutorial-message");
    tutorial4Message.textContent = "Move Down";
    tutorial4.appendChild(tutorial4Btn);
    tutorial4.appendChild(tutorial4Message);
    
    const tutorial5 = document.createElement("div");
    tutorial5.classList.add('tutorial-element');
    const tutorial5Btn = document.createElement("div");
    tutorial5Btn.classList.add("tutorial-btn");
    tutorial5Btn.textContent = "R";
    const tutorial5Message = document.createElement("p");
    tutorial5Message.classList.add("tutorial-message");
    tutorial5Message.textContent = "Rotate";
    tutorial5.appendChild(tutorial5Btn);
    tutorial5.appendChild(tutorial5Message);
    
    const tutorial6 = document.createElement("div");
    tutorial6.classList.add('tutorial-element');
    const tutorial6Btn = document.createElement("div");
    tutorial6Btn.classList.add("tutorial-btn");
    tutorial6Btn.textContent = "Spacebar";
    const tutorial6Message = document.createElement("p");
    tutorial6Message.classList.add("tutorial-message");
    tutorial6Message.textContent = "PLay / Pause";
    tutorial6.appendChild(tutorial6Btn);
    tutorial6.appendChild(tutorial6Message);
    
    const tutorial7 = document.createElement("div");
    tutorial7.classList.add('tutorial-element');
    const tutorial7Btn = document.createElement("div");
    tutorial7Btn.classList.add("tutorial-btn");
    tutorial7Btn.textContent = "Enter";
    const tutorial7Message = document.createElement("p");
    tutorial7Message.classList.add("tutorial-message");
    tutorial7Message.textContent = "Restart";
    tutorial7.appendChild(tutorial7Btn);
    tutorial7.appendChild(tutorial7Message);

    const startBtn = document.createElement("button");
    startBtn.classList.add('game-start-btn')
    startBtn.textContent = "START GAME";
    startBtn.addEventListener("click", () => {
      container.removeChild(tutorialBox);
      resolve();
    });

    tutorialBox.appendChild(tutorialHeading)
    tutorialBox.appendChild(tutorial1);
    tutorialBox.appendChild(tutorial2);
    tutorialBox.appendChild(tutorial3);
    tutorialBox.appendChild(tutorial4);
    tutorialBox.appendChild(tutorial5);
    tutorialBox.appendChild(tutorial6);
    tutorialBox.appendChild(tutorial7);
    tutorialBox.appendChild(startBtn);
    container.appendChild(tutorialBox);

  });
}
