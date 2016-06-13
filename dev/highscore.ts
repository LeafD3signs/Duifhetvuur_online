/// <reference path="player.ts"/>
/// <reference path="startgame.ts"/>
/**
 * Startgame
 */
class highscore{
    
    private scoreScreen: HTMLElement;
    private backButton: HTMLElement;
    private screenInfo: HTMLElement;
    private highscoreText: HTMLElement;
    private playerScore: HTMLElement;
    private score: HTMLElement;
    private Startgame: any;
    
    constructor(){
        
        //Highscore wrapper
        this.scoreScreen = document.createElement("wrapper");
        this.scoreScreen.setAttribute("id", "screenScore");
        document.body.appendChild(this.scoreScreen);

        //Highscore top text
        this.highscoreText = document.createElement("screenText");
        this.highscoreText.setAttribute("class", "highScoretext");
        this.highscoreText.innerHTML = "Highscores";
        this.scoreScreen.appendChild(this.highscoreText);

        //Highscore center player score 
        this.screenInfo = document.createElement("score");
        this.screenInfo.setAttribute("class", "screenScoreInfo");
        this.scoreScreen.appendChild(this.screenInfo);

        //Return to main screen button               
        this.backButton = document.createElement("backButton");
        this.backButton.setAttribute("class", "backButton");
        this.backButton.innerHTML = "Terug naar Hoofdmenu";
        this.scoreScreen.appendChild(this.backButton);

        this.backButton.addEventListener("click", this.showStartScreen.bind(this));
    }
    
    private showStartScreen(){
        var soundTrue = false;
        this.scoreScreen.remove();
        this.Startgame = new Startgame(soundTrue);
    }
}