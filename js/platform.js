class Platform {
    constructor(gameScreen, gameSize, platformSizeW, platformSizeH, platformPosLeft, platformPosRight) {
        this.gameSize = gameSize
        this.gameScreen = gameScreen

        this.platformSize = { //random
            w: platformSizeW,
            h: platformSizeH
        }
        this.platformPos = { //random
            left: platformPosLeft,
            top: platformPosRight
        }
        this.platformHitbox = {
            left: this.platformPos.left,
            right: this.platformPos.left + this.platformSize.w,
            top: this.platformPos.top,
            bottom: this.platformPos.top + this.platformSize.h
        }

        this.init()
    }
    /* staticJump(){
         if (this.isCollision()){
         }
     }*/
    init() {
        this.platformElement = document.createElement('figure')
        this.platformElement.style.backgroundImage = 'url("./img/plati.png")'
        this.platformElement.style.backgroundSize = "cover"

        // this.platformElement = document.createElement('div')
        this.platformElement.style.position = "absolute"
        this.platformElement.style.width = `${this.platformSize.w}px`
        this.platformElement.style.height = `${this.platformSize.h}px`
        this.platformElement.style.left = `${this.platformPos.left}px`
        this.platformElement.style.top = `${this.platformPos.top}px`
        //this.platformElement.style.backgroundColor = `brown`
        this.gameScreen.appendChild(this.platformElement)

    }
}