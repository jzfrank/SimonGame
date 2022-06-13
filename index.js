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
  if (gameStart) {
    userClickPattern.push(color);

    if (requiredPattern.length == userClickPattern.length) {
      if (arraysEqual(userClickPattern, requiredPattern)) {
        setTimeout(nextLevel, 1000);
      } else {
        setTimeout(gameOver, 500);
      }
    } else if (
      !arraysEqual(
        userClickPattern,
        requiredPattern.slice(0, userClickPattern.length)
      )
    ) {
      setTimeout(gameOver, 500);
    }
  }

  console.log(userClickPattern);
});

// start
$(document).on("keypress", (e) => {
  if (!gameStart) {
    gameStart = true;
    setTimeout(nextLevel, 500);
  }
});

$("#level-title").on("click", (e) => {
  if (!gameStart) {
    gameStart = true;
    setTimeout(nextLevel, 500);
  }
});

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
  console.log("a", a, "b", b);
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (var i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function pressAnimation(color) {
  $("." + color).toggleClass("pressed");
  setTimeout(() => {
    $("." + color).toggleClass("pressed");
  }, 100);
}

function nextLevel() {
  level += 1;
  $("#level-title").text("Level " + level);
  var color = randomColor();
  setTimeout(function () {
    pressAnimation(color);
    playsound(color);
    requiredPattern.push(color);
    userClickPattern = [];
  }, 500);
}

function gameOver() {
  $("#level-title").text(
    `Good job, you have achieved level ${
      requiredPattern.length - 1
    }! Press here to restart`
  );
  playsound("wrong");
  level = 0;
  gameStart = false;
  userClickPattern = [];
  requiredPattern = [];
}
