const CHOICES = ["rock", "paper", "scissors"];
let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

function genCompChoice() {
  const randIdx = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[randIdx];
}

function setMsg(text, color = "#081b31") {
  msg.innerText = text;
  msg.style.backgroundColor = color;
}

function drawGame() {
  setMsg("It's a draw! Play again.");
}

function showWinner(userWin, userChoice, compChoice) {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    setMsg(`You win! Your ${userChoice} beats ${compChoice}`, "#16a34a");
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    setMsg(`You lost. ${compChoice} beats your ${userChoice}`, "#dc2626");
  }
}

function getWinner(user, comp) {
  if (user === comp) return null;
  if (
    (user === "rock" && comp === "scissors") ||
    (user === "paper" && comp === "rock") ||
    (user === "scissors" && comp === "paper")
  ) {
    return true;
  }
  return false;
}

function playGame(userChoice) {
  const compChoice = genCompChoice();
  const result = getWinner(userChoice, compChoice);
  if (result === null) {
    drawGame();
  } else {
    showWinner(result, userChoice, compChoice);
  }
}

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
    choice.blur();
  });
  // Keyboard accessibility
  choice.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      const userChoice = choice.getAttribute("id");
      playGame(userChoice);
      choice.blur();
    }
  });
});
