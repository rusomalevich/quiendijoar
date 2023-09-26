import { Route, Routes } from 'react-router-dom'
import { Home, Question, Result } from './screens'
import './App.css'

function App() {
  return (
      <>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/question" element={<Question />} />
            <Route path="/result" element={<Result />} />
        </Routes>
      </>
  )
}

export default App