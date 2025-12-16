import { useEffect } from "react";
import { useNavigate } from "react-router";
import useRole from "../../../hooks/useRole";


const DashboardRedirect = () => {
  const { role } = useRole();
  const navigate = useNavigate();

  useEffect(() => {
    if (role.role === "admin") {
      navigate("/dashboard/stats");
    } else if (role.role === "user" || role.role === "chef") {
      navigate("/dashboard/my-profile");
    }
  }, [role, navigate]);

  return null; 
};

export default DashboardRedirect;