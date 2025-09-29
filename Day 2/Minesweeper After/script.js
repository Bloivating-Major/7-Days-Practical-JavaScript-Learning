import { TILE_STATUSES, markTile, createBoard, revealTile, checkWin, checkLose } from "./minesweeper.js";

const BOARD_SIZE = 8;
const NO_OF_MINES = 10;

const board = createBoard(BOARD_SIZE, NO_OF_MINES);
const boardElement = document.querySelector('.board');
const minesLeftText = document.querySelector('[data-mine-count]');
const messageText = document.querySelector('.subtext');
boardElement.style.setProperty("--size", BOARD_SIZE);
minesLeftText.textContent = NO_OF_MINES;


board.forEach((row)=>{
    row.forEach((tile)=>{
        boardElement.append(tile.element);
        tile.element.addEventListener("click", ()=>{
            revealTile(board, tile);
            checkGameEnd();
        })
        tile.element.addEventListener("contextmenu", (e)=>{
            e.preventDefault();
            markTile(tile);
            listMinesLeft();
        })
    })
})

function checkGameEnd(){
    const win = checkWin(board); 
    const lose = checkLose(board);

    // what we will be doing is using event propogation to stop the events
    if(win || lose){
        boardElement.addEventListener("click", stopProp, {capture : true});
        boardElement.addEventListener("contextmenu", stopProp, {capture : true});
    }

    if(win){
        messageText.textContent = "You Win";
    }

    if(lose){
        messageText.textContent = "You Lose";
        board.forEach((row)=>{
            row.forEach((tile)=>{
                if (tile.status === TILE_STATUSES.MARKED){
                    markTile(tile);
                }
                if(tile.mine){
                    revealTile(board, tile);
                }
            })
        })
    }
}

function stopProp(e){
    e.stopImmediatePropagation();
}

function listMinesLeft(){
    const markedTilesCount = board.reduce((count, row)=>{
        return count + row.filter((tile) => tile.status === TILE_STATUSES.MARKED).length;
    }, 0)

    minesLeftText.textContent = NO_OF_MINES - markedTilesCount;
}
