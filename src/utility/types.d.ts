// props for the "Board Piece" component
// only accepts 3 colours
// export type PieceColours = 'black' | 'red' | 'green'

export declare const PieceColours = {
  readonly BLACK: 'black',
  readonly RED: 'red',
  readonly GREEN: 'green'
}

export declare type PieceColoursType = typeof PieceColours[keyof typeof PieceColours]

// type for the grid (ie a piece can be 0, 1 or 2)
export declare type BoardPiece = 0 | 1 | 2

// prop types
export interface PieceProps {
  colour: PieceColoursType
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
