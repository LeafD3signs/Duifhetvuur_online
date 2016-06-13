/// <reference path="lucifer.ts"/>

/**
 * Character
 */
class Character {

    private character: HTMLElement;
    public weapon: HTMLElement;

    //walk
    private downkey: number;
    private upkey: number;
    private leftkey: number;
    private rightkey: number;
    
    private spacebar: number;

    //speed
    private leftSpeed: number = 0;
    private rightSpeed: number = 0;
    private downSpeed: number = 0;
    private upSpeed: number = 0;
    
    private keyDownFunction;
    private keyUpFunction;
    
    //startposition on screen
    private posX: number;
    private posY: number;

    private lastKey: number = 0;
    
    private weaponTrue: boolean;
    
    public bulletArray = [];

    constructor(left: number, right: number, up: number, down: number, posX: number, posY: number, weapon: boolean, spacebar: number) {
        
        this.character = document.createElement("character");
        document.body.appendChild(this.character);

        this.weaponTrue = weapon;
        
        if(weapon) {
            console.log("wapen added!");
            this.weapon = document.createElement("waterGun");
            this.character.appendChild(this.weapon);
        }

        //input from keyboard
        this.upkey = up;
        this.downkey = down;
        this.leftkey = left;
        this.rightkey = right;

        this.spacebar = spacebar;
        
        // position on screen
        this.posX = posX;
        this.posY = posY;

        this.keyDownFunction = this.onKeyDown.bind(this);
        this.keyUpFunction = this.onKeyUp.bind(this);

        // keyboard listener
        window.addEventListener("keydown", this.keyDownFunction);
        window.addEventListener("keyup", this.keyUpFunction);
    }

    // keyboard input changes speed
    private onKeyDown(event: KeyboardEvent): void {
        
        console.log("key down " + this.upkey);
        
        switch (event.keyCode) {
            case this.upkey:
                if(this.posY > 0){
                    this.upSpeed = 5;
                }
                break;
            case this.downkey:
                if(this.posY < window.innerHeight - 138){
                    this.downSpeed = 5;
                }
                break;
            case this.leftkey:
                if (this.posX > 0){
                    this.leftSpeed = 5;
                }
                this.lastKey = 1;
                break;
            case this.rightkey:
                if (this.posX < window.innerWidth - 141){
                    this.rightSpeed = 5;
                }
                this.lastKey = 0;
                break;
             case this.spacebar:
                if(this.weaponTrue){
                    this.addBullet();
                    console.log("space clicked!");
                    // this.game.addBullet();
                    // this.addBullet;
                    // dit in de level.ts
                    // let b = new Bullet(this.posX, this.posY, this.lastKey, this.weapon);
                    // this.bulletArray.push(b);
                }
                break;
        }
    }

    public addBullet() {
        let b = new Bullet(this.posX, this.posY, this.lastKey, this.weapon);
        this.bulletArray.push(b);
        return this.bulletArray;
    }
    
    public bulletToCharacter (b){
        return b;
    }

    // speed to 0 when keyboard input is down
    private onKeyUp(event: KeyboardEvent): void {
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
    }
    public move(): void {
        
        this.posX = this.posX - this.leftSpeed + this.rightSpeed;
        this.posY = this.posY - this.upSpeed + this.downSpeed;

        this.checkWalls();

        // de div positie aanpassen met transform - tip: scaleX kan je gebruiken om de andere kant op te kijken
        if (this.lastKey == 0) {
            this.character.style.transform = "translate(" + this.posX + "px, " + this.posY + "px)";
        }
        else if (this.lastKey == 1) {
            this.character.style.transform = "translate(" + this.posX + "px, " + this.posY + "px) scaleX(-1)";
        }
    }
    
    public getX(): number {
        return this.posX;
    }

    public getY(): number {
        return this.posY;
    }

  private checkWalls(): void {
        if(this.posX >= window.innerWidth - 118){
            this.rightSpeed = 0;
        }
        if(this.posX < -70){
            this.leftSpeed = 0;
        }
        if(this.posY >= window.innerHeight - 121){
            this.downSpeed = 0;
        }
        if(this.posY < -70){
            this.upSpeed = 0;
        }
    }
    
    public deleteCharacter(): void {
        // listeners weg
        window.removeEventListener("keydown", this.keyDownFunction);
        window.removeEventListener("keyup", this.keyUpFunction);
        // div weg
        this.character.remove();
    }
}