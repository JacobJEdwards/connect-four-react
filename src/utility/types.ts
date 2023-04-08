// props for the "Board Piece" component
// only accepts 3 colours
export type PieceColours = 'black' | 'red' | 'green'

// type for the grid (ie a piece can be 0, 1 or 2)
export type BoardPiece = 0 | 1 | 2

// prop types
export interface PieceProps {
  colour: PieceColours
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
