import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const DashboardRedirect = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  const roleRedirect = {
    admin: "/dashboard/admin-home",
    trainer: "/dashboard/trainer-home",
    member: "/dashboard/member-home",
  };

  return <Navigate to={roleRedirect[user.role] || "/"} />;
};

export default DashboardRedirect;
