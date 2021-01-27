let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')
canvas.style.border = '2px solid black'
let intervalID = 0
let score = 0
let incrementManY = 10
let incrementManX = 10
// MAN STATISTICS
let manX = 575
let manY = 500
let manHeight = 80 
let manWidth = 60
//KEYS
let isLeftArrow = false;
let isRightArrow = false;
let maxRight = 1150
let maxLeft = 0
//let rockY = -5
//let rockX = 100
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
    ctx.drawImage(coinImg, coinX, coinY,80,64)//coordenadas x,y
    ctx.font = "50px Verdana"
    ctx.fillText('Score: ' + score, 10, canvas.height - 380)

    //CALLBACK FUNCTIONS
    moveRocks() 
    movePlayer()
    dropCoins()
    coinCollision()
}

function moveRocks (){
    //ROCK crear un array con las posiciones de las piedras
    for(i = 0; i < rockPositionX.length; i++) {
        //ctx.drawImage(rockImg, rockPositionX[i] , rockPositionY[i],rockWidth,rockHeight)
        //console.log('Rock X =>', rockPositionX[i])
        //console.log('Rock Y =>', rockPositionY[i])
        /*rockPositionY[i] += 10

        if (rockPositionY[i] == 200) {
            rockPositionX.push(Math.floor(Math.random() * 1000))
            rockPositionY.push(-10)
        }
        console.log(rockPositionX)*/
      
        if (rockPositionY[i] < canvas.height) {
            rockPositionY[i] += rockVelocity
           
         } else {
             rockPositionY[i] = -15
             rockPositionX[i] = Math.floor(Math.random() * 1000)
         }
         ctx.drawImage(rockImg, rockPositionX[i] , rockPositionY[i],80,64)
        /* 
        if (rockPositionY[i] + rockHeight > manY && 
            manX > rockPositionX[i] && (manX + manWidth < rockPositionX[i] + rockWidth)) {

                console.log(rockPositionY[i], manY )
                console.log('game ended')
                clearInterval(intervalID)
                gameOver()
                
         }*/
         if (rockPositionX[i] + rockWidth > manX && 
            rockPositionX[i] < manX + manWidth && 
            rockPositionY[i] + rockHeight > manY) {
            clearInterval(intervalID)
            gameOver()
            console.log(rockPositionX[i], rockPositionY[i],manX, manY )
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
    
        coinY = -60
        coinX = Math.floor(Math.random()*1000)

    //ctx.fillText('Score: ' + score, 40, canvas.height - 150)   
    } 

    if (score === 10) {
        winGame()
    } 

}

function gameOver(){
    canvas.style.display = "none" // esconder el canvas cuando el juego termine
    clearInterval(intervalID) 
    let body = document.querySelector('body')

    gameOverScreen = document.createElement('div')
    gameOverScreen.classList.add('gameOverScr')
    gameOverScreen.innerHTML = `
        <h1>GAME OVER</h1>
        <h2>Sorry! Maybe next time!</h2>
        <button class='reset-btn'>Try again?</button>
    `

    body.appendChild(gameOverScreen)
    let reset = gameOverScreen.querySelector('.reset-btn')
    reset.addEventListener('click', ()=>{
    restartGame()
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
 gameOverScreen.style.display = 'none'
 startGame()
 
}

function winGame(){
    canvas.style.display = "none" // esconder el canvas cuando el juego termine
    clearInterval(intervalID) 
    let body = document.querySelector('body')
    winScreen = document.createElement('div')
    winScreen.classList.add('winScr')
    winScreen.innerHTML = `
        <h1>You win!</h1>
        <button class='play-again'>Play again?</button>
    `
    body.appendChild(winScreen)
    let reset = winScreen.querySelector('.play-again')
    reset.addEventListener('click', ()=>{
    restartGame()
    })
}

window.addEventListener('load', () => {
    canvas.style.display = 'none'

    startBtn.addEventListener('click', ()=>{
        startGame()
    })
});
