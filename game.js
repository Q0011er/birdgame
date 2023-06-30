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

let gap = 90

let pipes = []
pipes[0] = {
    x : cvs.width,
    y : 0
}

let xPosBird = 40
let yPosBird = 180
let grav = 1;

document.addEventListener("keydown", moveUp)

function moveUp() {
    yPosBird -=20
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


    }
    ctx.drawImage(fg, 0, cvs.height-fg.height)
    ctx.drawImage(bird, xPosBird, yPosBird)
    yPosBird +=grav

    requestAnimationFrame(draw)
}

pipeBottom.onload = draw