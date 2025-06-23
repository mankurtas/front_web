import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { BrowserRouter } from 'react-router'
import { UserContextProvider } from './context/UserContext.jsx'
import { BooksContextProvider } from './context/BooksContext.jsx'
import { AuthorsContextProvider } from './context/AuthorContext.jsx'
import { CategoryContextProvider } from './context/CategoryContex.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   
      <CategoryContextProvider>
      <AuthorsContextProvider>
        <BooksContextProvider>
          <UserContextProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </UserContextProvider>
        </BooksContextProvider>
        </AuthorsContextProvider>
        </CategoryContextProvider>
    
  </StrictMode>,
)
