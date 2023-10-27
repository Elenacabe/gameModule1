const Game = {

    gameScreen: document.querySelector("#game-screen"),
    enter: document.querySelector('.Enter'),

    gameSize: {
        w: window.innerWidth,
        h: window.innerHeight
    },
    gameSound: new Audio('./sounds/game.mp3'),
    finishSound: new Audio('./sounds/finishmeow.mp3'),
    crunchSound: new Audio('./sounds/purr.mp3'),
    winwinSound: new Audio('./sounds/winwin.mp3'),
    gameO: new Audio('./sounds/gameO.mp3'),

    framesCounter: 0,

    gameOverr: undefined,
    cat: undefined,
    pochiFish: [],
    pochiFishDensity: 80,
    goodFish: [],
    goodFishDensity: 100,
    platforms: [],
    // deadlyFish
    gameW: undefined,

    isPaused: false,

    keys: {
        left: 'KeyA',
        right: 'KeyD',
        jump: 'Space',
        enter: 'Enter'
    },

    //playerOnPlatform: false,


    init() {

        this.setEventListener()

        this.setDimensions()
        //this.start()


    },

    setDimensions() {

        this.gameScreen.style.width = `${this.gameSize.w}px`
        this.gameScreen.style.height = `${this.gameSize.h}px`
        this.gameScreen.style.backgroundImage = 'url("./img/cityskyline.png")'
    },

    //mirar 
    setEventListener() {


        document.addEventListener("keydown", e => {
            if (!this.isPaused) {
                switch (e.code) {
                    case this.keys.enter:
                        this.start()
                        this.enter.style.display = 'none'
                        this.gameScreen.style.display = "block"
                        break;
                    case this.keys.jump:
                        this.cat.jump()
                        break;
                    case this.keys.right:
                        this.cat.right()
                        break;
                    case this.keys.left:
                        this.cat.left()
                        break;
                    case this.keys.jump && this.keys.right:
                        this.cat.right()
                        this.cat.jump()
                        break;
                    case this.keys.jump && this.keys.left:
                        this.cat.left()
                        this.cat.jump()
                        break;
                }
            }
        })

    },


    gameLoop() {
        if (!this.isPaused) {


            this.drawAll()

            this.framesCounter >= 5000 ? this.framesCounter = 0 : this.framesCounter++
            if (this.framesCounter % this.pochiFishDensity === 0) {
                this.generateFish()
            }
            if (this.framesCounter % this.goodFishDensity === 0) {
                this.generateGoodFish()
            }
            this.isCollision()
            this.clearFish()
            this.clearGoodFish()
            this.collisionBadFish()
            this.collisionGoodFish()

            this.gameSound.play()

            this.gameOver()


            window.requestAnimationFrame(() => this.gameLoop())

        }

    },


    drawAll() {
        this.cat.moves(this.framesCounter)
        this.pochiFish.forEach((fish) => {
            fish.move()
        })
        this.goodFish.forEach((fish) => {
            fish.move()
        })



        //this.isCollision()


    },




    start() {
        this.createElement()
        this.createPlatforms()
        this.gameLoop()
    },

    createElement() {


        this.cat = new Cat(this.gameScreen, this.gameSize)
        this.lifes = new Lifes(this.gameScreen, this.gameSize)


    },

    createPlatforms() {

        this.platforms.push(new Platform(this.gameScreen, this.gameSize, 200, 60, 200, 500))
        this.platforms.push(new Platform(this.gameScreen, this.gameSize, 200, 60, 200, 200))
        this.platforms.push(new Platform(this.gameScreen, this.gameSize, 200, 60, 600, 500))
        this.platforms.push(new Platform(this.gameScreen, this.gameSize, 200, 60, 600, 200))
        this.platforms.push(new Platform(this.gameScreen, this.gameSize, 200, 60, 1100, 500))
        this.platforms.push(new Platform(this.gameScreen, this.gameSize, 200, 60, 1100, 200))



    },
    clearFish() {
        this.pochiFish.forEach((fish, idx) => {
            if (fish.fishPos.left <= 0) {
                fish.fishElement.remove()
                this.pochiFish.splice(idx, 1)

            }
        })

    },
    collisionBadFish() {

        this.pochiFish.forEach((fish, idx) => {

            if (fish.fishPos.left <= this.cat.catPos.left + this.cat.catSize.w &&
                fish.fishPos.top - 10 <= this.cat.catPos.top + this.cat.catSize.h &&
                fish.fishPos.top + fish.fishSize.h + 10 >= this.cat.catPos.top) {
                fish.fishElement.remove()
                this.finishSound.play()
                this.pochiFish.splice(idx, 1)
                this.cat.lifes--

                this.lifes.updateLifes()



            }
        })
    },
    showImage() {
        this.gameOverr = document.createElement('img')
        this.gameOverr.style.position = "absolute"
        this.gameOverr.style.width = `800px`
        this.gameOverr.style.height = `700px`
        this.gameOverr.style.left = `300px`
        this.gameOverr.style.top = `10px`
        this.gameOverr.src = "./img/sadcat.png"
        this.gameOverr.style.zIndex = "2"
        this.gameScreen.appendChild(this.gameOverr)
        this.gameO.play()
    },
    showWin() {
        this.gameW = document.createElement('img')
        this.gameW.style.position = "absolute"
        this.gameW.style.width = `800px`
        this.gameW.style.height = `700px`
        this.gameW.style.left = `300px`
        this.gameW.style.top = `100px`
        this.gameW.src = "./img/happycat.png"
        this.gameW.style.zIndex = "2"
        this.gameScreen.appendChild(this.gameW)
        this.winwinSound.play()
    },
    gameOver() {
        if (this.cat.lifes <= 0) {
            this.showImage()

            this.isPaused = true
            this.gameSound.pause()








        }
        if (this.cat.lifes >= 15) {
            this.showWin()
            this.isPaused = true
            this.gameSound.pause()
        }
    },
    collisionGoodFish() {

        this.goodFish.forEach((fish, idx) => {

            if (fish.fishPos.left <= this.cat.catPos.left + this.cat.catSize.w &&
                fish.fishPos.top - 10 <= this.cat.catPos.top + this.cat.catSize.h &&
                fish.fishPos.top + 10 >= this.cat.catPos.top) {
                fish.fishElement.remove()
                this.crunchSound.play()
                this.goodFish.splice(idx, 1)
                this.cat.lifes++
                this.lifes.updateLifes()




            }
        })
    },
    clearGoodFish() {
        this.goodFish.forEach((fish, idx) => {
            if (fish.fishPos.left <= 0) {
                fish.fishElement.remove()
                this.goodFish.splice(idx, 1)
            }
        })
    },


    generateFish() {
        this.pochiFish.push(new Fish(this.gameScreen, this.gameSize))

    },
    generateGoodFish() {
        this.goodFish.push(new GoodFish(this.gameScreen, this.gameSize))
    },

    isCollision() {
        let onPlatform = false
        this.platforms.forEach((e) => {
            if (this.cat.catPos.left + this.cat.catSize.w >= e.platformPos.left + 20 &&
                this.cat.catPos.left <= e.platformPos.left + e.platformSize.w &&
                this.cat.catPos.top < e.platformPos.top + e.platformSize.h) {
                onPlatform = true
                if (onPlatform) {
                    this.cat.catPos.base = e.platformPos.top - e.platformSize.h + 30
                }
            } else if (!onPlatform) {
                this.cat.catPos.base = this.gameSize.h - this.cat.catSize.h
            }
        })
    }


    // isCollisionH() {
    //     let isCollision = false;
    //     let onPlatform = false
    //     this.platforms.forEach((e) => {
    //         if (this.cat.catHitbox.right >= e.platformHitbox.left &&
    //             this.cat.catHitbox.bottom >= e.platformHitbox.top &&
    //             this.cat.catHitbox.top <= e.platformHitbox.bottom) {
    //             isCollision = true
    //             console.log("leftCol" + isCollision)
    //             this.cat.catPos.left = e.platformHitbox.left - this.cat.catSize.w
    //         }
    //         else if (this.cat.catHitbox.right > e.platformHitbox.left &&
    //             this.cat.catHitbox.left < e.platformHitbox.right &&
    //             this.cat.catHitbox.bottom > e.platformHitbox.bottom) {
    //             isCollision = true
    //             console.log("rightCol" + isCollision)
    //             this.cat.catPos.left = e.platformHitbox.right
    //         }
    //         else if (this.cat.catHitbox.left <= e.platformHitbox.right &&
    //             this.cat.catHitbox.bottom > e.platformHitbox.top &&
    //             this.cat.catHitbox.top < e.platformHitbox.bottom) {
    //             isCollision = true
    //             console.log("bottomCol" + isCollision)
    //             this.cat.catPos.top = e.platformHitbox.bottom
    //         }
    //         else if (this.cat.catHitbox.right >= e.platformHitbox.left &&
    //             this.cat.catHitbox.left <= e.platformHitbox.right &&
    //             this.cat.catHitbox.bottom < e.platformHitbox.top) {
    //             onPlatform = true
    //             console.log("onPlatform" + onPlatform)
    //             if (onPlatform) {
    //                 this.cat.catPos.base = e.platformPos.top
    //             }
    //         }



    //     })

    // }


}





