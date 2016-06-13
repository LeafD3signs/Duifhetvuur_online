/**
 * Screenscore
 */
class screenScore {
    public levelComplete: HTMLElement;
    public nextLevelWrapper: HTMLElement;
    public gameInfo: HTMLElement;
    public screenWrapper: HTMLElement;
    public nextButton: HTMLElement;
    public subScore: HTMLElement;
    public nameTextField: HTMLElement;
    private level: any;
    
    constructor() {
        
    }
        
    public clearScreen(){
        //check if all enemies are hit
        //Levelcompletion wrapper
        this.nextLevelWrapper = document.createElement("wrapper");
        this.nextLevelWrapper.setAttribute("id", "screenWrapper");
        document.body.appendChild(this.nextLevelWrapper);
        
            //Levelcompletion top text
            this.levelComplete = document.createElement("screen");
            this.levelComplete.setAttribute("class", "levelComplete");
            this.levelComplete.innerHTML = "LevelComplete";
            this.nextLevelWrapper.appendChild(this.levelComplete);
            
                //Levelcompletion left 
                this.gameInfo = document.createElement("info");
                this.gameInfo.setAttribute("class", "gameInfo");
                this.gameInfo.innerHTML = "Dit level heeft geen nieuw wapen nodig";
                this.nextLevelWrapper.appendChild(this.gameInfo);
 
                        //Levelcompletion right-1               
                        this.subScore = document.createElement("subScore");
                        this.subScore.setAttribute("class", "currentScore");
                        this.subScore.innerHTML = "score";
                        this.nextLevelWrapper.appendChild(this.subScore);
                        
                        //Levelcompletion right-2               
                        this.nextButton = document.createElement("nextButton");
                        this.nextButton.setAttribute("class", "nextLevel");
                        this.nextButton.innerHTML = "Volgende level";
                        this.nextLevelWrapper.appendChild(this.nextButton);
                        
                        this.nextButton.addEventListener("click", this.level.bind(this)); 
 
    }
}

