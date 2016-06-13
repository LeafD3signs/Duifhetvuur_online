/**
 * Fire
 */
class Fire {
    
    private div: HTMLElement;
    
    private posX: number;
    private posY: number;
    
    private enemyDown: boolean = false;
    
    private hitPoints: number = 100;
    
    constructor() {
       this.div = document.createElement("fire");
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
        public deleteFire(){
        
        // document.body.removeChild(this.div);
        
    }
            public checkFireCollision(pad: Bullet): boolean {
        if (this.posX <= pad.getFireX() + 80 && this.posX >= pad.getFireX() - 80 && this.posY <= pad.getFireY() + 50 && this.posY >= pad.getFireY() - 10) {
            //Als character raakt lucifer dan ...

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
    }
}