import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { BrowserRouter } from 'react-router'
import { UserContextProvider } from './context/UserContext.jsx'
import { BooksContextProvider } from './context/BooksContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BooksContextProvider>
    <UserContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </UserContextProvider>
    </BooksContextProvider>
  </StrictMode>,
)
