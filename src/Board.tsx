import React, { useState, useRef } from 'react'
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

// "Board Piece" component -> takes a colour prop and returns a span with that colour
const Piece = ({ colour }: PieceProps): ReactElement => {
  return <span className={`${colour} piece`}></span>
}

// "Board" component -> returns a div with 6 columns, each with 7 pieces
const Board = ({ numRows = 6, numCols = 7 }: BoardProps): ReactElement => {
  // grid is a 2D array of 6 columns, each with 7 pieces
  const [grid, setGrid] = useState<BoardPiece[][]>(
    Array.from({ length: numRows }, () => Array(numCols).fill(0))
  )

  // turn is a ref to a number, which is used to determine which player's turn it is. Set in the handle click function
  const turn = useRef<number>(0)

  const handleReset = (): void => {
    setGrid(Array.from({ length: numRows }, () => Array(numCols).fill(0)))
    turn.current = 0
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
    const player: BoardPiece = turn.current % 2 === 0 ? 1 : 2

    const newGrid = grid.map((row) => [...row])

    for (let rowIndex = numRows; rowIndex >= 0; rowIndex--) {
      if (newGrid[colIndex][rowIndex] === 0) {
        newGrid[colIndex][rowIndex] = player
        setGrid(newGrid)
        turn.current++

        if (checkWin(newGrid, colIndex, rowIndex, player)) {
          setTimeout(() => {
            alert(`Player ${player} wins!`)
            handleReset()
          }, 20)
        }
        return
      }
    }

    alert('that column is filled!')
  }

  // returns a div with 6 columns, each with 7 pieces
  return (
    <div className='board'>
      {grid.map((column, index) => (
        <div
          className='column'
          onClick={() => {
            handleClick(index)
          }}
          key={index}>
          {column.map((piece, index) => (
            <Piece
              colour={piece === 0 ? 'black' : piece === 1 ? 'red' : 'green'}
              key={index}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default Board
