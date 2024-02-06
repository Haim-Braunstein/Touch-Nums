'use strict'
var gBoard
var gNums = resetNums()
var gNextNum
var gTimerInterval
var gMiliSeconds = 0
var gSeconds = 0
var gMinutes= 0
var gIsRunning = false
const gGameLevels = [16, 25, 36]
const gBoardSizes = [4, 5, 6]



function createBoard(level = 16, size = 4) {
    resetNums(level)
    const board = []
    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = drawNum()
        }
    }

    return board
}

function gameLevel(levelOptions) {

    const elGameLevel = document.querySelector('.game-level')
    var buttonsHTML = '<span>Game Level:</span>'

    for (var i = 0; i < levelOptions.length; i++) {
        const level = levelOptions[i]
        const boardSize = gBoardSizes[i]
        buttonsHTML += `<button onclick="onInit(${level}, ${boardSize})" >${level}</button>`
    }

    elGameLevel.innerHTML = buttonsHTML

}



function onInit(level, size) {
    gBoard = createBoard(level, size)
    renderBoard(gBoard)
    gNextNum = 1
    gameLevel(gGameLevels)
    const elRestart = document.querySelector('.restart')
    elRestart.innerHTML = `<button onclick="resetGame()" >Restart</button>`

}

function resetGame() {
    onInit()
    document.querySelector('.timer-container ').innerText = 'Time: 00:000'
    gSeconds = 0
    gMiliSeconds = 0
    clearInterval(gTimerInterval)
    gIsRunning = false
    const elNextNumber = document.querySelector('.next-number span')
    elNextNumber.innerHTML = '1'
}


function onCellClicked(elCell, cellI, cellJ) {
    const elNextNumber = document.querySelector('.next-number span')

    var board = gBoard.length ** 2
    resetNums()


    if (gBoard[cellI][cellJ] === gNextNum) {
        gNextNum++
        elNextNumber.innerHTML = `<span>${gNextNum}</span>`

        if (!gIsRunning) {
            startTimer()
        }
        elCell.style.backgroundColor = 'lightblue '

    }
    if (gNextNum > board) {
        clearInterval(gTimerInterval)
        gIsRunning = false
    }

}



function startTimer() {

    if (!gIsRunning) {

        gIsRunning = true;
        gTimerInterval = setInterval(updateTimer, 10)
        if (gNextNum === gNums.length) {
            gIsRunning = false
            clearInterval(gTimerInterval)
        }

    } else {
        gIsRunning = false
        clearInterval(gTimerInterval)

    }
}

function updateTimer() {

    if (gMiliSeconds === 99) {
        gSeconds++
        gMiliSeconds = 0
    } else {
        gMiliSeconds++
    }
    document.querySelector('.timer-container ').innerText = 'Time: ' +
    
        (gSeconds < 10 ? '0' : '') + gSeconds + '.' +
        (gMiliSeconds < 100 ? '0' : '') + gMiliSeconds
}


function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            const cell = board[i][j]
            strHTML += `<td data-i=${i} data-j=${j} onclick="onCellClicked(this, ${i}, ${j})" onclick="startTimer()">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    const elBoard = document.querySelector('tbody.board')
    elBoard.innerHTML = strHTML
}



function drawNum() {

    var randIdx = getRandomInt(0, gNums.length)
    var num = gNums[randIdx]
    gNums.splice(randIdx, 1)
    return num
}


function resetNums(levelGame = 16) {
    gNums = []
    for (var i = 1; i <= levelGame; i++) {
        gNums.push(i)
    }

    return gNums
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min
}