class Deadly {
    constructor(gameScreen, gameSize) {
        this.gameSize = gameSize
        this.gameScreen = gameScreen

        this.fishSize = {
            w: 60,
            h: 40
        }
        this.fishPos = {
            left: 0,
            top: Math.random() * gameSize.h

        }
        this.fishVel = 10

        this.init()
    }
    init() {
        this.fishElement = document.createElement('img')
        this.fishElement.src = "./img/deadly.png"

        this.fishElement.style.position = "absolute"
        this.fishElement.style.width = `${this.fishSize.w}px`
        this.fishElement.style.height = `${this.fishSize.h}px`
        this.fishElement.style.left = `${this.fishPos.left}px`
        this.fishElement.style.top = `${this.fishPos.top}px`


        this.gameScreen.appendChild(this.fishElement)

    }

    move() {

        this.fishPos.left += this.fishVel

        this.updatePosition()
    }
    updatePosition() {
        this.fishElement.style.left = `${this.fishPos.left}px`
        this.fishElement.style.top = `${this.fishPos.top}px`
    }
}
