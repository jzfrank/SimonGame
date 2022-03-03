var userClickPattern = [];
var requiredPattern = [];
var gameStart = false;
var level = 0;
var lastColor = "yellow";

// add sounds to buttons
$(".btn-user").on("click", (e) => {
  var color = e.target.id;
  pressAnimation(color);
  playsound(color);
  if (gameStart) {userClickPattern.push(color);}
  if (gameStart &&
    requiredPattern.length == userClickPattern.length) {
      if (arraysEqual(userClickPattern, requiredPattern)) {
        setTimeout(nextLevel, 1000);
      }
      else {
        setTimeout(gameOver, 500);
      }
  }

  console.log(userClickPattern);
});

// start
$(document).on("keypress", (e) => {
  if (!gameStart) {
    gameStart = true;
    nextLevel();
  }
})

$("#level-title").on("click", (e) => {
  if (!gameStart) {
    gameStart = true;
    nextLevel();
  }
})



// auxilliary functions
function randomColor() {
  var color = ["green", "red", "yellow", "blue"];
  return color[Math.floor(Math.random() * 4)];
}

function playsound(color) {
  $("#sound-" + lastColor)[0].currentTime = 0;
  $("#sound-" + color)[0].play();
  lastColor = color;
}

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (var i=0; i<a.length; i++) {
    if ( a[i] !== b[i] ) return false;
  }
  return true;
}

function pressAnimation(color) {
  $('.' + color).toggleClass("pressed");
  setTimeout(()=> {
    $('.' + color).toggleClass("pressed");
  }, 100);
}

function nextLevel() {
  level += 1;
  $("#level-title").text("Level " + level);
  var color = randomColor();
  pressAnimation(color);
  playsound(color);
  requiredPattern.push(color);
  userClickPattern = [];
}

function gameOver() {
  $("#level-title").text("Game Over, press here to restart");
  playsound("wrong");
  level = 0;
  gameStart = false;
  userClickPattern = [];
  requiredPattern = [];
}
