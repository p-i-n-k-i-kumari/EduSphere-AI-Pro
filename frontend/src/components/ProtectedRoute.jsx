import { Navigate } from "react-router-dom";

// function ProtectedRoute({ children }) {
//   const token = localStorage.getItem("token");

//   if (!token) {
//     return <Navigate to="/login" />;
//   }

//   return children;
// }
function ProtectedRoute({ children }) {
  return children;
}

// export default ProtectedRoute;

export default ProtectedRoute;