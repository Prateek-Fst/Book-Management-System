import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BookDetail from "./components/BokDetail"; // Assuming BookPage is where BookDetail is being used
import AuthorForm from "./components/AuthorForm";
import Login from "./components/Login";
import LandingPage from "./components/LandingPage";
import BookForm from "./components/BookForm";

const App = () => {
  return (
    <Router>
      <Routes>
       <Route path="/" element={<AuthorForm />} />
       <Route path="/login" element={<Login />} />
       <Route path="/books/:bookId" element={<BookDetail />} />
       <Route path="/lib" element={<LandingPage />} />
       <Route path ="/createbook" element ={<BookForm/>}/>
       <Route path = "/viewbooks" element ={<BookDetail/>}/>
      
      </Routes>
    </Router>
  );
};

export default App;
