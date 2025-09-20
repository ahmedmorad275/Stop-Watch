'use strict';
// Variablels
const clock = document.querySelector('.clock');
const startBtn = document.querySelector('.start');
const stopBtn = document.querySelector('.stop');
const resetBtn = document.querySelector('.reset');
const displayContainer = document.querySelector('.display');
const dot = document.querySelector('.dot');
const spinner = document.querySelector('.spinner');
const state = getComputedStyle(spinner).animationPlayState;
let timer;
let [minutes, seconds, milliseconds] = [0, 0, 0];
function display() {
  let ms = milliseconds < 10 ? '0' + milliseconds : milliseconds;
  let s = seconds < 10 ? '0' + seconds : seconds;
  let m = minutes < 10 ? '0' + minutes : minutes;
  clock.textContent = `${m}:${s}.${ms}`;
}
function start() {
  startBtn.classList.add('disabled');
  stopBtn.classList.remove('disabled');
  timer = setInterval(function () {
    milliseconds++;
    if (milliseconds === 100) {
      seconds++;
      milliseconds = 0;
    }
    if (seconds === 60) {
      minutes++;
      seconds = 0;
    }
    display();
  }, 10);
  displayContainer.classList.remove('stopped');
  spinner.style.animationPlayState = state === 'running' ? 'paused' : 'running';
}
function stop() {
  clearInterval(timer);
  startBtn.textContent = 'Continue';
  startBtn.classList.remove('disabled');
  stopBtn.classList.add('disabled');
  spinner.style.animationPlayState = 'paused';
}
function reset() {
  clearInterval(timer);
  clock.textContent = '00:00.00';
  startBtn.textContent = 'Start';
  minutes = 0;
  seconds = 0;
  milliseconds = 0;
  spinner.style.animationPlayState = 'paused';
  startBtn.classList.remove('disabled');
  stopBtn.classList.add('disabled');
}
startBtn.addEventListener('click', start);
stopBtn.addEventListener('click', stop);
resetBtn.addEventListener('click', reset);
