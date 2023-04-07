import React, { useState, useRef, memo } from 'react'
import type { ReactElement } from 'react'
import './Board.css'

// props for the "Board Piece" component
// only accepts 3 colours
type PieceColours = 'black' | 'red' | 'green'
// type for the grid (ie a piece can be 0, 1 or 2)
type BoardPiece = 0 | 1 | 2

interface PieceProps {
  colour: PieceColours
}
interface BoardProps {
  numRows: number
  numCols: number
  reset?: () => void
}

interface ColumnProps {
  column: BoardPiece[]
  won: boolean
  onClick: () => void
}

// "Board Piece" component -> takes a colour prop and returns a span with that colour
const Piece = memo(({ colour }: PieceProps): ReactElement => {
  return <span className={`${colour} piece`}></span>
})

Piece.displayName = 'Piece'

const Column = memo(({ column, onClick, won }: ColumnProps): ReactElement => {
  return (
    <div
      className={`column ${
        column.every((piece) => piece !== 0) || won ? 'full' : ''
      }`}
      onClick={onClick}>
      {column.map((piece, index) => (
        <Piece
          colour={piece === 0 ? 'black' : piece === 1 ? 'red' : 'green'}
          key={index}
        />
      ))}
    </div>
  )
})

Column.displayName = 'Column'

// "Board" component -> returns a div with 6 columns, each with 7 pieces
const Board = ({ numRows = 6, numCols = 7 }: BoardProps): ReactElement => {
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

  const checkWin = (
    newGrid: BoardPiece[][],
    colIndex: number,
    rowIndex: number,
    player: BoardPiece
  ): boolean => {
    const checkLine = (line: BoardPiece[]): boolean => {
      let count = 0
      for (let i = 0; i < line.length; i++) {
        if (line[i] === player) {
          count++
          if (count === 4) {
            return true
          }
        } else {
          count = 0
        }
      }
      return false
    }

    // check column
    if (checkLine(newGrid[colIndex])) {
      return true
    }

    // check row
    const row = newGrid.map((column) => column[rowIndex])
    if (checkLine(row)) {
      return true
    }

    // check diagonal (top-left to bottom-right)
    let rowStart = rowIndex
    let colStart = colIndex
    while (rowStart > 0 && colStart > 0) {
      rowStart--
      colStart--
    }

    let diagonal: BoardPiece[] = []
    while (rowStart < numRows && colStart < numCols) {
      diagonal.push(newGrid[rowStart][colStart])
      rowStart++
      colStart++
    }
    if (checkLine(diagonal)) {
      return true
    }

    // check diagonal (top-right to bottom-left)
    rowStart = rowIndex
    colStart = colIndex
    while (rowStart > 0 && colStart < numCols - 1) {
      rowStart--
      colStart++
    }

    diagonal = []
    while (rowStart < numRows && colStart >= 0) {
      diagonal.push(newGrid[rowStart][colStart])
      rowStart++
      colStart--
    }
    if (checkLine(diagonal)) {
      return true
    }

    return false
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

        if (checkWin(newGrid, colIndex, rowIndex, player)) {
          setTimeout(() => {
            setGameWon(true)
          }, 20)
        }
        return
      }
    }

    alert('that column is filled!')
  }

  // returns a div with 6 columns, each with 7 pieces
  return (
    <section>
      <h1>Connect Four</h1>
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
