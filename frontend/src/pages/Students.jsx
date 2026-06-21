import { useEffect, useState } from "react";
import axios from "axios";

function Students() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
  studentId: "",
  name: "",
  email: "",
  phone: "",
  course: "",
  semester: "",
  department: "",
  attendance: 0,
  cgpa: "",
});
const [editId, setEditId] = useState(null);
const [name, setName] = useState("");
const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};
const addStudent = async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token");

    await axios.post(
      "http://localhost:5000/api/student",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Student Added Successfully");

    fetchStudents();
  } catch (error) {
    console.log(error);
  }
};
  const fetchStudents = async () => {
    console.log(
  "TOKEN:",
  localStorage.getItem("token")
);
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/student",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data);

      setStudents(
        res.data.students || res.data
      );
    } catch (error) {
      console.log(error);
    }
  };
  
const deleteStudent = async (id) => {
  try {
    const token = localStorage.getItem("token");

    await axios.delete(
      `http://localhost:5000/api/student/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Student Deleted Successfully");

    fetchStudents();
  } catch (error) {
    console.log(error);
    alert("Delete Failed");
  }
};
const updateStudent = async () => {
  try {
    const token = localStorage.getItem("token");

    await axios.put(
      `http://localhost:5000/api/student/${editId}`,
      {
        name,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Student Updated Successfully");

    setEditId(null);
    setName("");

    fetchStudents();

  } catch (error) {
    console.log(error);
  }
};
  useEffect(() => {
    
    fetchStudents();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h1>Students</h1>
<form className="form-container" onSubmit={addStudent}>

  <input
    type="text"
    name="studentId"
    placeholder="Student ID"
    onChange={handleChange}
  />

  <input
    type="text"
    name="name"
    placeholder="Name"
    onChange={handleChange}
  />

  <input
    type="email"
    name="email"
    placeholder="Email"
    onChange={handleChange}
  />

  <input
    type="text"
    name="phone"
    placeholder="Phone"
    onChange={handleChange}
  />

  <input
    type="text"
    name="course"
    placeholder="Course"
    onChange={handleChange}
  />

  <input
    type="number"
    name="semester"
    placeholder="Semester"
    onChange={handleChange}
  />

  <input
    type="text"
    name="department"
    placeholder="Department"
    onChange={handleChange}
  />

  <input
    type="number"
    step="0.1"
    name="cgpa"
    placeholder="CGPA"
    onChange={handleChange}
  />

  <button type="submit">
    Add Student
  </button>

</form>
{editId && (
  <div style={{ marginBottom: "20px" }}>
    <input
      type="text"
      value={name}
      onChange={(e) =>
        setName(e.target.value)
      }
    />

    <button onClick={updateStudent}>
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
    <th>Name</th>
    <th>Student ID</th>
    <th>Action</th>
  </tr>
</thead>

      <tbody>
  {students.map((student, index) => (
    <tr key={student._id}>
      <td>{index + 1}</td>
      <td>{student.name}</td>
      <td>{student.studentId}</td>

      <td>
        <button className="action-btn edit-btn"
  onClick={() => {
    setEditId(student._id);
    setName(student.name);
  }}
>
  Edit
</button>
        <button className="action-btn delete-btn"
          onClick={() =>
            deleteStudent(student._id)
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

export default Students;