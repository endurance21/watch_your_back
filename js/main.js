
let canvas1 = document.getElementById("canvas1");
let ctx1 = canvas1.getContext("2d");
let canvas2 = document.getElementById("canvas2");
let ctx2 = canvas2.getContext("2d");

canvas1.width = GAME_WIDTH;
canvas1.height = GAME_HEIGHT;
canvas2.width = GAME_WIDTH;
canvas2.height = GAME_HEIGHT;

let currentLevel = -1;
let time = 0;


// var  x = innerWidth/4,
// y = innerHeight/4,
// finalX = 100*SCALE_X,
// finalY = 100*SCALE_Y,
// rows = Math.floor(finalY/),
// cols = Math.floor(finalX/20);
// initGrid(level1);
// let rows = level1.rows;
// let cols = level1.columns;
// // console.log(rows,cols)
// const grid = new Grid(40, 0, rows, cols, CELL_WIDTH);
// grid.init(level1.grid);
// grid.draw(CTX);

const levels = [level1, level2, level3, level4]
var player;
var enemies = [];
var grid;

// enemy.alertPath = findPath(1, 1, 8, 2);
// enemy.displacement();

function renderObject() {
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
  ctx2.beginPath();
  ctx2.arc(player.x, player.y, 6, 0, Math.PI * 2);
  // ctx2.fillStyle = "white";
  ctx2.fill();
  ctx2.closePath();
}



// {
//   enemy.startEmiting();
// player.startEmiting();

// const stage1 = new Polygon();
// stage1.init([ 
//   [80,40],
//   [80, 440],
//   [160, 440],
//   [160, 120],
//   [240, 120],
//   [240, 440],
//   [560, 440],
//   [560, 280],
//   [480, 280],
//   [480, 360],
//   [440, 360],
//   [440, 40]
// ]);

// const stage2 = new Polygon();
// stage2.init([
//   [320,120],
//   [320, 360],
//   [360, 360],
//   [360, 120]
// ]);


// render(CTX,stage1);
// render(CTX,stage2);

// let time = 0;

// const footStepSound = new Audio('res/foot_steps0.mp3');
// const footStepSound1 = new Audio('res/foot_steps1.mp3');

// document.getElementById("btn").onclick = function(){
//   playFootStep();
//   window.setInterval(playFootStep, 1000/60);
//   time += 0.1;
// }

// function playFootStep(){
//   let v1 = Math.abs(Math.sin(time));
//   let v2 = Math.abs(Math.sin(time + 0.1));
//   playSound(footStepSound,v1);
//   playSound(footStepSound1,v2);
// }

// }

function startLevel(level) {
  ctx2.fillStyle = "white";

  CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
  enemies.splice(0, enemies.length);

  waves = [];
  initGrid(level);
  let rows = level.rows;
  let cols = level.columns;
 
  grid = new Grid(40, 0, rows, cols, CELL_WIDTH);
  grid.init(level.grid);
  grid.draw(CTX);

  player = new Character(level.playerAt[0], level.playerAt[1]);

  for (let index = 0; index < level.enemiesAt.length; index++) {
    

    enemies.push(new Enemy(level.enemiesAt[index][0], level.enemiesAt[index][1]));
    enemies[index].normalPath = level.enemiesAt[index].slice();
    enemies[index].findNormalPath();

  }
}
currentLevel = 0;
startLevel(levels[currentLevel]);








function update() {

  if (keys.UP) {
    if (!keys.DOWN)
      player.vy = -PLAYER_VELOCITY;
  }

  if (keys.DOWN) {
    if (!keys.UP)
      player.vy = PLAYER_VELOCITY;
  }

  if (keys.LEFT) {
    if (!keys.RIGHT)
      player.vx = -PLAYER_VELOCITY;
  }

  if (keys.RIGHT) {
    if (!keys.LEFT)
      player.vx = PLAYER_VELOCITY;

  }
  if (keys.BOOST) {
    if (player.vx > 0)
      player.boostx = PLAYER_VELOCITY;
    if (player.vx < 0)
      player.boostx = -PLAYER_VELOCITY;
    if (player.vy > 0)
      player.boosty = PLAYER_VELOCITY;
    if (player.vy < 0)
      player.boosty = -PLAYER_VELOCITY;
  }


  player.move(grid);
  player.vx = 0;
  player.vy = 0;
  player.boostx = 0;
  player.boosty = 0;


  function restartLevel() {
    currentLevel = 0;
    startLevel(levels[currentLevel]);
  }

  function fallback(){
    ctx2.fillStyle = "grey";
    if(currentLevel > 0)
      currentLevel--;
    startLevel(levels[currentLevel]);
  }
  function disappearPlayer() {
    ctx2.fillStyle = "black";
  }
  for (enemyIndex in enemies) {
    if (player.shareSameCell(enemies[enemyIndex])) {
      ctx2.fillStyle = "red";
      setTimeout(disappearPlayer, 300);
      setTimeout(restartLevel, 1000);
    }
  }
  for (trapIndex in levels[currentLevel].trapsAt) {
    if (player.isAtCell(levels[currentLevel].trapsAt[trapIndex][0], levels[currentLevel].trapsAt[trapIndex][1])) {
      ctx2.fillStyle = "grey";
      // setTimeout(disappearPlayer, 300);
      // setTimeout(fallback, 1000);
      fallback();
    }
  }
    renderObject();
    // requestAnimationFrame(update);
    if (player.isAtCell(levels[currentLevel].exitAt[0], levels[currentLevel].exitAt[1])) {
      currentLevel++;
      currentLevel = currentLevel % levels.length;
      startLevel(levels[currentLevel]);

    }
  }

  var ct = 0;

  function globalWave() {
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);

    for (let i = 0; i < waves.length; i++) {
      waves[i].waveEmiter();
      waves[i].wt++;
      if (waves[i].wt > 45) {
        waves[i].waveReset();

      }
    }

    if (ct > 45) {
      for (let i = 0; i < enemies.length; i++) {
        enemies[i].displacement();

      }
      initGrid(levels[currentLevel]);
      //console.log(findPath(player.row, player.col, enemies[0].row, enemies[0].col));
      ct = 0;
    }
    //console.log(ct);
    ct++;

    //requestAnimationFrame(globalWave);

  }

  setInterval(globalWave, 1000 / 60);

  setInterval(update, 1000 / 40);
