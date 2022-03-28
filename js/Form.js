class Form {
    constructor() {
      this.input = createInput("").attribute("placeholder", "Enter your name");
      this.playButton = createButton("Play");
      this.titleImg = createImg("./assets/headline.png", "game title");
      this.greeting = createElement("h2");
      this.player1button = createButton ("Sam")
      this.Inkybutton = createButton ("Inky")
      this.PinkyButton = createButton("Pinky")
      this.BlinkyButton = createButton("Blinky")
    }
  
    setElementsPosition() {
      this.titleImg.position(20, 20);
      this.input.position(width / 2 - 110, height / 2 + 80);
      this.playButton.position(width / 2 - 90, height / 2 + 140);
      this.greeting.position(width / 2 - 300, height / 2 + 120);

    }
  
    setElementsStyle() {
      this.titleImg.class("gameTitle");
      this.input.class("customInput");
      this.playButton.class("customButton");
      this.greeting.class("greeting");
    }
  
    hide() {
      this.greeting.hide();
      this.playButton.hide();
      this.input.hide();
    }
  
    handleMousePressed() {
      this.playButton.mousePressed(() => {
        this.input.hide();
        this.playButton.hide();
        var message = `
        Hello ${this.input.value()}
        </br>wait for another player to join...`;
        this.greeting.html(message);
      
      });
    }
  
    display() {
      this.setElementsPosition();
      this.setElementsStyle();
      this.handleMousePressed();
    }
  }
  

