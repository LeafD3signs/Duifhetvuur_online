var Bullet = (function () {
    function Bullet(posX, posY, lastKey, weapon) {
        this.enemyDown = false;
        this.bulletDirection = 1;
        this.bullet = document.createElement("bullet");
        document.body.appendChild(this.bullet);
        this.posX = posX;
        this.posY = posY;
        this.startPositionX = posX;
        this.lastKey = lastKey;
        var sound = new Howl({
            urls: ["sound/shot/waterShot.wav"],
            sprite: {
                intro: [0, 150000],
            }
        });
        sound.play('intro');
        requestAnimationFrame(this.gameLoop.bind(this));
    }
    Bullet.prototype.gameLoop = function () {
        this.bulletMove();
        requestAnimationFrame(this.gameLoop.bind(this));
    };
    Bullet.prototype.bulletMove = function () {
        if (this.lastKey == 0) {
            this.bulletSpeed = 10;
            this.bulletDirection = 1;
        }
        if (this.lastKey == 1) {
            this.bulletDirection = -1;
            this.bulletSpeed = -10;
            this.bullet.style.left = "15px";
        }
        this.posX += this.bulletSpeed;
        this.bullet.style.transform = "translate(" + this.posX + "px, " + this.posY + "px) scaleX(" + this.bulletDirection + ")";
        if (this.posX > window.innerWidth || this.posX > this.startPositionX + 500 || this.posX < 0 || this.posX < this.startPositionX - 500) {
            this.bullet.remove();
            this.bullet = null;
        }
    };
    Bullet.prototype.getFireX = function () {
        return this.posX;
    };
    Bullet.prototype.getFireY = function () {
        return this.posY;
    };
    return Bullet;
}());
var Lucifer = (function () {
    function Lucifer(enemyLevel) {
        this.enemyDown = false;
        this.enemyLevel = enemyLevel;
        this.hitpoints = enemyLevel;
        this.div = document.createElement("lucifer");
        document.body.appendChild(this.div);
        function randomX(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }
        function randomY(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }
        this.posX = randomX(200, window.innerWidth - 40);
        this.posY = randomY(50, window.innerHeight - 50);
        this.setLocation(this.posX, this.posY);
    }
    Lucifer.prototype.setLocation = function (x, y) {
        this.div.style.transform = "translate(" + x + "px, " + y + "px";
    };
    Lucifer.prototype.checkCollision = function (player) {
        if (this.posX <= player.getX() + 80 && this.posX >= player.getX() - 80 && this.posY <= player.getY() + 150 && this.posY >= player.getY() - 10) {
            if (this.enemyDown == false) {
                this.div.classList.add("enemyDead");
                this.enemyDown = true;
                var sound = new Howl({
                    urls: ["sound/step.wav"],
                    sprite: {
                        intro: [0, 150000],
                    }
                });
                sound.play('intro');
                return true;
            }
            return false;
        }
    };
    Lucifer.prototype.deleteMatch = function () {
        document.body.removeChild(this.div);
    };
    return Lucifer;
}());
var Character = (function () {
    function Character(left, right, up, down, posX, posY, weapon, spacebar) {
        this.leftSpeed = 0;
        this.rightSpeed = 0;
        this.downSpeed = 0;
        this.upSpeed = 0;
        this.lastKey = 0;
        this.bulletArray = [];
        this.character = document.createElement("character");
        document.body.appendChild(this.character);
        this.weaponTrue = weapon;
        if (weapon) {
            console.log("wapen added!");
            this.weapon = document.createElement("waterGun");
            this.character.appendChild(this.weapon);
        }
        this.upkey = up;
        this.downkey = down;
        this.leftkey = left;
        this.rightkey = right;
        this.spacebar = spacebar;
        this.posX = posX;
        this.posY = posY;
        this.keyDownFunction = this.onKeyDown.bind(this);
        this.keyUpFunction = this.onKeyUp.bind(this);
        window.addEventListener("keydown", this.keyDownFunction);
        window.addEventListener("keyup", this.keyUpFunction);
    }
    Character.prototype.onKeyDown = function (event) {
        console.log("key down " + this.upkey);
        switch (event.keyCode) {
            case this.upkey:
                if (this.posY > 0) {
                    this.upSpeed = 5;
                }
                break;
            case this.downkey:
                if (this.posY < window.innerHeight - 138) {
                    this.downSpeed = 5;
                }
                break;
            case this.leftkey:
                if (this.posX > 0) {
                    this.leftSpeed = 5;
                }
                this.lastKey = 1;
                break;
            case this.rightkey:
                if (this.posX < window.innerWidth - 141) {
                    this.rightSpeed = 5;
                }
                this.lastKey = 0;
                break;
            case this.spacebar:
                if (this.weaponTrue) {
                    this.addBullet();
                    console.log("space clicked!");
                }
                break;
        }
    };
    Character.prototype.addBullet = function () {
        var b = new Bullet(this.posX, this.posY, this.lastKey, this.weapon);
        this.bulletArray.push(b);
        return this.bulletArray;
    };
    Character.prototype.bulletToCharacter = function (b) {
        return b;
    };
    Character.prototype.onKeyUp = function (event) {
        switch (event.keyCode) {
            case this.upkey:
                this.upSpeed = 0;
                break;
            case this.downkey:
                this.downSpeed = 0;
                break;
            case this.leftkey:
                this.leftSpeed = 0;
                break;
            case this.rightkey:
                this.rightSpeed = 0;
                break;
        }
    };
    Character.prototype.move = function () {
        this.posX = this.posX - this.leftSpeed + this.rightSpeed;
        this.posY = this.posY - this.upSpeed + this.downSpeed;
        this.checkWalls();
        if (this.lastKey == 0) {
            this.character.style.transform = "translate(" + this.posX + "px, " + this.posY + "px)";
        }
        else if (this.lastKey == 1) {
            this.character.style.transform = "translate(" + this.posX + "px, " + this.posY + "px) scaleX(-1)";
        }
    };
    Character.prototype.getX = function () {
        return this.posX;
    };
    Character.prototype.getY = function () {
        return this.posY;
    };
    Character.prototype.checkWalls = function () {
        if (this.posX >= window.innerWidth - 118) {
            this.rightSpeed = 0;
        }
        if (this.posX < -70) {
            this.leftSpeed = 0;
        }
        if (this.posY >= window.innerHeight - 121) {
            this.downSpeed = 0;
        }
        if (this.posY < -70) {
            this.upSpeed = 0;
        }
    };
    Character.prototype.deleteCharacter = function () {
        window.removeEventListener("keydown", this.keyDownFunction);
        window.removeEventListener("keyup", this.keyUpFunction);
        this.character.remove();
    };
    return Character;
}());
var CreditRoll = (function () {
    function CreditRoll() {
        this.count = 0;
        console.log("finalscreen");
        this.credit = document.createElement("creditscreen");
        this.credit.setAttribute("id", "credits");
        document.body.appendChild(this.credit);
        this.wrapper = document.createElement("creditwrapper");
        this.wrapper.setAttribute("id", "creditwrapper");
        this.wrapper.innerHTML = "Game is made by:" + "<br />" + "Lennart van Welzen" + "<br />" +
            "Wilco van Dijk" + "<br />" + "Jim Heukels" + "<br />" + "Lorenzo Kammeron"
            + "<br />" + "Tom Vrijmoet" + "<br />";
        document.body.appendChild(this.wrapper);
        this.timer = setInterval(this.counter.bind(this), 1000);
    }
    CreditRoll.prototype.counter = function () {
        this.count++;
        console.log(this.count);
        if (this.count == 5) {
            clearInterval(this.timer);
            document.body.removeChild(this.credit);
            document.body.removeChild(this.wrapper);
            new EndScreen();
        }
    };
    return CreditRoll;
}());
var Player = (function () {
    function Player() {
    }
    return Player;
}());
var Startgame = (function () {
    function Startgame(soundTrue) {
        this.soundTrue = true;
        if (soundTrue == false) {
            this.soundTrue = false;
        }
        if (this.soundTrue) {
            var sound = new Howl({
                loop: true,
                sprite: {
                    intro: [0, 150000],
                }
            });
            sound.play('intro');
        }
        this.startScreen = document.createElement("beginscreen");
        this.startScreen.setAttribute("class", "startScreen");
        document.body.appendChild(this.startScreen);
        this.startWrapper = document.createElement("wrapper");
        this.startWrapper.setAttribute("id", "startWrapper");
        document.body.appendChild(this.startWrapper);
        this.nameTextField = document.createElement("input");
        this.nameTextField.setAttribute("class", "textfield");
        this.nameTextField.setAttribute("id", "playerInput");
        this.nameTextField.setAttribute("type", "text");
        this.nameTextField.setAttribute("value", "");
        this.nameTextField.setAttribute("placeholder", "Jouw naam");
        this.startWrapper.appendChild(this.nameTextField);
        this.startLogo = document.createElement("logo");
        this.startLogo.setAttribute("class", "startLogo");
        this.startScreen.appendChild(this.startLogo);
        this.startButton = document.createElement("button");
        this.startButton.setAttribute("id", "startButton");
        this.startButton.innerHTML = "Start game";
        this.startWrapper.appendChild(this.startButton);
        this.startHighscore = document.createElement("button");
        this.startHighscore.setAttribute("id", "startHighscore");
        this.startWrapper.appendChild(this.startHighscore);
        this.startHighscore.addEventListener("click", this.highscoreScreen.bind(this));
        this.startHowToPlay = document.createElement("button");
        this.startHowToPlay.setAttribute("id", "startHowToPlay");
        this.startWrapper.appendChild(this.startHowToPlay);
        this.startHowToPlay.addEventListener("click", this.HowToPlayScreen.bind(this));
        this.startCredits = document.createElement("button");
        this.startCredits.setAttribute("id", "startCredits");
        this.startWrapper.appendChild(this.startCredits);
        this.startCredits.addEventListener("click", this.creditScreen.bind(this));
        this.startButton.addEventListener("click", this.createWorld.bind(this));
    }
    Startgame.prototype.createWorld = function () {
        this.playerValue = this.nameTextField.value;
        console.log(this.playerValue);
        this.startScreen.remove();
        this.startWrapper.remove();
        new Level(1, "level1");
    };
    Startgame.prototype.highscoreScreen = function () {
        this.startLogo.remove();
        this.startScreen.remove();
        this.startWrapper.remove();
        this.highscoreView = new highscore();
    };
    Startgame.prototype.HowToPlayScreen = function () {
        this.startLogo.remove();
        this.startWrapper.remove();
    };
    Startgame.prototype.creditScreen = function () {
        this.startLogo.remove();
        this.startWrapper.remove();
        new CreditRoll();
    };
    return Startgame;
}());
var EndScreen = (function () {
    function EndScreen() {
        this.background = document.createElement("back");
        this.background.setAttribute("id", "backend");
        this.background.innerHTML = "Bedankt voor het spelen naam" + "<br />" + "Je score is score";
        document.body.appendChild(this.background);
        this.playAgain = document.createElement("button");
        this.playAgain.setAttribute("id", "againbutton");
        this.playAgain.innerHTML = "Opnieuw spelen?";
        this.background.appendChild(this.playAgain);
        this.playAgain.addEventListener("click", this.again.bind(this));
        this.endGame = document.createElement("button");
        this.endGame.setAttribute("id", "againbutton");
        this.endGame.innerHTML = "Spel stoppen";
        this.endGame.style.marginTop = "350px";
        this.background.appendChild(this.endGame);
        this.endGame.addEventListener("click", this.exit.bind(this));
        this.highScore = document.createElement("button");
        this.highScore.setAttribute("id", "againbutton");
        this.highScore.innerHTML = "Highscore";
        this.background.appendChild(this.highScore);
        this.highScore.style.marginTop = "495px";
        this.highScore.addEventListener("click", this.score.bind(this));
    }
    EndScreen.prototype.exit = function () {
        console.log("exit");
        var f = confirm("Close Window?");
        if (f == true) {
            console.log("exit");
            window.close();
        }
    };
    EndScreen.prototype.again = function () {
        console.log("again");
        document.body.removeChild(this.background);
        new Startgame(true);
    };
    EndScreen.prototype.score = function () {
        console.log("score");
        new highscore();
    };
    return EndScreen;
}());
var Fire = (function () {
    function Fire() {
        this.enemyDown = false;
        this.hitPoints = 100;
        this.div = document.createElement("fire");
        document.body.appendChild(this.div);
        function randomX(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }
        function randomY(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }
        this.posX = randomX(200, window.innerWidth - 40);
        this.posY = randomY(50, window.innerHeight - 50);
        this.setLocation(this.posX, this.posY);
    }
    Fire.prototype.setLocation = function (x, y) {
        this.div.style.transform = "translate(" + x + "px, " + y + "px";
    };
    Fire.prototype.deleteFire = function () {
    };
    Fire.prototype.checkFireCollision = function (pad) {
        if (this.posX <= pad.getFireX() + 80 && this.posX >= pad.getFireX() - 80 && this.posY <= pad.getFireY() + 50 && this.posY >= pad.getFireY() - 10) {
            if (this.enemyDown == false) {
                this.div.remove();
                this.enemyDown = true;
                var sound = new Howl({
                    urls: ["sound/step.wav"],
                    sprite: {
                        intro: [0, 150000],
                    }
                });
                sound.play('intro');
                return true;
            }
            return false;
        }
    };
    return Fire;
}());
var highscore = (function () {
    function highscore() {
        this.scoreScreen = document.createElement("wrapper");
        this.scoreScreen.setAttribute("id", "screenScore");
        document.body.appendChild(this.scoreScreen);
        this.highscoreText = document.createElement("screenText");
        this.highscoreText.setAttribute("class", "highScoretext");
        this.highscoreText.innerHTML = "Highscores";
        this.scoreScreen.appendChild(this.highscoreText);
        this.screenInfo = document.createElement("score");
        this.screenInfo.setAttribute("class", "screenScoreInfo");
        this.scoreScreen.appendChild(this.screenInfo);
        this.backButton = document.createElement("backButton");
        this.backButton.setAttribute("class", "backButton");
        this.backButton.innerHTML = "Terug naar Hoofdmenu";
        this.scoreScreen.appendChild(this.backButton);
        this.backButton.addEventListener("click", this.showStartScreen.bind(this));
    }
    highscore.prototype.showStartScreen = function () {
        var soundTrue = false;
        this.scoreScreen.remove();
        this.Startgame = new Startgame(soundTrue);
    };
    return highscore;
}());
var Level = (function () {
    function Level(levelNumber, toUseBackground) {
        this.matchArray = [];
        this.fireArray = [];
        switch (levelNumber) {
            case 1:
                console.log("Level 1");
                this.matches = 5;
                this.fires = 0;
                this.weapon = false;
                break;
            case 2:
                console.log("level 2!");
                this.matches = 20;
                this.fires = 4;
                this.weapon = true;
                break;
            case 3:
                console.log("level 3!");
                this.matches = 10;
                this.fires = 8;
                this.weapon = true;
                break;
            case 4:
                console.log("level 4!");
                this.matches = 10;
                this.fires = 10;
                this.weapon = true;
                break;
            case 5:
                console.log("level 5!");
                this.matches = 10;
                this.fires = 12;
                this.weapon = true;
                break;
            default:
                break;
        }
        this.levelElement = document.createElement(toUseBackground);
        document.body.appendChild(this.levelElement);
        this.playerTwo = new Character(65, 68, 87, 83, 0, 150, this.weapon, 32);
        this.playerOne = new Character(37, 39, 38, 40, 0, 250, this.weapon, 13);
        this.levelNumber = levelNumber;
        if (Level.killCounter == null) {
            Level.killCounter = new EnemiesKilled(this.matches);
        }
        else {
            Level.killCounter.deathCount = 0;
            Level.killCounter.toKillEnemies = this.matches;
        }
        for (var i = 0; i < this.matches; i++) {
            this.match = new Lucifer(levelNumber);
            this.matchArray.push(this.match);
        }
        for (var i = 0; i < this.fires; i++) {
            this.fire = new Fire();
            this.fireArray.push(this.fire);
        }
        requestAnimationFrame(this.gameLoop.bind(this));
    }
    Level.prototype.gameLoop = function () {
        for (var i = 0; i < this.fireArray.length; i++) {
            for (var _i = 0, _a = this.playerTwo.bulletArray; _i < _a.length; _i++) {
                var key = _a[_i];
                if (this.fireArray[i].checkFireCollision(key)) {
                    console.log("hpdddddd");
                }
            }
        }
        this.playerTwo.move();
        this.playerOne.move();
        for (var i = 0; i < this.matchArray.length; i++) {
            if (this.matchArray[i].checkCollision(this.playerTwo) || this.matchArray[i].checkCollision(this.playerOne)) {
                Level.killCounter.updateScores();
            }
        }
        if (Level.killCounter.isLevelComplete()) {
            this.endLevel();
        }
        requestAnimationFrame(this.gameLoop.bind(this));
    };
    Level.prototype.endLevel = function () {
        for (var _i = 0, _a = this.matchArray; _i < _a.length; _i++) {
            var c = _a[_i];
            c.deleteMatch();
        }
        for (var _b = 0, _c = this.fireArray; _b < _c.length; _b++) {
            var c = _c[_b];
            c.deleteFire();
        }
        this.playerOne.deleteCharacter();
        this.playerTwo.deleteCharacter();
        this.playerOne = null;
        this.playerTwo = null;
        this.matchArray = null;
        this.fireArray = null;
        this.levelElement = null;
        this.levelNumber++;
        if (this.levelNumber == 2) {
            new middleScreen("Level 1");
        }
        if (this.levelNumber == 3) {
            new middleScreen("Level 2");
        }
        if (this.levelNumber == 4) {
            new middleScreen("Level 3");
        }
        if (this.levelNumber == 5) {
            new middleScreen("Level 4");
        }
        if (this.levelNumber > 5) {
            new CreditRoll();
        }
        else {
            new Level(this.levelNumber, "level1");
        }
    };
    return Level;
}());
window.addEventListener("load", function () {
    new Startgame(true);
});
var middleScreen = (function () {
    function middleScreen(level) {
        this.count = 10;
        this.middle = document.createElement("middlescreen");
        this.middle.setAttribute("id", "middle-screen");
        this.middle.innerHTML = "" + level + " uitgespeeld!" + "<br />" + "Je score is score";
        document.body.appendChild(this.middle);
        this.text = document.createElement("nexttext");
        this.text.setAttribute("id", "next-text");
        this.text.innerHTML = "Het volgende level begint over " + this.count;
        document.body.appendChild(this.text);
        this.timer = setInterval(this.counter.bind(this), 1000);
    }
    middleScreen.prototype.counter = function () {
        this.count--;
        console.log(this.count);
        if (this.count == 0) {
            console.log("volgende");
            clearInterval(this.timer);
            document.body.removeChild(this.middle);
            document.body.removeChild(this.text);
        }
        this.text.innerHTML = "Het volgende level begint over " + this.count;
    };
    return middleScreen;
}());
var screenScore = (function () {
    function screenScore() {
    }
    screenScore.prototype.clearScreen = function () {
        this.nextLevelWrapper = document.createElement("wrapper");
        this.nextLevelWrapper.setAttribute("id", "screenWrapper");
        document.body.appendChild(this.nextLevelWrapper);
        this.levelComplete = document.createElement("screen");
        this.levelComplete.setAttribute("class", "levelComplete");
        this.levelComplete.innerHTML = "LevelComplete";
        this.nextLevelWrapper.appendChild(this.levelComplete);
        this.gameInfo = document.createElement("info");
        this.gameInfo.setAttribute("class", "gameInfo");
        this.gameInfo.innerHTML = "Dit level heeft geen nieuw wapen nodig";
        this.nextLevelWrapper.appendChild(this.gameInfo);
        this.subScore = document.createElement("subScore");
        this.subScore.setAttribute("class", "currentScore");
        this.subScore.innerHTML = "score";
        this.nextLevelWrapper.appendChild(this.subScore);
        this.nextButton = document.createElement("nextButton");
        this.nextButton.setAttribute("class", "nextLevel");
        this.nextButton.innerHTML = "Volgende level";
        this.nextLevelWrapper.appendChild(this.nextButton);
        this.nextButton.addEventListener("click", this.level.bind(this));
    };
    return screenScore;
}());
var EnemiesKilled = (function () {
    function EnemiesKilled(toKillEnemies) {
        this.deathCount = 0;
        this.div = document.getElementsByTagName("ui")[0];
        this.toKillEnemies = toKillEnemies;
        console.log("Game start!");
        this.div = document.createElement("score");
        document.body.appendChild(this.div);
    }
    EnemiesKilled.prototype.updateScores = function () {
        this.deathCount++;
        this.div.innerHTML = "Fakkels:    " + this.deathCount + "/" + this.toKillEnemies;
        this.isLevelComplete();
    };
    EnemiesKilled.prototype.isLevelComplete = function () {
        if (this.deathCount == this.toKillEnemies) {
            console.log("Je hebt het level gehaald!");
            return true;
        }
        return false;
    };
    return EnemiesKilled;
}());
//# sourceMappingURL=main.js.map