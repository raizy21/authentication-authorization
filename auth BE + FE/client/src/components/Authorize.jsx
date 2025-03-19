import { useContext } from "react";
import { Outlet, Navigate } from "react-router";
import { AuthContext } from "../context/auth";

function Authorize({ roles }) {
  const { loading, user } = useContext(AuthContext);

  return (
    <>
      {!loading && (
        <>{roles.includes(user.role) ? <Outlet /> : <Navigate to="/" />}</>
      )}
    </>
  );
}
export default Authorize;
