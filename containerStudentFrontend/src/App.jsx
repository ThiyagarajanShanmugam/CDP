import "./App.css";

import { Routes, Route } from "react-router-dom";
import StudentDashboard from "./pages/StudentDashboard./StudentDashboard";
import Profile from "./pages/Profile/Profile";

function App() {
  return (
    <Routes>
      <Route path="/student" element={<StudentDashboard />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
