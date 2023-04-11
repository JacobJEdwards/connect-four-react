import React, { memo } from 'react'
import type { FC } from 'react'
import type { ColumnProps } from './utility/types'
import Piece from './Piece'
import { BoardPieces, PieceColours } from './utility/types'

const Column: FC<ColumnProps> = memo(
  ({ column, onClick, won }: ColumnProps) => {
    return (
      <div
        className={`column ${!column.includes(0) || won ? 'full' : ''}`}
        onClick={onClick}>
        {column.map((piece, index) => (
          <Piece
            colour={
              piece === BoardPieces.EMPTY
                ? PieceColours.BLACK
                : piece === BoardPieces.PLAYER1
                ? PieceColours.RED
                : PieceColours.GREEN
            }
            key={index}
          />
        ))}
      </div>
    )
  }
)

Column.displayName = 'Column'

export default Column
