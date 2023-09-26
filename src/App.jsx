import { Route, Routes } from 'react-router-dom'
import { Home, Question, Result } from './screens'
import './App.css'

function App() {
  return (
      <>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pregunta" element={<Question />} />
            <Route path="/resultado" element={<Result />} />
        </Routes>
      </>
  )
}

export default App