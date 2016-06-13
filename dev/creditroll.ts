/**
 * FinalScreen
 */
class CreditRoll {
    
    private credit:HTMLElement;
    private wrapper:HTMLElement;
    private count: number = 0;
    private i:number;
    private timer:number;

    // test
    
    constructor() {
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
    
    private counter() { 
            this.count++;
            console.log(this.count);
            
            if (this.count == 5){
                clearInterval(this.timer);
                document.body.removeChild(this.credit);
                document.body.removeChild(this.wrapper);
                new EndScreen();
        }
    }
    
    
}

        
        
      