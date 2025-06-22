import NavBar from "./components/NavBar";
import AuthForm from "./components/AuthForm";

import { Routes, Route } from "react-router";



function App() {

  return (
    <>
      <NavBar />


      {/* Main */}
      <Routes>
        <Route path="/login" element={<AuthForm />} />



      </Routes>
    </>
  )
}

export default App
