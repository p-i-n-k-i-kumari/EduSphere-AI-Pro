import { useNavigate } from "react-router-dom";

function Topbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    alert("Logged Out Successfully");

    navigate("/login");
  };

  return (
    <div className="topbar">
      <div>
        <h2>Good Morning, Pinki 👋</h2>

        <p className="welcome-text">
          Welcome to EduSphere AI
        </p>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <button
          onClick={handleLogout}
          style={{
            padding: "10px 18px",
            border: "none",
            borderRadius: "10px",
            background: "#ef4444",
            color: "#fff",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Logout
        </button>

        <div className="profile">
          PK
        </div>
      </div>
    </div>
  );
}

export default Topbar;