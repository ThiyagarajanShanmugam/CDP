import "./App.css";

import { Routes, Route } from "react-router-dom";
import AdminPage from "./pages/AdminPage/AdminPage";
import ShowBooks from "./components/ShowBooks/ShowBooks";
import ShowDues from "./components/ShowDues/ShowDues";
import AddBooks from "./components/AddBooks/AddBooks";

function App() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/adminShowBooks" element={<ShowBooks />} />
      <Route path="/adminShowDues" element={<ShowDues />} />
      <Route path="/adminAddBooks" element={<AddBooks />} />
    </Routes>
  );
}

export default App;
