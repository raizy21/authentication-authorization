import { useContext } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../context/auth";

function Navbar() {
  const { user, loading, logout } = useContext(AuthContext);

  return (
    <nav className="bg-slate-800 p-4">
      <div className="flex justify-between items-center text-white text-lg">
        <NavLink to="/">Home</NavLink>

        {!loading && (
          <div className="flex space-x-4">
            {user ? (
              <>
                <NavLink to="/profile">Profile</NavLink>
                {user.role === "admin" &&  <NavLink to="/admin">Admin</NavLink>}
               
                <button onClick={logout}>Logout</button>
              </>
            ) : (
              <NavLink to="/login">Login</NavLink>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
