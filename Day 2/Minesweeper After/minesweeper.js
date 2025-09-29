
const TILE_STATUSES = {
    HIDDEN : "hidden",
    MINE : "mine",
    NUMBER  : "number",
    MARKED  : "marked"
}

export function createBoard(boardSize, numberOfMines){
    const board = [];
    for(let x = 0; x < boardSize; x++){
        let row = [];
        for(let y = 0; y < boardSize; y++){
            const element = document.createElement('div');
            element.dataset.status = TILE_STATUSES.HIDDEN;
            let tile = {
                element,
                x,
                y,
                // to get status
                get status(){
                    return this.element.dataset.status;
                },
                // to set status
                set status(value){
                    this.element.dataset.status = value;
                }
            };
            row.push(tile);
        }
        board.push(row);
    }

    return board;
}   