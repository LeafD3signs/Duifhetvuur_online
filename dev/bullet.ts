/**
 * Bullet
 */
class Bullet {

    private bullet: HTMLElement;

    private posX: number;
    private posY: number;
    private startPositionX: number;

    private enemyDown: boolean = false;

    private bulletSpeed: number;
    private bulletDirection : number = 1;
    private lastKey: number;

    constructor(posX: number, posY: number, lastKey: number, weapon: HTMLElement) {
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
        // TODO IN GAME.TS
        requestAnimationFrame(this.gameLoop.bind(this));

    }
    private gameLoop() {
        this.bulletMove();
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    private bulletMove() {
        if (this.lastKey == 0) {
            this.bulletSpeed = 10;
            this.bulletDirection = 1;
        }
        if (this.lastKey == 1) {
            this.bulletDirection = -1;
            this.bulletSpeed = -10;
            // TODO dit moet this.posX zijn
            this.bullet.style.left = "15px";
        }
        // snelheid
        this.posX += this.bulletSpeed;
        // tekenen
        this.bullet.style.transform = "translate(" + this.posX + "px, " + this.posY + "px) scaleX("+this.bulletDirection+")";
        // check uit scherm
        if (this.posX > window.innerWidth || this.posX > this.startPositionX + 500 || this.posX < 0 || this.posX < this.startPositionX - 500) {
            // div weg
            this.bullet.remove();
            this.bullet = null;
            // maar hele bullet instance moet ook nog weg
            // ???
        }
    }

    //     public checkFireCollision(pad: Fire): boolean {
    //     if (this.posX <= pad.getFireX() + 80 && this.posX >= pad.getFireX() - 80 && this.posY <= pad.getFireY() + 50 && this.posY >= pad.getFireY() - 10) {
    //         //Als character raakt lucifer dan ...


    //         if (this.enemyDown == false) {
    //             console.log("hahahahahaha");
    //             this.bullet.remove();
                
    //             this.enemyDown = true;
    //             var sound = new Howl({
    //                 urls: ["sound/step.wav"],
    //                 sprite: {
    //                 intro: [0, 150000],
    //             }
    //         });
           
    //     sound.play('intro');
    //             return true;
    //         }
    //         return false;
    //     }
    // }

            public getFireX(): number {
        return this.posX;
    }

        public getFireY(): number {
        return this.posY;
    }
}