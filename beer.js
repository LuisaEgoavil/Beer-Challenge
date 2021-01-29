let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')
canvas.style.border = '2px solid black'
let intervalID = 0
let score = 0
//MAN STATISTICS
let incrementManY = 10
let incrementManX = 10
let manX = 575
let manY = 500
let manHeight = 80 
let manWidth = 60
//KEYS
let isLeftArrow = false;
let isRightArrow = false;
let maxRight = 1150
let maxLeft = 0
//ROCKS
let rockPositionX = [50,250,700,1000]
let rockPositionY = [-80,-250,-40,-500]
let rockHeight = 30 
let rockWidth = 60
let rockVelocity = 10
//COINS
let coinX = -5
let coinY = 200
let coinHeight = 60
let coinWidth = 70

let startBtn = document.querySelector('#start')

//MUSIC
let coinSound = new Audio('./sounds/coinsound.mp3')
let gameOverSound = new Audio('./sounds/gameoversound.mp3')
let winSound = new Audio ('./sounds/winsound.mp3')

//KEYS
document.addEventListener ('keydown', (event) =>{
    if (event.keyCode == 39 || event.key == "ArrowRight") {
        isRightArrow = true;
        isLeftArrow = false;
    }
    else if (event.keyCode == 37 || event.key == "ArrowLeft") {
        isRightArrow = false;
        isLeftArrow = true;
    }
})
document.addEventListener('keyup', ()=>{
    isRightArrow = false;
    isLeftArrow = false;
})

//IMAGES
let backImg = document.createElement('img')
backImg.src = 'images/city.png'

let manImg = document.createElement('img')
manImg.src = 'images/man.png'

let rockImg = document.createElement('img')
rockImg.src = 'images/rock.png'

let coinImg = document.createElement('img')
coinImg.src = 'images/coin.png'

function draw () {
    ctx.drawImage(backImg, 0 ,0)
    ctx.drawImage(manImg, manX, manY)
    ctx.drawImage(coinImg, coinX, coinY,80,64)//X,Y COORDINATES
    ctx.font = "50px Verdana"
    ctx.fillText('Score: ' + score, 10, canvas.height - 380)
   
    //CALLBACK FUNCTIONS
    moveRocks() 
    movePlayer()
    dropCoins()
    coinCollision()
}

function moveRocks (){
    //CREATE AN ARRAY OF ROCKS AND A FOR LOOP
    for(i = 0; i < rockPositionX.length; i++) {
      
        if (rockPositionY[i] < canvas.height) {
            rockPositionY[i] += rockVelocity
           
         } else {
             rockPositionY[i] = -15
             rockPositionX[i] = Math.floor(Math.random() * 1000)
         }
         ctx.drawImage(rockImg, rockPositionX[i] , rockPositionY[i],80,64)
         //COLLISION
         if (rockPositionX[i] + rockWidth > manX && 
            rockPositionX[i] < manX + manWidth && 
            rockPositionY[i] + rockHeight > manY) {
            clearInterval(intervalID)
            gameOver()
            gameOverSound.play() //MUSIC
            
         }
    }                                                                                                                                                                                                                                                                                                                                                                                                           
}

function movePlayer (){
    if (isRightArrow && manX < maxRight) {
        manX += incrementManX
    }
    else if (isLeftArrow && manX > maxLeft) {
        manX -= incrementManX
    }
}

function dropCoins(){
    if(coinY < canvas.height) {
        coinY+= 3
    } else {
       coinY = -5
       coinX = Math.floor(Math.random()*1000)
    }
}

function coinCollision() {
    if(coinX + coinWidth > manX && 
        coinX < manX + manWidth && 
        coinY + coinHeight > manY){
        score++ //SCORE WILL INCREMENT
        rockVelocity++ //VELOCITY WILL INCREMENT
        coinSound.play() //MUSIC
        coinY = -60
        coinX = Math.floor(Math.random()*1000)  
    } 
    //GOAL IF THE PLAYER ACHIEVES 5 COINS
    if (score === 1) {
        winSound.play()//MUSIC
        winGame()
       
        
    } 

}

function gameOver(){
    canvas.style.display = "none" // HIDE CANVAS WHEN THE GAME IS FINISHED

    let body = document.querySelector('body')

    gameOverScreen = document.createElement('div')
    gameOverScreen.classList.add('gameOverScr')
    gameOverScreen.innerHTML = `
        <h1>-GAME OVER-</h1>
        <h2>Sorry! Maybe next time!</h2>
        <img src="images/nobeer.png"><br><br><br><br>
        <button class='reset-btn'>Try again?</button>
    `

    body.appendChild(gameOverScreen)
    let reset = gameOverScreen.querySelector('.reset-btn')
    reset.addEventListener('click', ()=>{
       
        restartGame()
        gameOverSound.load()
    })
    
}

function startGame(){
   
    canvas.style.display = 'block'
    startBtn.style.display = 'none'
    let text = document.getElementById('starttext')
    text.style.display = 'none'

    intervalID = setInterval(()=> {
        requestAnimationFrame(draw)
    }, 30)

    
}

function restartGame() {
    
    //SET SOME VARIABLES TO ORIGINAL POSITION
    intervalID = 0
    score = 0
    manX = 575
    manY = 500
    rockPositionX = [50,250,700,1000]
    rockPositionY = [-80,-250,-40,-500]
    rockVelocity = 10
    
    startGame()
 gameOverScreen.style.display = 'none' ////
}

function winGame(){

    canvas.style.display = "none" // HIDE CANVAS WHEN THE GAME IS FINISHED
    let body = document.querySelector('body')
    winScreen = document.createElement('div')
    winScreen.classList.add('winScr')
    winScreen.innerHTML = `
        <h1>-You win!-</h1>
        <img src="images/winbeer.png"><br><br><br><br>
        <button class='play-again'>Play again?</button>
    `
    clearInterval(intervalID)
    body.appendChild(winScreen)
    let reset = winScreen.querySelector('.play-again')
    reset.addEventListener('click', ()=>{
        winScreen.style.display = 'none'
        restartGame()
        winSound.load()
       
    })
}

window.addEventListener('load', () => {
    canvas.style.display = 'none'

    startBtn.addEventListener('click', ()=>{
        startGame()
    })
});
