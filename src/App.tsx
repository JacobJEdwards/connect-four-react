import React from 'react'
import type { ReactElement } from 'react'
import './App.css'
import Board from './Board'

function App(): ReactElement {
  return (
    <div className='App'>
      <Board />
    </div>
  )
}

export default App
