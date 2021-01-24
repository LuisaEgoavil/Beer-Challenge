let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')
canvas.style.border = '2px solid black'
let intervalID = 0
let score = 0
let incrementManY = 10
let incrementManX = 10
let manX = 150
let manY = 200
let manHeight = 25
let manWidth = 25
let isLeftArrow = false;
let isRightArrow = false;
let maxRight = 1150
let maxLeft = 0
let rockY = -5
let rockX = 100
let rockPositionX = [54,250,350,800]
let rockPositionY = [-80,-250,-40,-500]
let coinX = -5
let coinY = 200


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

//CREATE IMAGES
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
    ctx.drawImage(coinImg, coinX, coinY)//coordenadas x,y
    ctx.font = "40px Verdana "
    ctx.fillText('Score: ' + score, 40, canvas.height - 150)

    //CALLBACK FUNCTIONS
    moveRocks() 
    movePlayer()
    dropCoins()
    rockCollision()

}

function moveRocks (){
    //ROCK crear un array con las posiciones de las piedras
    for(i = 0; i < rockPositionX.length; i++) {
        ctx.drawImage(rockImg, rockPositionX[i] , rockPositionY[i])

        if (rockPositionY[i] < canvas.height) {
            rockPositionY[i] += 10
           
         } else {
             rockPositionY[i] = -5 
             rockPositionX[i] = Math.floor(Math.random() * 1000)
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
    ctx.drawImage(coinImg, coinX, coinY)
    if(coinY < canvas.height) {
        coinY+= 3
    } else {
       coinY = -5
       coinX = Math.floor(Math.random()*1000)
    }
}

/*function rockCollision(){
    if() {

    }
}*/01

//COINS


setInterval(()=> {
    requestAnimationFrame(draw)
},30)



