// SHORT BREAK CHANEG
document.querySelector(".short-bttn").addEventListener("click", () => {
  clock.textContent = "05:00";
  optionsContainer.style.display = "none";
  isPomodoro = false;
});

// LONG BREAK CHANGE
document.querySelector(".long-bttn").addEventListener("click", () => {
  clock.textContent = "10:00";
  optionsContainer.style.display = "none";
  isPomodoro = false;
});

// POMO DROPDOWN
const selected = document.querySelector(".custom-selected");
const optionsContainer = document.querySelector(".custom-options");
const options = document.querySelectorAll(".custom-options .option");
const clock = document.querySelector(".pomo-clock time");

const dropdown = document.querySelector(".custom-dropdown");

selected.addEventListener("click", () => {
  optionsContainer.style.display =
    optionsContainer.style.display === "block" ? "none" : "block";
});

options.forEach((option) => {
  option.addEventListener("click", () => {
    const seconds = parseInt(option.getAttribute("data-value"), 10);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    clock.textContent = `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
    selected.textContent = option.textContent;
    optionsContainer.style.display = "none";
    isPomodoro = true;
  });
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".custom-dropdown")) {
    optionsContainer.style.display = "none";
  }
});

// update timer after selection

dropdown.addEventListener("change", () => {
  const seconds = parseInt(dropdown.value, 10);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  clock.textContent = `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;

  dropdown.style.display = "none";
});

// start and stop

const startBtn = document.querySelector(".start-bttn");
const stopBtn = document.querySelector(".stop-bttn");

let countdownInterval;

startBtn.addEventListener("click", () => {
  clearInterval(countdownInterval); //avoids multiple intervals

  // get the time and convert to seconds

  const currentTime = clock.textContent;
  const [minutes, seconds] = currentTime.split(":").map(Number);
  let totalSeconds = minutes * 60 + seconds;

  countdownInterval = setInterval(() => {
    totalSeconds--;
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;

    clock.textContent = `${String(mins).padStart(2, "0")}:${String(
      secs
    ).padStart(2, "0")}`;

    if (totalSeconds <= 0) {
      clearInterval(countdownInterval);
      clock.textContent = "00:00";

      if (isPomodoro) {
        triggerPomodoroConfetti();
      }
    }
  }, 1000);
});

stopBtn.addEventListener("click", () => {
  clearInterval(countdownInterval);
});

// pomodoro celebration

let isPomodoro = false;

var scalar = 2;
var unicorn = confetti.shapeFromText({ text: "🍅", scalar });

var defaults = {
  spread: 360,
  ticks: 60,
  gravity: 0,
  decay: 0.96,
  startVelocity: 20,
  shapes: [unicorn],
  scalar,
};

function triggerPomodoroConfetti() {
  confetti({
    ...defaults,
    particleCount: 30,
  });

  confetti({
    ...defaults,
    particleCount: 5,
    flat: true,
  });

  confetti({
    ...defaults,
    particleCount: 15,
    scalar: scalar / 2,
    shapes: ["circle"],
  });
}

setTimeout(shoot, 0);
setTimeout(shoot, 100);
setTimeout(shoot, 200);
