import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  return (
    <div className="sidebar">
      <h2 className="logo">EduSphere</h2>

      <ul>
        <li className={location.pathname === "/" ? "active" : ""}>
          <Link to="/">🏠 Dashboard</Link>
        </li>

        <li className={location.pathname === "/students" ? "active" : ""}>
          <Link to="/students">👨‍🎓 Students</Link>
        </li>

        <li className={location.pathname === "/faculty" ? "active" : ""}>
          <Link to="/faculty">👨‍🏫 Faculty</Link>
        </li>

        <li className={location.pathname === "/courses" ? "active" : ""}>
          <Link to="/course">📚 Courses</Link>
        </li>

        <li className={location.pathname === "/assignments" ? "active" : ""}>
          <Link to="/assignment">📝 Assignments</Link>
        </li>

        <li className={location.pathname === "/attendance" ? "active" : ""}>
          <Link to="/attendance">📅 Attendance</Link>
        </li>

        <li className={location.pathname === "/results" ? "active" : ""}>
          <Link to="/result">📊 Results</Link>
        </li>

        <li className={location.pathname === "/fees" ? "active" : ""}>
          <Link to="/fee">💰 Fees</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;