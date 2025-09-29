import { createBoard } from "./minesweeper.js";

const BOARD_SIZE = 5;
const NO_OF_MINES = 2;

const board = createBoard(BOARD_SIZE, NO_OF_MINES);
const boardElement = document.querySelector('.board');
boardElement.style.setProperty("--size", BOARD_SIZE);

board.forEach((row)=>{
    row.forEach((tile)=>{
        boardElement.append(tile.element);
    })
})