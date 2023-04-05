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
    const [grid, setGrid] = useState(new Array(42).fill('empty'));
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

