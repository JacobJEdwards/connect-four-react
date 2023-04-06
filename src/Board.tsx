import React, { useState, useRef } from 'react'
import type { ReactElement } from 'react'
import './Board.css'

interface TPieceProps {
  colour: string
}

type TBoardPiece = 0 | 1 | 2

// "Board Piece" component -> takes a colour prop and returns a span with that colour
function Piece ({ colour }: TPieceProps): ReactElement {
  return (
        <span className={colour + ' piece'}></span>
  )
}

// "Board" component -> returns a div with 6 columns, each with 7 pieces
function Board (): ReactElement {
  // grid is a 2D array of 6 columns, each with 7 pieces
  const [grid, setGrid] = useState<TBoardPiece[][]>(
    new Array(6).fill(
      new Array(7).fill(0)
    )
  )

  // turn is a ref to a number, which is used to determine which player's turn it is. Set in the handle click function
  const turn = useRef<number>(1)

  // handle click function -> takes an index, which is the column that was clicked. It then checks if the column is full, and if it isn't, it adds a piece to the bottom of the column
  function handleClick (index: number): boolean | undefined {
    const player: TBoardPiece = turn.current % 2 === 0 ? 1 : 2

    const gridCopy = [...grid]
    const columnCopy = [...grid[index]].reverse()

    if (!columnCopy.includes(0)) {
      alert('that column is filled!')
      return
    }

    columnCopy.some((pieceNumber, index) => {
      if (pieceNumber === 0) {
        columnCopy[index] = player
        return true
      }
      return false
    })

    gridCopy[index] = columnCopy.reverse()
    setGrid(gridCopy)
    turn.current++
  }

  // returns a div with 6 columns, each with 7 pieces
  return (
        <div className='board'>
            {grid.map((column, index) => (
                <div className='column' onClick={() => { handleClick(index) }}>
                    {column.map(piece => (
                        <Piece colour={
                            piece === 0
                              ? 'black'
                              : piece === 1
                                ? 'red'
                                : 'green'
                        } />
                    ))}
                </div>
            ))}
        </div>
  )
}

export default Board