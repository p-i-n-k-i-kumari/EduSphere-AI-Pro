import { useEffect, useState } from "react";
import axios from "axios";

function Attendance() {
  const [attendance, setAttendance] = useState([]);

  const [formData, setFormData] = useState({
    studentId: "",
    date: "",
    status: "Present",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const fetchAttendance = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/attendance",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAttendance(
        res.data.attendance || []
      );
    } catch (error) {
      console.log(error);
    }
  };

  const markAttendance = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/attendance",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(
        "Attendance Marked Successfully"
      );

      setFormData({
        studentId: "",
        date: "",
        status: "Present",
      });

      fetchAttendance();
    } catch (error) {
      console.log(error);
      alert("Failed to Mark Attendance");
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h1>Attendance Management</h1>

      <form className="form-container" onSubmit={markAttendance}>
        <input
          type="text"
          name="studentId"
          placeholder="Student Mongo ID"
          value={formData.studentId}
          onChange={handleChange}
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="Present">
            Present
          </option>

          <option value="Absent">
            Absent
          </option>
        </select>

        <button type="submit">
          Mark Attendance
        </button>
      </form>

      <table className="data-table"
        border="1"
        cellPadding="10"
        style={{
          marginTop: "20px",
          width: "100%",
        }}
      >
        <thead>
          <tr>
            <th>S.No</th>
            <th>Student ID</th>
            <th>Name</th>
            <th>Date</th>
            <th>Status</th>
            <th>Marked By</th>
          </tr>
        </thead>

        <tbody>
          {attendance.map(
            (item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>

                <td>
                  {item.studentId?.studentId}
                </td>

                <td>
                  {item.studentId?.name}
                </td>

                <td>
                  {new Date(
                    item.date
                  ).toLocaleDateString()}
                </td>

                <td>{item.status}</td>

                <td>{item.markedBy}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Attendance;