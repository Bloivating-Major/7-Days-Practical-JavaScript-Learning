export const TILE_STATUSES = {
  HIDDEN: "hidden",
  MINE: "mine",
  NUMBER: "number",
  MARKED: "marked",
};

export function createBoard(boardSize, numberOfMines) {
  const board = [];
  const minePositions = getMinePositions(boardSize, numberOfMines);
  for (let x = 0; x < boardSize; x++) {
    let row = [];
    for (let y = 0; y < boardSize; y++) {
      const element = document.createElement("div");
      element.dataset.status = TILE_STATUSES.HIDDEN;
      let tile = {
        element,
        mine: minePositions.some(positionMatch.bind(null, { x, y })),
        x,
        y,
        // to get status
        get status() {
          return this.element.dataset.status;
        },
        // to set status
        set status(value) {
          this.element.dataset.status = value;
        },
      };
      row.push(tile);
    }
    board.push(row);
  }

  return board;
}

export function markTile(tile) {
  if (
    tile.status !== TILE_STATUSES.HIDDEN &&
    tile.status !== TILE_STATUSES.MARKED
  ) {
    return;
  }

  if (tile.status === TILE_STATUSES.MARKED) {
    tile.status = TILE_STATUSES.HIDDEN;
  } else {
    tile.status = TILE_STATUSES.MARKED;
  }
}

export function revealTile(board, tile) {
  if (tile.status !== TILE_STATUSES.HIDDEN) {
    return;
  }

  if (tile.mine) {
    tile.status = TILE_STATUSES.MINE;
    return;
  }
  tile.status = TILE_STATUSES.NUMBER;

  // Here we found out adjacent tiles
  const adjacentTiles = nearByTiles(board, tile);

  // Here we find out how many mines are present in that adjacent area
  const mines = adjacentTiles.filter((t) => t.mine);

  // Now what we can do is if we don't have any mine then we will do something
  if (mines.length === 0) {
    adjacentTiles.forEach(revealTile.bind(null, board));
  } else {
    tile.element.textContent = mines.length;
  }
}

// function to find adjacent tiles
function nearByTiles(board, { x, y }) {
  const tiles = [];

  for (let xOffset = -1; xOffset <= 1; xOffset++) {
    for (let yOffset = -1; yOffset <= 1; yOffset++) {
      const tile = board[x + xOffset]?.[y + yOffset];
      if (tile) tiles.push(tile);
    }
  }

  return tiles;
}

export function checkWin(board) {
  return board.every((row) => {
    return row.every((tile) => {
      return (
        tile.status === TILE_STATUSES.NUMBER ||
        (tile.mine &&
          (tile.status === TILE_STATUSES.HIDDEN ||
            tile.status === TILE_STATUSES.MARKED))
      );
    });
  });
}

export function checkLose(board) {
  return board.some((row) => {
    return row.some((tile) => {
      return tile.status === TILE_STATUSES.MINE;
    });
  });
}

function getMinePositions(boardSize, numberOfMines) {
  const positions = [];
  while (positions.length < numberOfMines) {
    const position = {
      x: randomNumber(boardSize),
      y: randomNumber(boardSize),
    };

    if (!positions.some(positionMatch.bind(null, position))) {
      positions.push(position);
    }
  }

  return positions;
}

function positionMatch(a, b) {
  return a.x === b.x && a.y === b.y;
}

function randomNumber(size) {
  return Math.floor(Math.random() * size);
}
