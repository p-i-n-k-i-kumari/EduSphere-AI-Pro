import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Faculty from "./pages/Faculty";
import Course from "./pages/Course";
import Assignment from "./pages/Assignment";
import Attendance from "./pages/Attendance";
import Result from "./pages/Result";
import Fee from "./pages/Fee";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

        <Route
          path="/students"
          element={<ProtectedRoute><Students /></ProtectedRoute>}
        />

        <Route
          path="/faculty"
          element={<ProtectedRoute><Faculty /></ProtectedRoute>}
        />

        <Route
          path="/courses"
          element={<ProtectedRoute><Course /></ProtectedRoute>}
        />

        <Route
          path="/assignments"
          element={<ProtectedRoute><Assignment /></ProtectedRoute>}
        />

        <Route
          path="/attendance"
          element={<ProtectedRoute><Attendance /></ProtectedRoute>}
        />

        <Route
          path="/results"
          element={<ProtectedRoute><Result /></ProtectedRoute>}
        />

        <Route
          path="/fees"
          element={<ProtectedRoute><Fee /></ProtectedRoute>}
        />

        <Route
          path="/login"
          element={<ProtectedRoute><Login /></ProtectedRoute>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;