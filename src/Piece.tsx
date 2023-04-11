import React, { memo } from 'react'
import type { FC } from 'react'
import type { PieceProps } from './utility/types'

const Piece: FC<PieceProps> = memo(({ colour }: PieceProps) => {
  return <span className={`${colour} piece`}></span>
})

Piece.displayName = 'Piece'

export default Piece
