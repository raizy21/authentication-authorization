import { Outlet } from "react-router";
import Navbar from "./Navbar";
import AuthProvider from "../context/auth";

function Layout() {
  return (
    <AuthProvider>
      <Navbar />
      <Outlet />
    </AuthProvider>
  );
}

export default Layout;
