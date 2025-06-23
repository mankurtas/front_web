import NavBar from "./components/NavBar";
import AuthForm from "./components/AuthForm";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import { BooksContext } from "./context/BooksContext";
import BooksList from "./components/BooksList";
import NewBook from "./components/NewBook";
import NewCategory from "./components/NewCategory"
import UpdateBook from "./components/UpdateBook";

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
        <Route path="/insert_book" element={<NewBook/>} />
        <Route path="/new_cat" element={<NewCategory/>} />
        <Route path="/book/:id" element={<UpdateBook />} />


       
      </Routes>
    </>
  )
}

export default App
