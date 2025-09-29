import { TILE_STATUSES, markTile, createBoard } from "./minesweeper.js";

const BOARD_SIZE = 5;
const NO_OF_MINES = 10;

const board = createBoard(BOARD_SIZE, NO_OF_MINES);
const boardElement = document.querySelector('.board');
const minesLeftText = document.querySelector('[data-mine-count]');
boardElement.style.setProperty("--size", BOARD_SIZE);

board.forEach((row)=>{
    row.forEach((tile)=>{
        boardElement.append(tile.element);
        tile.element.addEventListener("click", ()=>{
            console.log("Left Click");
        })
        tile.element.addEventListener("contextmenu", (e)=>{
            e.preventDefault();
            markTile(tile);
            listMinesLeft();
        })
    })
})

function listMinesLeft(){
    const markedTilesCount = board.reduce((count, row)=>{
        return count + row.filter((tile) => tile.status === TILE_STATUSES.MARKED).length;
    }, 0)

    minesLeftText.textContent = NO_OF_MINES - markedTilesCount;
}

minesLeftText.textContent = NO_OF_MINES;