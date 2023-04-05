import React, { useState } from 'react'
import './Board.css'

enum pieceColour {
    RED,
    BLUE
}

function Piece() {
    return (
        // todo
    )
}

function Board() {
    const [grid, setGrid] = useState<any[]>(
        new Array(7).fill(
            new Array(6).fill(0)
        )
    );

    const [turn, setTurn] = useState<number>(1);

    function handleClick(index: number) {
        const colour: pieceColour = turn % 2 === 0 ? pieceColour.BLUE : pieceColour.RED;

    }

    return (
        <div className='board'>
            {grid.map((piece, index) => (
                <div className={`slot ${piece}`} key={index} onClick={() => handleClick(index)}>piece</div>
            ))}
        </div>
    )
}

export default Board;

