import { useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({ element: Component, requiredRole }) {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.isLogged) {
      navigate("/login");
    } else if (requiredRole && user.role !== requiredRole) {
      navigate("/");
    }
  }, [user, requiredRole, navigate]);

  if (user.isLogged && (!requiredRole || user.role === requiredRole)) {
    return <Component />;
  }
}
ProtectedRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
  requiredRole: PropTypes.string,
};

export default ProtectedRoute;
