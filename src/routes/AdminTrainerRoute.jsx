import { Navigate, useLocation } from "react-router";
import Loading from "../components/Loading";
import PropTypes from "prop-types";
import useRole from "../hooks/useRole";
import useAuth from "../hooks/useAuth";

const AdminTrainerRoute = ({ children }) => {
  const {role, isLoading} = useRole()
  const {loading} = useAuth()
  const location = useLocation();

  if (isLoading || loading) {
    return <Loading></Loading>;
  }
  if (role === "admin" || role === "trainer") {
    return children;
  }
  return <Navigate state={location.pathname} to={"/dashboard"}></Navigate>;
};

AdminTrainerRoute.propTypes = {
  children: PropTypes.object.isRequired,
};

export default AdminTrainerRoute;
