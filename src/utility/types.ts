// props for the "Board Piece" component
// only accepts 3 colours
// export type PieceColours = 'black' | 'red' | 'green'

export const PieceColours = {
  BLACK: 'black',
  RED: 'red',
  GREEN: 'green'
} as const

export type PieceColour = typeof PieceColours[keyof typeof PieceColours]

// type for the grid (ie a piece can be 0, 1 or 2)
export const BoardPieces = {
  EMPTY: 0,
  PLAYER1: 1,
  PLAYER2: 2
} as const

export type BoardPiece = typeof BoardPieces[keyof typeof BoardPieces]

// prop types
export interface PieceProps {
  colour: PieceColour
  className?: string
}
export interface BoardProps {
  numRows: number
  numCols: number
}

export interface ColumnProps {
  column: BoardPiece[]
  won: boolean
  onClick: () => void
}

export interface Direction {
  dx: number
  dy: number
}
