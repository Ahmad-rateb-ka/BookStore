import { Route, Routes,HashRouter } from "react-router-dom";
import Home from "./pages/home.js";
import Login from "./pages/login.js";
import "./i18n.js";
import Resultes from "./pages/Resultes.js";
import BorrowedBooks from "./pages/BorrowedBooks.js";
import Admin from "./pages/admin.js";

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/Resultes" element={<Resultes />} />
          <Route path="/BorrowedBooks" element={<BorrowedBooks />} />
        </Routes>
      </HashRouter>
    </>
  );
}
export default App;
