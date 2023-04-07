import React from 'react'
import type { ReactElement } from 'react'
import './App.css'
import Board from './Board'

const App = (): ReactElement => {
  return (
    <main className='App'>
      <h1>Connect Four</h1>
      <Board
        numRows={6}
        numCols={7}
      />
    </main>
  )
}

export default App
