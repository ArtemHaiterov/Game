let clicks = 0;
let extraTime = 60000;
let interval = 0;
let timeout = 0;
let timeLeft = 60000;
let randomPlaceBlock =  random(1, 40);
let randomExtraPlaceBlock =  random(1, 40);
let resultArray = [];

const timeDisplay = document.querySelector('#timeout-value-js');
const pointsDisplay = document.querySelector('#points-value-js');
const startClickButton = document.querySelector('.start-btn-js');
const newGameClickButton = document.querySelector('.new-game-btn-js');
const pauseClickButton = document.querySelector('.pause-btn-js');
const resultPoints = document.querySelector('.result-value-js');
const resultTableScoreAndNamePlayer = document.querySelector('.result-table-content-js');
let blockClick = document.querySelector(`#block-${randomPlaceBlock}`);
let extraBlockClick = document.querySelector(`#block-${randomExtraPlaceBlock}`);


document.getElementById('points-value-js').innerHTML = clicks;
document.getElementById('timeout-value-js').innerHTML = formatTimeMinSec(extraTime);


startClickButton.onclick = start;
newGameClickButton.onclick = newGame;
pauseClickButton.onclick = pause;

function start(){
  if(document.getElementById(`block-${randomPlaceBlock}`).style.backgroundColor == ''){
      document.getElementById(`block-${randomPlaceBlock}`).style.backgroundColor = '#' + (Math.random().toString(16) + '000000').substring(2,8).toUpperCase();
  }
  const startTime = Date.now();
  startClickButton.onclick = null;
  extraBlockClick.onclick = changeExtraBlock;
  blockClick.onclick = changeBlock;
  interval = setInterval(() => {
  const delta = Date.now() - startTime;
  timeDisplay.textContent = formatTimeMinSec(extraTime - delta);
}, 1000);

  timeout = setTimeout(() => {
  newGameClickButton.onclick = newGame;
  blockClick.onclick = null;
  timeDisplay.textContent ='00:00';

  $('#exampleModal').modal('show');
  resultPoints.textContent = clicks;
  clearInterval(interval);
  clearTimeout(timeout);
  }, extraTime);
}


function newGame(){
  clicks = 0;
  extraTime = 60000;
  blockClick.onclick = null;
  extraBlockClick.onclick = null;
  document.getElementById(`block-${randomPlaceBlock}`).style.backgroundColor = '';
  document.getElementById(`block-${randomExtraPlaceBlock}`).style.backgroundColor = '';
  pointsDisplay.textContent = clicks;
  startClickButton.onclick = start;
  timeDisplay.textContent =formatTimeMinSec(extraTime);
  clearInterval(interval);
  clearTimeout(timeout);
}



function pause(){
  extraBlockClick.onclick = null;
  blockClick.onclick = null;
  leftTime = formatTimeMs(timeDisplay.innerHTML);
  startClickButton.onclick = start;
  extraTime = leftTime;
  clearInterval(interval);
  clearTimeout(timeout);
}


function changeBlock(){
  blockClick.onclick = null;
  pointsDisplay.textContent = ++clicks;
  document.getElementById(`block-${randomPlaceBlock}`).style.backgroundColor = '';
  randomPlaceBlock = random(1, 40);
  if(randomPlaceBlock == randomExtraPlaceBlock){
    randomPlaceBlock = random(1, 39) + 1;
    blockClick = document.querySelector(`#block-${randomPlaceBlock}`);
    document.getElementById(`block-${randomPlaceBlock}`).style.backgroundColor = '#' + (Math.random().toString(16) + '000000').substring(2,8).toUpperCase();
    blockClick.onclick = changeBlock;
  }else{
    blockClick = document.querySelector(`#block-${randomPlaceBlock}`);
    document.getElementById(`block-${randomPlaceBlock}`).style.backgroundColor = '#' + (Math.random().toString(16) + '000000').substring(2,8).toUpperCase();
    blockClick.onclick = changeBlock;
  }

  if(random(1,2) === 2 && randomPlaceBlock != randomExtraPlaceBlock){
    if(document.getElementById(`block-${randomExtraPlaceBlock}`).style.backgroundColor == ''){
      document.getElementById(`block-${randomExtraPlaceBlock}`).style.backgroundColor = '#' + (Math.random().toString(16) + '000000').substring(2,8).toUpperCase();
    }
  }
  extraBlockClick.onclick = changeExtraBlock;
}


function changeExtraBlock(){
  pointsDisplay.textContent = ++clicks;
  extraBlockClick.onclick = null;
  document.getElementById(`block-${randomExtraPlaceBlock}`).style.backgroundColor = '';
  randomExtraPlaceBlock = random(1, 40);
  extraBlockClick = document.querySelector(`#block-${randomExtraPlaceBlock}`);
}


function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function formatTimeMinSec(ms) {
  let minutes = Math.floor(ms / 1000 / 60);
  let seconds = (ms / 1000 % 60).toFixed(0);
  let formatted = [
    minutes.toString().padStart(2, '0'),
    seconds.toString().padStart(2, '0')
  ].join(':');

  return formatted;
}


function formatTimeMs(StrminSec){
  let formArray = StrminSec.split(':');
  let minutes = +formArray[0];
  let seconds = +formArray[1];
  let ms = minutes*60*1000 + seconds*1000;

  return ms;
}


document.forms.score.onsubmit = function(){
  let message = this.name.value;
  resultArray.push(`${message}: ${clicks}`);
  let orderResult = '';
  if(localStorage.getItem('name-and-score') != null){
  orderResult = localStorage.getItem('name-and-score');
  }
  for(let i = 0; i < resultArray.length; i++){
    if(resultArray[i] !== undefined) orderResult += resultArray[i] + '<br>';
  }
  localStorage.setItem('name-and-score', orderResult);
  resultTableScoreAndNamePlayer.innerHTML = orderResult;

  document.getElementById('name-player-field-js').value = "";
  $('#exampleModal').modal('hide')
  return false;
};

let savedNameAndScore = localStorage.getItem('name-and-score');
resultTableScoreAndNamePlayer.innerHTML = savedNameAndScore;


