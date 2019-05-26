'use strict';

var button = document.getElementById('button');
var inputFirstName = document.getElementById('firstName');

function store(){
  if (!localStorage.firstName) {
    localStorage.setItem('firstName', inputFirstName.value);
  }
}

function pageLoad() {
  if (localStorage.firstName) {
    document.getElementById('welcome').innerHTML = 'Welcome ' + localStorage.firstName;
    hideEl();
  }
}

function hideEl() {
  document.getElementById('firstName').style.display = 'none';
  document.getElementById('fText').style.display = 'none';
}

function chooseYourDestiny(e) {
  e.preventDefault();
  if(!localStorage.firstName){
    store();
    window.location = 'html/instructions.html';
  } else {
    window.location = 'html/game.html';
  }
}

button.addEventListener('click', chooseYourDestiny);

// setTimeout('audio.play()', 1700);
pageLoad();