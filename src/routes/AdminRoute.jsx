import { Navigate, useLocation } from "react-router";
import Loading from "../components/Loading";
import PropTypes from "prop-types";
import useRole from "../hooks/useRole";
import useAuth from "../hooks/useAuth";

const AdminRoute = ({ children }) => {
  const {role, isLoading} = useRole()
  const location = useLocation();
  const {loading} = useAuth()

  if (isLoading || loading) {
    return <Loading></Loading>;
  }
  if (role === "admin") {
    return children;
  }
  return <Navigate state={location.pathname} to={"/dashboard"}></Navigate>;
};

AdminRoute.propTypes = {
  children: PropTypes.object.isRequired,
};

export default AdminRoute;
