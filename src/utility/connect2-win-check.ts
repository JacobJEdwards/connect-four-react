import type { BoardPiece, Direction } from './types'

const WINNING_PIECES = 4

const directions: Direction[] = [
  { dx: 1, dy: 0 },
  { dx: 0, dy: 1 },
  { dx: 1, dy: 1 },
  { dx: 1, dy: -1 },
]

const checkLine = (line: BoardPiece[], player: BoardPiece): boolean => {
  let count = 0
  for (let i = 0; i < line.length; i++) {
    if (line[i] === player) {
      count++
      if (count === WINNING_PIECES) {
        return true
      }
    } else {
      count = 0
    }
  }
  return false
}

const checkDirection = (
  grid: BoardPiece[][],
  player: BoardPiece,
  startCol: number,
  startRow: number,
  dir: Direction
): boolean => {
  const { dx, dy } = dir
  const endCol = startCol + dx * (WINNING_PIECES - 1)
  const endRow = startRow + dy * (WINNING_PIECES - 1)
  if (
    endCol < 0 ||
      endCol >= grid[0].length ||
      endRow < 0 ||
      endRow >= grid.length
  ) {
    return false
  }
  const line: BoardPiece[] = []
  for (let i = 0; i < WINNING_PIECES; i++) {
    const col = startCol + dx * i
    const row = startRow + dy * i
    line.push(grid[row][col])
  }
  return checkLine(line, player)
}

export default function checkWin(grid: BoardPiece[][], player: BoardPiece): boolean {
  if (grid.flat().every((piece) => piece !== 0)) {
    return true
  }
  for (let col = 0; col < grid[0].length; col++) {
    for (let row = 0; row < grid.length; row++) {
      if (grid[row][col] !== player) {
        continue
      }
      for (const dir of directions) {
        if (checkDirection(grid, player, col, row, dir)) {
          return true
        }
      }
    }
  }
  return false
}
