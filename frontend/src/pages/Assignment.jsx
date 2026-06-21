import { useEffect, useState } from "react";
import axios from "axios";

function Assignment() {
  const [assignments, setAssignments] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    course: "",
    dueDate: "",
    facultyName: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const fetchAssignments = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/assignment",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAssignments(
        res.data.assignments || []
      );
    } catch (error) {
      console.log(error);
    }
  };

  const addAssignment = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/assignment",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(
        "Assignment Added Successfully"
      );

      setFormData({
        title: "",
        description: "",
        course: "",
        dueDate: "",
        facultyName: "",
      });

      fetchAssignments();
    } catch (error) {
      console.log(error);
      alert("Failed to Add Assignment");
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h1>Assignment Management</h1>

      <form className="form-container" onSubmit={addAssignment}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <input
          type="text"
          name="course"
          placeholder="Course"
          value={formData.course}
          onChange={handleChange}
        />

        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
        />

        <input
          type="text"
          name="facultyName"
          placeholder="Faculty Name"
          value={formData.facultyName}
          onChange={handleChange}
        />

        <button type="submit">
          Add Assignment
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
            <th>Title</th>
            <th>Description</th>
            <th>Course</th>
            <th>Due Date</th>
            <th>Faculty</th>
          </tr>
        </thead>

        <tbody>
          {assignments.map(
            (assignment, index) => (
              <tr key={assignment._id}>
                <td>{index + 1}</td>
                <td>{assignment.title}</td>
                <td>
                  {assignment.description}
                </td>
                <td>{assignment.course}</td>
                <td>
                  {new Date(
                    assignment.dueDate
                  ).toLocaleDateString()}
                </td>
                <td>
                  {assignment.facultyName}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Assignment;