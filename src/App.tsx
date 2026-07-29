import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home.js";
import Login from "./components/login.js";
import "./i18n.js";
import Resultes from "./components/Resultes.js";
import BorrowedBooks from "./components/BorrowedBooks.js";
import Admin from "./components/admin.js";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/Resultes" element={<Resultes />} />
          <Route path="/BorrowedBooks" element={<BorrowedBooks />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
