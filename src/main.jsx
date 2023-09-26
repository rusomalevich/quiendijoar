import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import {TriviaProvider} from './TriviaContext/TriviaContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <TriviaProvider>
      <App />
    </TriviaProvider>
  </BrowserRouter>
)
