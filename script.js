let startTime,
  elapsedTime = 0,
  timerInterval;
const display = document.getElementById("display");
const lapsContainer = document.getElementById("laps");

function timeToString(time) {
  let diffInHrs = time / 3600000;
  let hh = Math.floor(diffInHrs);

  let diffInMin = (diffInHrs - hh) * 60;
  let mm = Math.floor(diffInMin);

  let diffInSec = (diffInMin - mm) * 60;
  let ss = Math.floor(diffInSec);

  let diffInMs = (diffInSec - ss) * 100;
  let ms = Math.floor(diffInMs);

  let formattedHH = hh.toString().padStart(2, "0");
  let formattedMM = mm.toString().padStart(2, "0");
  let formattedSS = ss.toString().padStart(2, "0");
  let formattedMS = ms.toString().padStart(2, "0");

  return `${formattedHH}:${formattedMM}:${formattedSS}.${formattedMS}`;
}

function startTimer() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(function () {
    elapsedTime = Date.now() - startTime;
    display.textContent = timeToString(elapsedTime);
  }, 10);
  display.classList.add("running");
}

function stopTimer() {
  clearInterval(timerInterval);
  display.classList.remove("running");
}

function resetTimer() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  display.textContent = "00:00:00.00";
  lapsContainer.innerHTML = ""; // Clear lap times
  display.classList.remove("running");
}

function lapTimer() {
  if (elapsedTime > 0) {
    const lapTime = timeToString(elapsedTime);
    const lapItem = document.createElement("li");
    lapItem.textContent = `Lap ${
      lapsContainer.children.length + 1
    }: ${lapTime}`;
    lapsContainer.appendChild(lapItem);
  }
}

document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("stop").addEventListener("click", stopTimer);
document.getElementById("reset").addEventListener("click", resetTimer);
document.getElementById("lap").addEventListener("click", lapTimer);
