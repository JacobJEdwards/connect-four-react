import React, { useState } from 'react'
import './Board.css'


function Piece(props: any) {
    return (
        <span className={props.colour + ' piece'}></span>
    )
}
function Board() {
    const [grid, setGrid] = useState<number[][]>(
        new Array(6).fill(
            new Array(7).fill(0)
        )
    );

    const [turn, setTurn] = useState<number>(1);

    function handleClick(index: number) {
        const player: number = turn % 2 === 0 ? 1 : 2;

        const gridCopy = [...grid];
        const columnCopy = [...grid[index]].reverse();

        columnCopy.some((pieceNumber, index) => {
            if (pieceNumber === 0) {
                columnCopy[index] = player;
                return true;
            }
        })

        gridCopy[index] = columnCopy.reverse();
        setGrid(gridCopy);
        setTurn(turn + 1);
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

