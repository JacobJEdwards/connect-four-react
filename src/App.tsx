import React from 'react'
import type { ReactElement } from 'react'
import './App.css'
import Board from './Board'

const App = (): ReactElement => {
  const [reset, setReset] = React.useState<boolean>(false)

  const handleReset = (): void => {
    setReset(!reset)
  }

  return (
    <main className='App'>
      <h1>Connect Four</h1>
      <Board
        numRows={6}
        numCols={7}
        reset={handleReset}
        key={reset.toString()}
      />
      <button onClick={handleReset}>Reset</button>
    </main>
  )
}

export default App
