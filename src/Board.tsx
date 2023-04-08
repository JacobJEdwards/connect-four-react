/* eslint-disable @typescript-eslint/comma-dangle */
import React, { useState, useRef, memo } from 'react'
import type { FC } from 'react'
import './Board.css'

const WINNING_PIECES = 4

// props for the "Board Piece" component
// only accepts 3 colours
type PieceColours = 'black' | 'red' | 'green'

// type for the grid (ie a piece can be 0, 1 or 2)
type BoardPiece = 0 | 1 | 2

// prop types
interface PieceProps {
  colour: PieceColours
  className?: string
}
interface BoardProps {
  numRows: number
  numCols: number
}

interface ColumnProps {
  column: BoardPiece[]
  won: boolean
  onClick: () => void
}

interface Direction {
  dx: number
  dy: number
}

function checkWin(grid: BoardPiece[][], player: BoardPiece): boolean {
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

// "Board Piece" component -> takes a colour prop and returns a span with that colour
const Piece: FC<PieceProps> = memo(({ colour }: PieceProps) => {
  return <span className={`${colour} piece`}></span>
})

Piece.displayName = 'Piece'

const Column: FC<ColumnProps> = memo(
  ({ column, onClick, won }: ColumnProps) => {
    return (
      <div
        className={`column ${!column.includes(0) || won ? 'full' : ''}`}
        onClick={onClick}>
        {column.map((piece, index) => (
          <Piece
            colour={piece === 0 ? 'black' : piece === 1 ? 'red' : 'green'}
            key={index}
          />
        ))}
      </div>
    )
  }
)

Column.displayName = 'Column'

// "Board" component -> returns a div with 6 columns, each with 7 pieces
const Board: FC<BoardProps> = ({ numRows = 6, numCols = 7 }: BoardProps) => {
  // grid is a 2D array of 6 columns, each with 7 pieces
  const [grid, setGrid] = useState<BoardPiece[][]>(
    Array.from({ length: numRows }, () => Array(numCols).fill(0))
  )

  // turn is a ref to a number, which is used to determine which player's turn it is. Set in the handle click function
  const turn = useRef<number>(0)
  const [gameWon, setGameWon] = useState<boolean>(false)

  const handleReset = (): void => {
    setGrid(Array.from({ length: numRows }, () => Array(numCols).fill(0)))
    turn.current = 0
    setGameWon(false)
  }

  // handle click function -> takes an index, which is the column that was clicked. It then checks if the column is full, and if it isn't, it adds a piece to the bottom of the column
  const handleClick = (colIndex: number): void => {
    if (gameWon) {
      return
    }

    const player: BoardPiece = turn.current % 2 === 0 ? 1 : 2

    const newGrid = grid.map((row) => [...row])

    for (let rowIndex = numRows; rowIndex >= 0; rowIndex--) {
      if (newGrid[colIndex][rowIndex] === 0) {
        newGrid[colIndex][rowIndex] = player
        setGrid(newGrid)
        turn.current++

        if (checkWin(newGrid, player)) {
          setTimeout(() => {
            setGameWon(true)
          }, 20)
        }
        return
      }
    }
  }

  // returns a div with 6 columns, each with 7 pieces
  return (
    <section>
      <header>
        <h1>Connect Four</h1>
      </header>
      <div className='board'>
        {grid.map((column, index) => (
          <Column
            column={column}
            onClick={() => {
              handleClick(index)
            }}
            key={index}
            won={gameWon}
          />
        ))}
      </div>
      {gameWon && (
        <div className='game-won'>
          <h1>Player {turn.current % 2 === 0 ? 2 : 1} Won!</h1>
        </div>
      )}
      <button
        className='reset'
        onClick={handleReset}>
        Reset
      </button>
    </section>
  )
}

export default Board
