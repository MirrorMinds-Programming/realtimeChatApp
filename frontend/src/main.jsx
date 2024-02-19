import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom"
import { AuthContextProvider } from './context/AuthContext.jsx'
import { SocketContextProiver } from './context/SocketContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <SocketContextProiver>
          <App />
        </SocketContextProiver>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
