import { Navigate } from "react-router-dom";
import useAuth from "../useAuth";
import Loader from "./Loader/Loader";

const ProtectedRoute = ({ element }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "#101A2D",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loader />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  return element;
};

export default ProtectedRoute;
