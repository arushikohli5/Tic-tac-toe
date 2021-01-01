const X_Class="x"
const Circle_Class='circle'
const cellElement=document.querySelectorAll('.cell')
const board=document.getElementById('board')
const winningmessageelement=document.getElementById('winning-message')
const winningeMessageTextElement=document.querySelector('[data-winning-text-message]')
const restartbutton=document.getElementById('restartbutton')
const winning_combinations=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [1,4,8],
    [0,4,8],
    [2,4,6]
]
let circleTurn

startGame()

restartbutton.addEventListener('click',startGame)

function startGame(){

    circleTurn=false
    cellElement.forEach(cell=>{
        cell.classList.remove(X_Class)
        cell.classList.remove(Circle_Class)
        cell.removeEventListener('click',handleClick)
        cell.addEventListener('click', handleClick, {once:true})
    })
    
    setBoardHoverClass()
    winningmessageelement.classList.remove('show')
}
console.log('hello')


function handleClick(event){
    const cell=event.target
    const currentClass=circleTurn? Circle_Class : X_Class
    placeMark(cell,currentClass)

    if(checkWin(currentClass)){
        endGame(false)
    }
    else if(isDraw()){
        endGame(true)
    }
    else{
        swapTurns()
    setBoardHoverClass()
    }
}

function endGame(draw){
    if(draw){
        winningeMessageTextElement.innerText='Draw!'
    }
    else{
        winningeMessageTextElement.innerText=`${circleTurn? "O's":"X's"}Win!`
    }
    winningmessageelement.classList.add("show")
}

function isDraw(){
    return [...cellElement].every(cell=>{
        return cell.classList.contains(X_Class)||
        cell.classList.contains(Circle_Class)
    })
}

function placeMark(cell,currentClass){
    cell.classList.add(currentClass)
}

function swapTurns(){
    circleTurn=!circleTurn
}

function setBoardHoverClass(){
    board.classList.remove(X_Class)
    board.classList.remove(Circle_Class)

    if(circleTurn){
        board.classList.add(Circle_Class)
    }
    else{
        board.classList.add(X_Class)
    }
}

function checkWin(currentClass){
    return winning_combinations.some(combinations=>{
        return combinations.every(index=>{
            return cellElement[index].classList.contains(currentClass)
        })
    })
}










