import { useEffect, useState } from "react";
import axios from "axios";

function Course() {
  console.log("COURSE PAGE LOADED");
const [courses, setCourses] = useState([]);
const [formData, setFormData] = useState({
courseCode: "",
courseName: "",
department: "",
semester: "",
credits: "",
facultyName: "",
});
const [editId, setEditId] = useState(null);
const [name, setName] = useState("");
const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

const fetchCourses = async () => {
try {
const token = localStorage.getItem("token");

  const res = await axios.get(
    "http://localhost:5000/api/course",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log(res.data);

  setCourses(res.data.courses || []);
} catch (error) {
  console.log(error);
}

};
const addCourse = async (e) => {
e.preventDefault();

try {
  const token = localStorage.getItem("token");

  await axios.post(
    "http://localhost:5000/api/course",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  alert("Course Added Successfully");

  setFormData({
    courseCode: "",
    courseName: "",
    department: "",
    semester: "",
    credits: "",
    facultyName: "",
  });

  fetchCourses();
} catch (error) {
  console.log(error);
  alert("Failed to Add Course");
}

};

const deleteCourse = async (id) => {
try {
const token = localStorage.getItem("token");

  await axios.delete(
    `http://localhost:5000/api/course/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  alert("Course Deleted Successfully");

  fetchCourses();
} catch (error) {
  console.log(error);
  alert("Delete Failed");
}

};
const updateCourse = async () => {
try {
const token = localStorage.getItem("token");

  await axios.put(
    `http://localhost:5000/api/course/${editId}`,
    {
      courseName: name,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  alert("Course Updated Successfully");

  setEditId(null);
  setName("");

  fetchCourses();
} catch (error) {
  console.log(error);
  alert("Update Failed");
}

};
  useEffect(() => {
    
fetchCourses();
  }, []);

return (
<div style={{ padding: "30px" }}>
Course Management

  <form className="form-container" onSubmit={addCourse}>
    <input
      type="text"
      name="courseCode"
      placeholder="Course Code"
      onChange={handleChange}
    />

    <input
      type="text"
      name="courseName"
      placeholder="Course Name"
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
      name="semester"
      placeholder="Semester"
      onChange={handleChange}
    />

    <input
      type="number"
      name="credits"
      placeholder="Credits"
      onChange={handleChange}
    />

    <input
      type="text"
      name="facultyName"
      placeholder="Faculty Name"
      onChange={handleChange}
    />

    <button type="submit">
      Add Course
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

      <button onClick={updateCourse}>
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
        <th>Course Code</th>
        <th>Course Name</th>
        <th>Department</th>
        <th>Semester</th>
        <th>Credits</th>
        <th>Faculty</th>
        <th>Action</th>
      </tr>
    </thead>

    <tbody>
      {courses.map((course, index) => (
        <tr key={course._id}>
          <td>{index + 1}</td>
          <td>{course.courseCode}</td>
          <td>{course.courseName}</td>
          <td>{course.department}</td>
          <td>{course.semester}</td>
          <td>{course.credits}</td>
          <td>{course.facultyName}</td>

          <td>
            <button className="action-btn edit-btn"
              onClick={() => {
                setEditId(course._id);
                setName(course.courseName);
              }}
            >
              Edit
            </button>

            <button className="action-btn delete-btn"
              onClick={() =>
                deleteCourse(course._id)
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

export default Course;