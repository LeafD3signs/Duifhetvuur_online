/// <reference path="character.ts"/>

/**
 * Enemies
 */
class Lucifer {

    private div: HTMLElement;

    private enemyLevel: number;

    private positionX;
    private positionY;

    private posX: number;
    private posY: number;

    private enemyDown: boolean = false;

    private counter: number;

    private hitpoints: number;

    constructor(enemyLevel: number) {
        this.enemyLevel = enemyLevel;
        this.hitpoints = enemyLevel;

        this.div = document.createElement("lucifer");
        document.body.appendChild(this.div);
        
        function randomX(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }
        
        function randomY(min, max) {
            return Math.floor(Math.random()  * (max-  min)) + min;
        }
        
        this.posX = randomX(200, window.innerWidth - 40);
        this.posY = randomY(50, window.innerHeight - 50);
        
        this.setLocation(this.posX, this.posY);
                 
    }

    public setLocation(x:number, y:number) {
        this.div.style.transform = "translate(" + x + "px, " + y + "px";
    }

    public checkCollision(player: Character): boolean {
        if (this.posX <= player.getX() + 80 && this.posX >= player.getX() - 80 && this.posY <= player.getY() + 150 && this.posY >= player.getY() - 10) {
            //Als character raakt lucifer dan ...
            if (this.enemyDown == false) {
                //this.div.setAttribute("id", "enemyDead");
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
    }
    
    public deleteMatch(){
        document.body.removeChild(this.div);
    }
}