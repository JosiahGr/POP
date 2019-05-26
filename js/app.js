'use strict';

var game = document.getElementById('gameTable');
var clicksLeft = document.getElementById('clicksRemaining');
var clickCounter = document.createElement('ul');
clicksLeft.appendChild(clickCounter);
var scoreCell = document.getElementById('currentScore');
var score = document.createElement('ul');
scoreCell.appendChild(score);
var popValue = document.getElementById('popValue');
var pop = document.createElement('ul');
popValue.appendChild(pop);
var level = document.getElementById('level');
var levelUp = document.createElement('ul');
level.appendChild(levelUp);
var gameMsg = document.getElementById('results');

var scores = document.createElement('button');
scores.setAttribute('id', 'highScoresNot');
scores.textContent = ('High Scores');
scores.style.visibility = ('none');
gameMsg.appendChild(scores);


var replayLevel = document.createElement('button');
replayLevel.setAttribute('id', 'replayLevelNot');
replayLevel.textContent = ('Replay Level');
replayLevel.style.visibility = ('none');
gameMsg.appendChild(replayLevel);

var gameSize = 3;
var topIndex = 2;
var tableTotal = 0;
var maxTableTotal;
var gameNumbers = [];
var gameIndex = 0;
var cellNumber = -1;
var clearedCells = [];
var clicksRemaining = 0;
var burstNumber = 3;
var lastGamePlayed;
var gameScore = 0;
score.textContent = gameScore;


var topCells = [];
var rightCells = [];
var bottomCells = [];
var leftCells = [];

var clickCell = 0;

var sounds = []; 

var audio = new Audio('../media/pop.mp3');
sounds.push(audio);
var audioLost = new Audio('../media/gandalf_shallnotpass.wav');
sounds.push(audioLost);

var audioWin = new Audio('../media/austin_yeahbaby.wav');
sounds.push(audioWin);
var audioWin2 = new Audio('../media/darthvader_taughtyouwell.wav');
sounds.push(audioWin2);
var audioWin3 = new Audio('../media/austin_groovy.wav');
sounds.push(audioWin3);
var audioWin4 = new Audio('../media/woohoo.wav');
sounds.push(audioWin4);
var mute = document.getElementById('mute');

function soundOff(){
  for(var i in sounds){
    sounds[i].muted = true;
    localStorage.sounds = JSON.stringify(true);
  }
}
function randomNumber() {
  return Math.floor(Math.random() * Math.floor(burstNumber) + 1);
}

function makeGameTable(){
  for (var i = 0; i < gameSize; i++) {
    var trEl = document.createElement('tr');
    for(var j = 0; j < gameSize; j++){
      cellNumber++;
      var tdEl = document.createElement('td');
      var button = document.createElement('button');
      button.setAttribute('id', cellNumber);
      tdEl.appendChild(button);
      trEl.appendChild(tdEl);
      var cellValue = randomNumber();
      tableTotal = tableTotal + cellValue;
      gameNumbers.push(cellValue);
    }
    game.appendChild(trEl);
  }
  edgeCells();
  gameIndex = parseInt(gameNumbers.length) - 1;
  console.log(gameNumbers);
  if(tableTotal > (maxTableTotal)){
    location.reload();
  }
}

function edgeCells() {
  var edge = 0;
  topCells.push(edge);
  for(var i = 0; i < gameSize - 1; i++){
    edge++;
    topCells.push(edge);
  }
  rightCells.push(edge);
  for(var j = 1; j < gameSize; j++){
    edge = edge + gameSize;
    rightCells.push(edge);
  }
  edge = 0;
  leftCells.push(edge);
  for(var k = 1; k < gameSize; k++){
    edge = edge + gameSize;
    leftCells.push(edge);
  }
  bottomCells.push(edge);
  for(var l = 1; l < gameSize; l++){
    edge++;
    bottomCells.push(edge);
  }
  topCells.pop();
  topCells.shift();
  rightCells.pop();
  rightCells.shift();
  leftCells.pop();
  leftCells.shift();
  bottomCells.pop();
  bottomCells.shift();
  console.log('top ' + topCells);
  console.log('right ' + rightCells);
  console.log('bot ' + bottomCells);
  console.log('left ' + leftCells);
}

function updateNumbers(event){
  clickCell = parseInt(event.target.id);
  console.log(clickCell);
  clickTracker();
  gameNumbers[clickCell] = gameNumbers[clickCell] + 1;
  clearAndCheck();
}

function clickTracker(){  
  clicksRemaining = clicksRemaining - 1;
  clickCounter.textContent = clicksRemaining;
}

function clearAndCheck(){
  clear();
  check();
  blowEmUp();
}

function clear() {
  if(clearedCells.length === gameNumbers.length){
    var gameWin = document.getElementById('results');
    var winMsg = document.createElement('p');
    winMsg.textContent = ('You win! Next Level');
    gameWin.appendChild(winMsg);
    lastGamePlayed += 1;
    gameScore += clicksRemaining * 100;
    console.log(gameScore);
    clearedCells = [];
    localStorage.lastGame = JSON.stringify(lastGamePlayed);
    localStorage.currentScore = JSON.stringify(gameScore);
    audioWin.play();
    setTimeout('startGame()', 2500);
    console.log('win');
  }
}
function check() {
  if(clicksRemaining < 0 && clearedCells.length < gameNumbers.length){
    clickCounter.textContent = ('0');
    var rmvTable = document.getElementById('gameTable');
    rmvTable.parentNode.removeChild(rmvTable);
    var lostMsg = document.createElement('p');
    lostMsg.setAttribute('id', 'lostMsg');
    lostMsg.textContent = ('Sorry, all out of clicks.');
    gameMsg.appendChild(lostMsg);
    scores.setAttribute('id', 'highScores');
    replayLevel.setAttribute('id', 'replayLevel');
    audioLost.play();
    console.log('lose');
  }
}
  
function blowEmUp () {
  for(var i in gameNumbers){
    if(gameNumbers[i] > burstNumber){
      clickCell = parseInt(i);
      clearedCells.push(i);
      var currentIndex = i;
      document.getElementById(currentIndex).style.visibility = 'hidden';
      gameNumbers[i] = 0;
      gameScore = gameScore + 100;
      score.textContent = gameScore;
      audio.play();
      setTimeout('updateNeighbors()', 150);
    }
  }
}

function loserOptions(event){
  if(event.target.id === 'highScores'){
    localStorage.lastGame = JSON.stringify(lastGamePlayed);
    localStorage.currentScore = JSON.stringify(gameScore);
    window.location.href = 'scores.html';
  }else{
    startGame();
  }
}

function updateNeighbors() { 

  //code for 1st cell
  if(clickCell === 0){
    rightCell();
    bottomCell();
  }
  //code for top right cell
  else if(clickCell === topIndex){
    leftCell();
    bottomCell();
  }
  //code for bottom left cell
  else if(clickCell === (gameIndex - (gameSize - 1))){
    rightCell();
    topCell();
  }
  //code for last cell
  else if(clickCell === gameIndex){
    leftCell();
    topCell();
  }
  //code for left edge interior cells
  else if(leftCells.includes(clickCell)){
    rightCell();
    topCell();
    bottomCell();
  }
  //code for right edge interior cells
  else if(rightCells.includes(clickCell)){
    leftCell();
    topCell();
    bottomCell();
  }
  //code for top interior cells
  else if(topCells.includes(clickCell)){
    rightCell();
    leftCell();
    bottomCell();
  }
  //code for bottom interior cells
  else if(bottomCells.includes(clickCell)){ console.log(clickCell);
    rightCell();
    leftCell();
    topCell();
  }
  //code for all interior cells
  else {
    rightCell();
    leftCell();
    topCell();
    bottomCell();
  }

  console.log('before' + gameNumbers);
  clearAndCheck();
  for(var i in clearedCells){
    console.log('clearedCells ' + clearedCells);
    gameNumbers[clearedCells[i]] = 0;
  }
  console.log('after' + gameNumbers);
}

function rightCell(){
  gameNumbers[clickCell + 1] = gameNumbers[clickCell + 1] + 1;
}
function leftCell(){
  gameNumbers[clickCell - 1] = gameNumbers[clickCell - 1] + 1;
}
function topCell(){
  gameNumbers[clickCell - gameSize] = gameNumbers[clickCell - gameSize] + 1;
}
function bottomCell(){
  gameNumbers[clickCell + gameSize] = gameNumbers[clickCell + gameSize] + 1;
}

function winnerWinnerChickenDinner(){
  if(lastGamePlayed === 0) {
    gameOne();
  }
  if(lastGamePlayed === 1) {
    gameTwo();
  }
  if(lastGamePlayed === 2) {
    gameThree();
  }
  if(lastGamePlayed === 3) {
    gameFour();
  }
  if(lastGamePlayed === 4) {
    gameFive();
  }
  if(lastGamePlayed === 5) {
    gameSix();
  }
  if(lastGamePlayed === 6) {
    gameSeven();
  }
  if(lastGamePlayed === 7) {
    gameEight();
  }
  if(lastGamePlayed === 8) {
    gameNine();
  }
  if(lastGamePlayed >= 9) {
    gameForever();
  }
}

function gameOne() {
  gameSize = 3;
  topIndex = gameSize - 1;
  clicksRemaining = 8;
  clickCounter.textContent = clicksRemaining;
  burstNumber = 3;
  pop.textContent = burstNumber + 1;
  maxTableTotal = 18;
  makeGameTable();
  lastGamePlayed = 0;
  levelUp.textContent = 1;
  console.log('lastGamePlayed ' + lastGamePlayed);
}
function gameTwo() {
  gameSize = 4;
  topIndex = gameSize - 1;
  clicksRemaining = 14;
  clickCounter.textContent = clicksRemaining;
  burstNumber = 3;
  pop.textContent = burstNumber + 1;
  maxTableTotal = 32;
  makeGameTable();
  lastGamePlayed = 1;
  levelUp.textContent = 2;
  console.log('lastGamePlayed' + lastGamePlayed);
}
function gameThree() {
  gameSize = 5;
  topIndex = gameSize - 1;
  clicksRemaining = 20;
  clickCounter.textContent = clicksRemaining;
  burstNumber = 3;
  pop.textContent = burstNumber + 1;
  maxTableTotal = 50;
  makeGameTable();
  lastGamePlayed = 2;
  levelUp.textContent = 3;
  console.log('lastGamePlayed' + lastGamePlayed);
}
function gameFour() {
  gameSize = 3;
  topIndex = gameSize - 1;
  clicksRemaining = 6;
  clickCounter.textContent = clicksRemaining;
  burstNumber = 3;
  pop.textContent = burstNumber + 1;
  maxTableTotal = 18;
  makeGameTable();
  lastGamePlayed = 3;
  levelUp.textContent = 4;
  console.log('lastGamePlayed' + lastGamePlayed);
}
function gameFive() {
  gameSize = 4;
  topIndex = gameSize - 1;
  clicksRemaining = 13;
  clickCounter.textContent = clicksRemaining;
  burstNumber = 3;
  pop.textContent = burstNumber + 1;
  maxTableTotal = 32;
  makeGameTable();
  lastGamePlayed = 4;
  levelUp.textContent = 5;
  console.log('lastGamePlayed' + lastGamePlayed);
}
function gameSix() {
  gameSize = 5;
  topIndex = gameSize - 1;
  clicksRemaining = 18;
  clickCounter.textContent = clicksRemaining;
  burstNumber = 3;
  pop.textContent = burstNumber + 1;
  maxTableTotal = 50;
  makeGameTable();
  lastGamePlayed = 5;
  levelUp.textContent = 6;
  console.log('lastGamePlayed' + lastGamePlayed);
}
function gameSeven() {
  gameSize = 3;
  topIndex = gameSize - 1;
  clicksRemaining = 10;
  clickCounter.textContent = clicksRemaining;
  burstNumber = 4;
  pop.textContent = burstNumber + 1;
  maxTableTotal = 24;
  makeGameTable();
  lastGamePlayed = 6;
  levelUp.textContent = 7;
  console.log('lastGamePlayed' + lastGamePlayed);
}
function gameEight() {
  gameSize = 4;
  topIndex = gameSize - 1;
  clicksRemaining = 16;
  clickCounter.textContent = clicksRemaining;
  burstNumber = 4;
  pop.textContent = burstNumber + 1;
  maxTableTotal = 44;
  makeGameTable();
  lastGamePlayed = 7;
  levelUp.textContent = 8;
  console.log('lastGamePlayed' + lastGamePlayed);
}
function gameNine() {
  gameSize = 5;
  topIndex = gameSize - 1;
  clicksRemaining = 25;
  clickCounter.textContent = clicksRemaining;
  burstNumber = 4;
  pop.textContent = burstNumber + 1;
  maxTableTotal = 64;
  makeGameTable();
  lastGamePlayed = 8;
  levelUp.textContent = 9;
  console.log('lastGamePlayed' + lastGamePlayed);
}
function gameForever() {
  gameSize = 5;
  topIndex = gameSize - 1;
  clicksRemaining = 25;
  clickCounter.textContent = clicksRemaining;
  burstNumber = 4;
  pop.textContent = burstNumber + 1;
  maxTableTotal = 60;
  makeGameTable();
  levelUp.textContent = lastGamePlayed;
  console.log('lastGamePlayed' + lastGamePlayed);
}

function startGame(){
  var volume = JSON.parse(localStorage.getItem('sounds'));
  if(volume === true){
    soundOff();
  }
  if(localStorage.lastGame || localStorage.currentScore) {
    lastGamePlayed = JSON.parse(localStorage.getItem('lastGame'));
    console.log('last game ' + lastGamePlayed);
    gameScore = JSON.parse(localStorage.getItem('currentScore'));
    score.textContent = gameScore;
    winnerWinnerChickenDinner();
  } else {
    console.log('newbie');
    gameOne();
  }
}

game.addEventListener('click', updateNumbers);
replayLevel.addEventListener('click', loserOptions);
scores.addEventListener('click', loserOptions);
mute.addEventListener('click', soundOff);

startGame();