import { useEffect, useState } from "react";
import axios from "axios";

function Faculty() {
 const [faculties, setFaculties] = useState([]);
  const [formData, setFormData] = useState({
  facultyId: "",
name: "",
email: "",
phone: "",
department: "",
designation: "",
salary: 0,
experience: 0,
});
const [editId, setEditId] = useState(null);
const [name, setName] = useState("");
const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

const fetchFaculties = async () => {
try {
const token = localStorage.getItem("token");

  const res = await axios.get(
    "http://localhost:5000/api/faculty",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(res.data);

  setFaculties(
    res.data.faculty  || []
  );
} catch (error) {
  console.log(error);
}

};
const addFaculty = async (e) => {
e.preventDefault();

try {
  const token = localStorage.getItem("token");

  await axios.post(
    "http://localhost:5000/api/faculty",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  alert("Faculty Added Successfully");


  fetchFaculties();
} catch (error) {
  console.log(error);
  alert("Failed to Add Faculty");
}

};

const deleteFaculty = async (id) => {
try {
const token = localStorage.getItem("token");

  await axios.delete(
    `http://localhost:5000/api/faculty/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  alert("Faculty Deleted Successfully");

  fetchFaculties();
} catch (error) {
  console.log(error);
  alert("Delete Failed");
}

};
const updateFaculty = async () => {
try {
const token = localStorage.getItem("token");

  await axios.put(
    `http://localhost:5000/api/faculty/${editId}`,
    {
      name,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  alert("Faculty Updated Successfully");

  setEditId(null);
  setName("");

  fetchFaculties();
} catch (error) {
  console.log(error);
  alert("Update Failed");
}

};
  useEffect(() => {
    
  fetchFaculties();
  }, []);

return (
<div style={{ padding: "30px" }}>
Faculty Management

  <form className="form-container" onSubmit={addFaculty}>
    <input
      type="text"
      name="facultyId"
      placeholder="Faculty ID"
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
      name="department"
      placeholder="Department"
      onChange={handleChange}
    />

    <input
      type="text"
      name="designation"
      placeholder="Designation"
      onChange={handleChange}
    />

    <input
      type="number"
      name="salary"
      placeholder="Salary"
      onChange={handleChange}
    />

    <input
      type="number"
      name="experience"
      placeholder="Experience"
      onChange={handleChange}
    />

    <button type="submit">
      Add Faculty
    </button>
  </form>

  {editId && (
    <div style={{ marginTop: "20px" }}>
      <input
        type="text"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />

      <button onClick={updateFaculty}>
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
        <th>Faculty ID</th>
        <th>Department</th>
        <th>Designation</th>
        <th>Action</th>
      </tr>
    </thead>

    <tbody>
  {faculties?.map((faculty, index) => (
    <tr key={faculty._id}>
      <td>{index + 1}</td>
      <td>{faculty.name}</td>
      <td>{faculty.facultyId}</td>
      <td>{faculty.department}</td>
      <td>{faculty.designation}</td>

      <td>
        <button className="action-btn edit-btn"
          onClick={() => {
            setEditId(faculty._id);
            setName(faculty.name);
          }}
        >
          Edit
        </button>

        <button className="action-btn delete-btn"
          onClick={() =>
            deleteFaculty(faculty._id)
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

export default Faculty;