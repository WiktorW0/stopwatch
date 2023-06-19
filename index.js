const timeDisplay = document.querySelector('#timeDisplay')
const startBtn = document.querySelector('#timeStart')
const pauseBtn = document.querySelector('#timePause')
const resetBtn = document.querySelector('#timeReset')

let startTime = 0
let elapsedTime = 0
let currentTime = 0
let paused = true
let internalId
let hrs = 0
let mins = 0
let secs = 0
let milisecs = 0

startBtn.addEventListener('click', () => {
  if (paused) {
    paused = false
    startTime = Date.now() - elapsedTime
    internalId = setInterval(updateTime, 1)
  }
})

pauseBtn.addEventListener('click', () => {
  if (!paused) {
    paused = true
    elapsedTime = Date.now() - startTime
    clearInterval(internalId)
  }
})

resetBtn.addEventListener('click', () => {
  paused = true
  clearInterval(internalId)
  startTime = 0
  elapsedTime = 0
  currentTime = 0
  hrs = 0
  mins = 0
  secs = 0
  clearInterval(internalId)
  timeDisplay.textContent = '00:00:00:00'
})

function updateTime() {
  elapsedTime = Date.now() - startTime
  milisecs = Math.floor((elapsedTime / 10) % 100)
  secs = Math.floor((elapsedTime / 1000) % 60)
  mins = Math.floor((elapsedTime / (1000 * 60)) % 60)
  hrs = Math.floor((elapsedTime / (1000 * 60 * 60)) % 60)
  milisecs = pad(milisecs)
  secs = pad(secs)
  mins = pad(mins)
  hrs = pad(hrs)
  timeDisplay.textContent = `${hrs}:${mins}:${secs}:${milisecs}`
  function pad(unit) {
    return (('0') + unit).length > 2 ? unit : "0" + unit
  }

}