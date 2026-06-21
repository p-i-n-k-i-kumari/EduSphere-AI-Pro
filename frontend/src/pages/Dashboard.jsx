import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatCard from "../components/StatCard";

function Dashboard() {
  const [stats, setStats] = useState({});

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/dashboard/stats",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStats(res.data.stats);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div className="layout">

      <Sidebar />

      <div className="main-content">

        <Topbar />


<div className="hero-card">
  <h1>🚀 EduSphere AI ERP</h1>

  <p>
    Manage Students, Faculty,
    Courses, Attendance,
    Results and Fees from one place.
  </p>
</div>

        <div className="stats-grid">

          <StatCard
            title="Students"
            value={stats.totalStudents}
            icon="👨‍🎓"
              path="/students"
          />

          <StatCard
            title="Faculty"
            value={stats.totalFaculty}
            icon="👨‍🏫"
             path="/faculty"
          />

          <StatCard
            title="Courses"
            value={stats.totalCourses}
            icon="📚"
              path="/courses"
          />

          <StatCard
            title="Assignments"
            value={stats.totalAssignments}
            icon="📝"
              path="/assignments"
          />

          <StatCard
            title="Results"
            value={stats.totalResults}
            icon="📊"
            path="/results"
          />

          <StatCard
            title="Fees"
            value={stats.totalFees}
            icon="💰"
            path="fees"
          />

          <StatCard
            title="Attendance"
            value={stats.totalAttendance}
            icon="📅"
              path="/attendance"
          />

        </div>

      </div>
    </div>
  );
}

export default Dashboard;