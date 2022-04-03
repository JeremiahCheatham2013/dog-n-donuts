"use strict";

var ctx = gameCanvas.getContext("2d");
var x = [100, 300, 500];
var y = [0, 0, 0];
var speed = [2, 1, 3];
var dogX = 300,
  changeX = 0,
  score = 0;
let left = false,
  right = false;

var gameTimer = setInterval(mainLoop, 20);
function mainLoop() {
  ctx.clearRect(0, 0, 640, 480);
  ctx.font = "30px Arial";
  ctx.fillText("score: " + score, 10, 30);
  for (var n = 0; n < 3; n++) {
    ctx.drawImage(donut, x[n], y[n], 80, 80);
    y[n] += speed[n];
    checkForHits(n);
    if (y[n] > 480) {
      y[n] = -80;
      x[n] = Math.random() * 600;
    }
  }
  ctx.drawImage(dog, dogX, 400, 80, 80);
  dogX += changeX;
}
document.onkeydown = keyPressed;
function keyPressed(e) {
  var k = e.keyCode;
  if (k == 37) {
    left = true;
  }
  if (k == 39) {
    right = true;
  }
  if (left && right) {
    changeX = 0;
  } else if (left) {
    changeX = -8;
  } else {
    changeX = 8;
  }
}
document.onkeyup = keyUnPressed;
function keyUnPressed(e) {
  var k = e.keyCode;
  if (k == 37) {
    left = false;
  }
  if (k == 39) {
    right = false;
  }
  if (!left && !right) {
    changeX = 0;
  } else if (left) {
    changeX = -8;
  } else {
    changeX = 8;
  }
}
function checkForHits(n) {
  if (Math.abs(400 - y[n]) < 60 && Math.abs(dogX - x[n]) < 60) {
    score++;
    y[n] = -80;
    x[n] = Math.random() * 600;
    beep.play();
  }
}
setTimeout(gameOver, 60000);
function gameOver() {
  clearInterval(gameTimer);
  ctx.font = "80px Arial";
  ctx.fillText("GAME POOPER!", 100, 250);
}
