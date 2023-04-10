// props for the "Board Piece" component
// only accepts 3 colours
// export type PieceColours = 'black' | 'red' | 'green'

export declare const PieceColours = {
  readonly BLACK: 'black',
  readonly RED: 'red',
  readonly GREEN: 'green'
}

export declare type PieceColour = typeof PieceColours[keyof typeof PieceColours]

// type for the grid (ie a piece can be 0, 1 or 2)
export declare const BoardPieces = {
  readonly EMPTY: 0,
  readonly PLAYER1: 1,
  readonly PLAYER2: 2
}

export declare type BoardPiece = typeof BoardPieces[keyof typeof BoardPieces]

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
