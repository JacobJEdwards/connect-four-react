/* eslint-disable @typescript-eslint/comma-dangle */
import React, { useState, useRef } from 'react'
import type { FC } from 'react'
import Column from './Column'
import { type BoardProps, type BoardPiece, BoardPieces } from './utility/types'
import checkWin from './utility/connect2-win-check'
import './Board.css'

// "Board Piece" component -> takes a colour prop and returns a span with that colour

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
    setGrid(
      Array.from({ length: numRows }, () =>
        Array(numCols).fill(BoardPieces.EMPTY)
      )
    )
    turn.current = 0
    setGameWon(false)
  }

  // handle click function -> takes an index, which is the column that was clicked. It then checks if the column is full, and if it isn't, it adds a piece to the bottom of the column
  const handleClick = (colIndex: number): void => {
    if (gameWon) {
      return
    }

    const playerPiece: BoardPiece =
      turn.current % 2 === 0 ? BoardPieces.PLAYER1 : BoardPieces.PLAYER2

    const newGrid = grid.map((row) => [...row])

    for (let rowIndex = numRows; rowIndex >= 0; rowIndex--) {
      if (newGrid[colIndex][rowIndex] === BoardPieces.EMPTY) {
        newGrid[colIndex][rowIndex] = playerPiece
        setGrid(newGrid)
        turn.current++

        if (checkWin(newGrid, playerPiece)) {
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
          <h1>
            Player{' '}
            {turn.current % 2 === 0 ? BoardPieces.PLAYER2 : BoardPieces.PLAYER2}{' '}
            Won!
          </h1>
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
