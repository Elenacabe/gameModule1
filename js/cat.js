class Cat {

    constructor(gameScreen, gameSize) {

        this.gameSize = gameSize
        this.gameScreen = gameScreen

        this.catSize = {
            w: 60,
            h: 60
        }

        this.catPos = {
            left: 50,
            top: this.gameSize.h - this.catSize.h,
            base: this.gameSize.h - this.catSize.h,
        }

        this.catVel = {
            left: 10,
            top: 0,
            gravity: 0.4
        }
        this.catHitbox = {
            left: this.catPos.left,
            right: this.catPos.left + this.catSize.w,
            top: this.catPos.top,
            bottom: this.catPos.top + this.catSize.h
        }
        this.lifes = 7
        this.catSprite = {
            backgroundPositionX: 0,
            totalFrames: 3,
            currentFrame: 1,
            frameSpeed: 6
        }



        this.init()

    }

    init() {
        this.catElement = document.createElement('div')
        //   this.catElement.src = "./img/miau.png"
        this.catElement.style.position = "absolute"
        this.catElement.style.borderStyle = "none"
        this.catElement.style.width = `${this.catSize.w}px`
        this.catElement.style.height = `${this.catSize.h}px`
        this.catElement.style.left = `${this.catPos.left}px`
        this.catElement.style.top = `${this.catPos.top}px`
        this.catElement.style.backgroundImage = `url(./img/player.png)`
        this.catElement.style.backgroundSize = `180px 60px`
        this.catElement.style.overflow = "hidden"
        this.catElement.style.backgroundRepeat = "no-repeat"
        this.catElement.style.backgroundPositionX = "0px"
        this.gameScreen.appendChild(this.catElement)
    }

    moves(framesCounter) {
        this.animateSprite(framesCounter)

        if (this.catPos.top < this.catPos.base) {
            this.catPos.top += this.catVel.top
            this.catVel.top += this.catVel.gravity
        } else {
            this.catPos.top = this.catPos.base
            this.catVel.top = 1
        }

        this.updatePosition()

    }

    animateSprite(framesCounter) {
        if (framesCounter % this.catSprite.frameSpeed == 0) {
            this.catSprite.currentFrame++
        }
        if (this.catSprite.currentFrame >= this.catSprite.totalFrames) {
            this.catSprite.currentFrame = 0
        }
        this.catSprite.backgroundPositionX = -this.catSize.w * this.catSprite.currentFrame
        this.updateSprite()
    }
    updateSprite() {
        this.catElement.style.backgroundPositionX = `${this.catSprite.backgroundPositionX}px`
    }


    updatePosition() {

        this.catElement.style.left = `${this.catPos.left}px`
        this.catElement.style.top = `${this.catPos.top}px`
    }


    jump() {

        if (this.catPos.top >= this.catPos.base &&
            this.catPos.left >= 19 &&
            this.catPos.left + this.catSize.w < this.gameSize.w) {


            this.catVel.top -= 16
            this.catPos.top -= 105
            this.updatePosition()

        }

        //this.catPos.left += this.catVel.left
        /* this.catVel.top += this.catVel.gravitiy
         this.catPos.top += this.catVel.top
         //this.catPos.left += 10
         this.updatePosition()*/

    }



    left() {
        if (this.catPos.left >= 20) {
            this.catPos.left -= this.catVel.left
            this.catElement.style.transform = `scaleX(-1)`
            this.updatePosition()
        }
    }

    right() {
        if (this.catPos.left + this.catSize.w < this.gameSize.w - 20) {
            this.catPos.left += this.catVel.left
            this.catElement.style.transform = `scaleX(1)`
            this.updatePosition()

        }
    }




}