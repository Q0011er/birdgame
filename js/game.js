'use strict'
let cvs =document.getElementById('canvas')
let ctx=cvs.getContext('2d')

let bird = new Image()
let bg = new Image()
let fg = new Image()
let pipeUp = new Image()
let pipeBottom = new Image()

bird.src = 'img/bird.png'
bg.src = 'img/bg.png'
fg.src = 'img/fg.png'
pipeUp.src = 'img/pipeUp.png'
pipeBottom.src = 'img/pipeBottom.png'

let fly_mp3 = new Audio()
let score_mp3 = new Audio()

fly_mp3.src = 'audio/fly.mp3'
score_mp3.src = 'audio/score.mp3'

let gap = 100

let pipes = []
pipes[0] = {
    x : cvs.width,
    y : 0
}

let score = 0

//bird param
let xPosBird = 40
let yPosBird = 200
let grav = 1.5

document.addEventListener("keydown", moveUp)

function moveUp() {
    yPosBird -=15
}

function draw() {
    ctx.drawImage(bg, 0, 0)

    for (let i = 0; i < pipes.length; i++) {
        ctx.drawImage(pipeUp, pipes[i].x, pipes[i].y)
        ctx.drawImage(pipeBottom, pipes[i].x, pipes[i].y+pipeUp.height+gap)
        pipes[i].x--
        
        if (pipes[i].x == 125) {
            pipes.push({
                x:cvs.width,
                y:Math.floor(Math.random()*pipeUp.height) - pipeUp.height
            })
        }

        if((xPosBird + bird.width >= pipes[i].x)
            && (xPosBird <= pipes[i].x + pipeUp.width)
            && (yPosBird <= pipes[i].y + pipeUp.height
            || yPosBird + bird.height >= pipes[i].y + pipeUp.height + gap) || (yPosBird+bird.height >= cvs.height-fg.height)) {
                location.reload(); // Перезагрузка страницы
        }

        if(pipes[i].x == 5) {
            score++
        }

    }
    ctx.drawImage(fg, 0, cvs.height-fg.height)
    ctx.drawImage(bird, xPosBird, yPosBird)
    yPosBird +=grav

    ctx.fillStyle = "#000"
    ctx.font = "24px Verdana"
    ctx.fillText("Счет: " + score, 10, cvs.height - 20)

    requestAnimationFrame(draw)
}

pipeBottom.onload = draw