import { useEffect, useState } from "react";
import axios from "axios";

function Result() {
  const [results, setResults] = useState([]);

  const [formData, setFormData] = useState({
    studentId: "",
    courseName: "",
    marksObtained: "",
    totalMarks: "",
    grade: "",
  });

  const [editId, setEditId] = useState(null);
  const [courseName, setCourseName] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const fetchResults = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/result",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResults(res.data.results || []);
    } catch (error) {
      console.log(error);
    }
  };

  const addResult = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/result",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Result Added Successfully");

      setFormData({
        studentId: "",
        courseName: "",
        marksObtained: "",
        totalMarks: "",
        grade: "",
      });

      fetchResults();
    } catch (error) {
      console.log(error);
      alert("Failed to Add Result");
    }
  };

  const deleteResult = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/result/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Result Deleted Successfully");

      fetchResults();
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

  const updateResult = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/result/${editId}`,
        {
          courseName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Result Updated Successfully");

      setEditId(null);
      setCourseName("");

      fetchResults();
    } catch (error) {
      console.log(error);
      alert("Update Failed");
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h1>Result Management</h1>

      <form className="form-container" onSubmit={addResult}>
        <input
          type="text"
          name="studentId"
          placeholder="Student Mongo ID"
          value={formData.studentId}
          onChange={handleChange}
        />

        <input
          type="text"
          name="courseName"
          placeholder="Course Name"
          value={formData.courseName}
          onChange={handleChange}
        />

        <input
          type="number"
          name="marksObtained"
          placeholder="Marks Obtained"
          value={formData.marksObtained}
          onChange={handleChange}
        />

        <input
          type="number"
          name="totalMarks"
          placeholder="Total Marks"
          value={formData.totalMarks}
          onChange={handleChange}
        />

        <input
          type="text"
          name="grade"
          placeholder="Grade"
          value={formData.grade}
          onChange={handleChange}
        />

        <button type="submit">
          Add Result
        </button>
      </form>

      {editId && (
        <div style={{ marginTop: "20px" }}>
          <input
            type="text"
            value={courseName}
            onChange={(e) =>
              setCourseName(e.target.value)
            }
          />

          <button onClick={updateResult}>
            Update
          </button>
        </div>
      )}

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
            <th>Course</th>
            <th>Marks</th>
            <th>Total</th>
            <th>Grade</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {results.map((result, index) => (
            <tr key={result._id}>
              <td>{index + 1}</td>

              <td>
                {result.studentId?.studentId}
              </td>

              <td>
                {result.studentId?.name}
              </td>

              <td>{result.courseName}</td>

              <td>
                {result.marksObtained}
              </td>

              <td>{result.totalMarks}</td>

              <td>{result.grade}</td>

              <td>
                <button className="action-btn edit-btn"
                  onClick={() => {
                    setEditId(result._id);
                    setCourseName(
                      result.courseName
                    );
                  }}
                >
                  Edit
                </button>

                <button className="action-btn delete-btn"
                  onClick={() =>
                    deleteResult(result._id)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Result;