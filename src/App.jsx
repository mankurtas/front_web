import NavBar from "./components/NavBar";
import AuthForm from "./components/AuthForm";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import { BooksContext } from "./context/BooksContext";
import BooksList from "./components/BooksList";


import { Routes, Route } from "react-router";



function App() {

  const { user } = useContext(UserContext);


  return (
    <>
      <NavBar />


      {/* Main */}
      <Routes>
        {user ? (
        <Route path="/" element={<BooksList />} />
      ) : (
        <Route path="/" element={<AuthForm />} />
      )}


        <Route path="login" element={<AuthForm/>} />
       
      </Routes>
    </>
  )
}

export default App
