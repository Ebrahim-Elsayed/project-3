/* global document */
// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = 80;
    this.height = 70;
    this.sprite = 'images/enemy-bug.png';
};
Enemy.prototype.update = function(dt, player) {
    allEnemies.forEach(function(enemy) {
            enemy.x += enemy.speed * dt;
            if (enemy.x > 504) {
                enemy.y = enemy.randomRow();
                enemy.x = -50;
            }
            // Check for collisions
            if (player.x < enemy.x + enemy.width && player.x + player.width > enemy.x && player.y < enemy.y + enemy.height && player.y + player.height > enemy.y) {
                player.restart();
                player.score = 0;
                player.deathScore++;
            }
        })
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Enemy.prototype.randomRow = function() {
    var rndRow = Math.floor((Math.random() * 4) + 1);
    var row;
    switch (rndRow) {
        case 1:
            row = 60;
            break;
        case 2:
            row = 140;
            break;
        case 3:
            row = 220;
            break;
        case 4:
            row = 300;
            break;
    }
    return row;
};
var addEnemy = function() {
    var randomSpeed = Math.floor((Math.random() * 20) + 20);
    allEnemies.push(new Enemy(0, Enemy.prototype.randomRow(), randomSpeed));
};
var removeEnemy = function() {
    if (allEnemies.length > 3){
      allEnemies.pop();
    }
}
//player class
var Player = function() {
    this.sprite = 'images/char-pink-girl2.png';
    this.x = 202;
    this.y = 489;
    this.x2 = 0;
    this.y2 = 0;
    this.width = 60;
    this.height = 60;
    this.score = 0;
    this.highScore = 0;
    this.deathScore = 0;
};
// class requires an update(), render()
Player.prototype.update = function() {
    this.x += this.x2;
    this.x2 = 0;
    this.y += this.y2;
    this.y2 = 0;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// a handleInput() method.
Player.prototype.handleInput = function(pressedKey) {
    switch (pressedKey) {
        case 'up':
            if (this.y > 64) {
                this.y2 = -85;
            } else {
                this.restart();
                this.score++;
            }
            break;
        case 'down':
            if (this.y < 489) {
                this.y2 = 85;
            }
            break;
        case 'left':
            if (this.x > 0) {
                this.x2 = -101;
            }
            break;
        case 'right':
            if (this.x < 404) {
                this.x2 = 101;
            }
            break;
    }
};
// restart method player
Player.prototype.restart = function() {
    this.x = 202;
    this.y = 489;
};
Player.prototype.showScores = function() {
    document.getElementById('score').innerHTML = this.score;
    document.getElementById('high-score').innerHTML = this.highScore;
    document.getElementById('death-score').innerHTML = this.deathScore;
    if (this.score > this.highScore) {
        this.highScore = this.score;
        if(this.score >= 1){
            document.getElementById('massegewin').style.display = "inline-block";
            document.getElementById('massegewin').innerHTML = "Woow you win !";
        }else {
            document.getElementById('massegewin').style.display = "inline-block";
            document.getElementById('massegewin').innerHTML = "OPPS try again  !";
        }
    }
    document.getElementById('enemy-count').innerHTML = allEnemies.length;
};
Player.prototype.showLevel = function () {
    var level;
    if (allEnemies.length <= 3) {
      level = 'easy';
    } else if (allEnemies.length > 3 && allEnemies.length <= 5) {
      level = 'medium';
    } else {
      level = 'hard';
    }
    document.getElementById('level').innerHTML = level;
};
// instantiate your objects.
var enemy1 = new Enemy(-50, 60, 35);
var enemy2 = new Enemy(-50, 140, 45);
var enemy3 = new Enemy(-50, 220, 58);
var enemy4 = new Enemy(-50, 300, 25);
// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy1, enemy2, enemy3, enemy4];
// Place the player object in a variable called player
var player = new Player();
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
