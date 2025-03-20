import { Outlet } from "react-router-dom"; // import Outlet from react-router-dom
import { ToastContainer } from "react-toastify"; // import ToastContainer from react-toastify
import { Navbar } from "@/components"; // import Navbar from components folder
import "react-toastify/dist/ReactToastify.css"; // import react-toastify css

// RootLayout component is used to define the main layout of your application. It typically includes a header, footer, and other common elements.
// The ToastContainer component is used to display toast notifications in your application. It provides a container for the notifications and allows you to customize their appearance and behavior.
// The Outlet component is used to render the child routes of the current route. It acts as a placeholder for the child routes and allows you to nest routes in your application.
// The Navbar component is used to display the navigation bar of your application. It typically includes links to different pages and other navigation elements.

const RootLayout = () => {
  return (
    <div className="container mx-auto">
      <ToastContainer position="bottom-left" autoClose={1500} theme="colored" />
      <Navbar />
      <Outlet />
    </div>
  );
};


// exporting the RootLayout component as default
export default RootLayout;
