import { useNavigate } from "react-router-dom";

function StatCard({ title, value, icon, path }) {
  const navigate = useNavigate();

  return (
    <div
      className="stat-card"
      onClick={() => navigate(path)}
      style={{ cursor: "pointer" }}
    >
      <div className="card-top">
        <div className="card-icon">{icon}</div>
      </div>

      <h3>{title}</h3>

      <h1>{value || 0}</h1>

      <p className="card-subtitle">
        Click to View
      </p>
    </div>
  );
}

export default StatCard;