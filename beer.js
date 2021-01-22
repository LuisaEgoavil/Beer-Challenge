let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')
canvas.style.border = '2px solid black'
let intervalID = 0
let score = 0




// IMAGES
let backImg = document.createElement('img')
backImg.src = 'images/city.png'

let manImg = document.createElement('img')
manImg.src= 'images/man.png'

function draw () {
    ctx.drawImage(backImg, 0 ,0)
    ctx.drawImage(manImg, 40, canvas.height-40 - manImg.height)
    ctx.font = "40px Verdana"
    ctx.fillText('Score: ' + score, 20, canvas.height - 50)

}

















intervalID = setInterval(() => {
    requestAnimationFrame(draw)
},100)