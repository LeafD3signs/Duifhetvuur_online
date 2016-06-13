/// reference path="newLevel.ts"/>
class Level {

    private enemyAmount: number;
    private playerOne: Character;
    private playerTwo: Character;
    private static killCounter: EnemiesKilled;
    private levelNumber: number;
    public levelElement: HTMLElement;

    private startWrapper: HTMLElement;
    private startButton: HTMLElement;

    private match: Lucifer;
    private fire: Fire;

    private matches: number;
    private fires: number;

    private matchArray = [];
    private fireArray = [];

    private weapon: boolean;

    public level: middleScreen;

    constructor(levelNumber: number, toUseBackground: string) {

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
        } else {
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

    private gameLoop() {

        // console.log(this.playerTwo.bulletArray);

        for (var i = 0; i < this.fireArray.length; i++) {
            
            for (var key of this.playerTwo.bulletArray) {
                    
                    if(this.fireArray[i].checkFireCollision(key)) {
                        console.log("hpdddddd");

                    }

                }
            }
        
        this.playerTwo.move();
        this.playerOne.move();

        //loop trough the matchArray and check collision
        for (var i = 0; i < this.matchArray.length; i++) {
            if (this.matchArray[i].checkCollision(this.playerTwo) || this.matchArray[i].checkCollision(this.playerOne)) {
                Level.killCounter.updateScores();
            }
        }

        // loop door de bullet array
        // bullet.update();

        if (Level.killCounter.isLevelComplete()) {
            this.endLevel();
        }
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    private endLevel() {
        for (var c of this.matchArray) {
            c.deleteMatch();
        }
        for (var c of this.fireArray) {
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

        if(this.levelNumber == 2){
            new middleScreen("Level 1");
        }

        if(this.levelNumber == 3){
            new middleScreen("Level 2");
        }

        if(this.levelNumber == 4){
            new middleScreen("Level 3");
        }

        if(this.levelNumber == 5){
            new middleScreen("Level 4");
        }

        if(this.levelNumber > 5) {
            new CreditRoll();
        }
        else{
        new Level(this.levelNumber, "level1");
        }
    }

}