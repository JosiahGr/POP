'use strict';

var scoresTable = document.getElementById('scoreTable');
var trEl = document.createElement('tr');
var tdEl = document.createElement('td');

var refresh = document.getElementById('restartGame');
var refreshButton = document.createElement('button');
var logout = document.getElementById('logout');
refreshButton.textContent = 'Play again!';
refresh.appendChild(refreshButton);

High.users = [];

function High (userName, level, scored) {
  this.userName = userName;
  this.level = level;
  this.scored = scored;
  High.users.push(this);
}

function createTable() {
  if(High.users.length > 5) {
    High.users.length === 5;
  }
  trEl = document.createElement('tr');
  tdEl = document.createElement('td');
  tdEl.textContent = 'User Name';
  tdEl.style.color = '#ffe400';
  trEl.appendChild(tdEl);
  tdEl = document.createElement('td');
  tdEl.textContent = 'Level';
  tdEl.style.color = '#ffe400';
  trEl.appendChild(tdEl);
  tdEl = document.createElement('td');
  tdEl.textContent = 'Score';
  tdEl.style.color = '#ffe400';
  trEl.appendChild(tdEl);

  scoresTable.appendChild(trEl);

  for(var i in High.users) {
    trEl = document.createElement('tr');
    tdEl = document.createElement('td');
    tdEl.textContent = High.users[i].userName;
    trEl.appendChild(tdEl);
    tdEl = document.createElement('td');
    tdEl.textContent = High.users[i].level;
    trEl.appendChild(tdEl);
    tdEl = document.createElement('td');
    tdEl.textContent = High.users[i].scored;
    trEl.appendChild(tdEl);

    scoresTable.appendChild(trEl);

  }
}

function yourScore() {
  var pEl = document.getElementById('yourScore');
  pEl.textContent = 'Current Score: ' + userScore;
}

if(localStorage.previousHighScores){
  High.users = JSON.parse(localStorage.getItem('previousHighScores'));
} else {
  new High('Jackie', 9, 20000);
  new High('Joe', 8, 18000);
  new High('Becky',7, 17000);
  new High('Steph', 6, 12000);
  new High('Jim', 5, 9000);
}

var userName = localStorage.firstName;
var userLevel = JSON.parse(localStorage.getItem('lastGame'));
var userScore = JSON.parse(localStorage.getItem('currentScore'));

function checkScores() {
  if(userScore >= High.users[0].scored) {
    High.users[4].userName = High.users[3].userName;
    High.users[4].level = High.users[3].level;
    High.users[4].scored = High.users[3].scored;

    High.users[3].userName = High.users[2].userName;
    High.users[3].level = High.users[2].level;
    High.users[3].scored = High.users[2].scored;

    High.users[2].userName = High.users[1].userName;
    High.users[2].level = High.users[1].level;
    High.users[2].scored = High.users[1].scored;

    High.users[1].userName = High.users[0].userName;
    High.users[1].level = High.users[0].level;
    High.users[1].scored = High.users[0].scored;

    High.users[0].userName = userName;
    High.users[0].level = userLevel;
    High.users[0].scored = userScore;
  }
  if(userScore >= High.users[0].scored && userScore <= High.users[0].scored) {
    High.users[4].userName = High.users[3].userName;
    High.users[4].level = High.users[3].level;
    High.users[4].scored = High.users[3].scored;

    High.users[3].userName = High.users[2].userName;
    High.users[3].level = High.users[2].level;
    High.users[3].scored = High.users[2].scored;

    High.users[2].userName = High.users[1].userName;
    High.users[2].level = High.users[1].level;
    High.users[2].scored = High.users[1].scored;

    High.users[1].userName = userName;
    High.users[1].level = userLevel;
    High.users[1].scored = userScore;
    createTable();
  }
  if(userScore >= High.users[2].scored && userScore < High.users[1].scored) {
    High.users[4].userName = High.users[3].userName;
    High.users[4].level = High.users[3].level;
    High.users[4].scored = High.users[3].scored;

    High.users[3].userName = High.users[2].userName;
    High.users[3].level = High.users[2].level;
    High.users[3].scored = High.users[2].scored;

    High.users[2].userName = userName;
    High.users[2].level = userLevel;
    High.users[2].scored = userScore;
    createTable();
  }
  if(userScore >= High.users[3].scored && userScore < High.users[2].scored) {

    High.users[4].userName = High.users[3].userName;
    High.users[4].level = High.users[3].level;
    High.users[4].scored = High.users[3].scored;

    High.users[3].userName = userName;
    High.users[3].level = userLevel;
    High.users[3].scored = userScore;
    createTable();
  }
  if(userScore >= High.users[4].scored && userScore < High.users[3].scored) {

    High.users[4].userName = userName;
    High.users[4].level = userLevel;
    High.users[4].scored = userScore;
    createTable();
  }
  if(userScore < High.users[4].scored){
    createTable();
  }
}

function clickRefreshButton(e) {
  localStorage.previousHighScores = JSON.stringify(High.users);
  localStorage.lastGame = 0;
  localStorage.currentScore = 0;
  location.href = '../html/game.html';
}

function clickLogOut(e) {
  localStorage.previousHighScores = JSON.stringify(High.users);
  localStorage.lastGame = 0;
  localStorage.currentScore = 0;
  localStorage.firstName = '';
  location.href = '../index.html';
}

refreshButton.addEventListener('click', clickRefreshButton);
logout.addEventListener('click', clickLogOut);

yourScore();
checkScores();