let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')
canvas.style.border = '2px solid black'
let intervalID = 0
let score = 0
let incrementManY = 10
let incrementManX = 10
// MAN STATISTICS
let manX = 575
let manY = 200
let manHeight = 25 
let manWidth = 25
//KEYS
let isLeftArrow = false;
let isRightArrow = false;
let maxRight = 1150
let maxLeft = 0
//let rockY = -5
//let rockX = 100
let rockPositionX = [50,250,350,800]
let rockPositionY = [-80,-250,-40,-500]
let rockHeight = 70 
let rockWidth = 70
//COINS
let coinX = -5
let coinY = 200
let coinHeight = 70
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
    ctx.drawImage(manImg, manX, canvas.height-20 - manImg.height)
    ctx.drawImage(coinImg, coinX, coinY,coinWidth,coinHeight)//coordenadas x,y
    ctx.font = "40px Verdana "
    ctx.fillText('Score: ' + score, 40, canvas.height - 150)

    //CALLBACK FUNCTIONS
    moveRocks() 
    movePlayer()
    dropCoins()
    coinCollision()
}

function moveRocks (){
    //ROCK crear un array con las posiciones de las piedras
    for(i = 0; i < rockPositionX.length; i++) {
        ctx.drawImage(rockImg, rockPositionX[i] , rockPositionY[i],rockWidth,rockHeight)
        //console.log('Rock X =>', rockPositionX[i])
        //console.log('Rock Y =>', rockPositionY[i])
        rockPositionY[i] += 10

        if (rockPositionY[i] == 500) {
            rockPositionX.push(Math.floor(Math.random() * 1000))
            rockPositionY.push(-10)
        }
        /*
        if (rockPositionY[i] < canvas.height) {
            rockPositionY[i] += 10
           
         } else {
             rockPositionY[i] = -15
             rockPositionX[i] = Math.floor(Math.random() * 1000)
         }
         */
        if (rockPositionY[i] + rockHeight > manY && 
            manX > rockPositionX[i] && (manX + manWidth < rockPositionX[i] + rockWidth)) {

                console.log(rockPositionY[i], manY )
                console.log('game ended')
                clearInterval(intervalID)
                gameOver()
                
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
    if(rockPositionY[i] + rockHeight > manY && 
        manX > rockPositionX[i] && (manX + manWidth < rockPositionX[i] + rockWidth)) {
        score++
    }

}

function gameOver(){
    canvas.style.display = "none" // esconder el canvas cuando el juego termine
    //startBtn.style.display = 'block'
    //clearInterval(intervalID) 
    //alert('GameOver')
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
     
    })

}

function startGame(){
    
    canvas.style.display = 'block'
    startBtn.style.display = 'none'
    let text = document.getElementById('#starttext')
    text.style.display = 'none'

    intervalID = setInterval(()=> {
        requestAnimationFrame(draw)
    }, 30)


   
}

window.addEventListener('load', () => {
    canvas.style.display = 'none'

    startBtn.addEventListener('click', ()=>{
        startGame()
    })
});
