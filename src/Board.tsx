import React, { useState, useRef } from 'react'
import './Board.css'

type TPieceProps = {
    colour: string
}

type TBoardPiece = 0 | 1 | 2;

function Piece({ colour }: TPieceProps) {
    return (
        <span className={colour + ' piece'}></span>
    )
}

function Board() {
    const [grid, setGrid] = useState<TBoardPiece[][]>(
        new Array(6).fill(
            new Array(7).fill(0)
        )
    );

    const turn = useRef<number>(1)

    function handleClick(index: number) {
        const player: TBoardPiece = turn.current % 2 === 0 ? 1 : 2;

        const gridCopy = [...grid];
        const columnCopy = [...grid[index]].reverse();

        if (!columnCopy.includes(0)) {
            alert("that column is filled!")
            return;
        }

        columnCopy.some((pieceNumber, index) => {
            if (pieceNumber === 0) {
                columnCopy[index] = player;
                return true;
            }
        })

        gridCopy[index] = columnCopy.reverse();
        setGrid(gridCopy);
        turn.current++;
    }

    return (
        <div className='board'>
            {grid.map((column, index) => (
                <div className='column' onClick={() => handleClick(index)}>
                    {column.map(piece => (
                        <Piece colour={
                            piece == 0 ? 'black'
                                : piece == 1 ? 'red'
                                : 'green'
                        } />
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Board;

