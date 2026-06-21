import { useEffect, useState } from "react";
import axios from "axios";

function Fee() {
  const [fees, setFees] = useState([]);

  const [formData, setFormData] = useState({
    studentId: "",
    amount: "",
    status: "Pending",
    paymentDate: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const fetchFees = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/fee",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFees(res.data.fees || []);
    } catch (error) {
      console.log(error);
    }
  };

  const addFee = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/fee",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Fee Added Successfully");

      setFormData({
        studentId: "",
        amount: "",
        status: "Pending",
        paymentDate: "",
      });

      fetchFees();
    } catch (error) {
      console.log(error);
      alert("Failed to Add Fee");
    }
  };

  useEffect(() => {
    fetchFees();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h1>Fee Management</h1>

      <form className="form-container" onSubmit={addFee}>
        <input
          type="text"
          name="studentId"
          placeholder="Student Mongo ID"
          value={formData.studentId}
          onChange={handleChange}
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="Pending">
            Pending
          </option>

          <option value="Paid">
            Paid
          </option>
        </select>

        <input
          type="date"
          name="paymentDate"
          value={formData.paymentDate}
          onChange={handleChange}
        />

        <button type="submit">
          Add Fee
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
            <th>Amount</th>
            <th>Status</th>
            <th>Payment Date</th>
          </tr>
        </thead>

        <tbody>
          {fees.map((fee, index) => (
            <tr key={fee._id}>
              <td>{index + 1}</td>

              <td>
                {fee.studentId?.studentId}
              </td>

              <td>
                {fee.studentId?.name}
              </td>

              <td>₹ {fee.amount}</td>

              <td>{fee.status}</td>

              <td>
                {fee.paymentDate
                  ? new Date(
                      fee.paymentDate
                    ).toLocaleDateString()
                  : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Fee;