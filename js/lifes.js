class Lifes {
    constructor(gameScreen, gameSize) {
        this.gameSize = gameSize
        this.gameScreen = gameScreen

        this.platformSize = { //random
            w: 200,
            h: 100
        }
        this.platformPos = { //random
            left: 40,
            top: 40
        }


        this.init()
    }
    /* staticJump(){
         if (this.isCollision()){
         }
     }*/
    init() {
        this.platformElement = document.createElement('div')
        this.platformElement.innerHTML = Game.cat.lifes


        // this.platformElement = document.createElement('div')
        this.platformElement.style.position = "absolute"
        this.platformElement.style.width = `${this.platformSize.w}px`
        this.platformElement.style.height = `${this.platformSize.h}px`
        this.platformElement.style.left = `${this.platformPos.left}px`
        this.platformElement.style.top = `${this.platformPos.top}px`
        this.platformElement.style.fontSize = "50px"
        this.platformElement.style.fontFamily = "Arial"
        this.gameScreen.appendChild(this.platformElement)
    }
    updateLifes() {
        this.platformElement.innerHTML = Game.cat.lifes
    }

}