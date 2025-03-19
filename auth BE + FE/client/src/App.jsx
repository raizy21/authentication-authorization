import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router";

import Home from "./components/Home";
import Login from "./components/Login";
import Layout from "./components/Layout";
import Profile from "./components/Profile";
import Admin from "./components/Admin";
import Protected from "./components/Protected";
import Authorize from "./components/Authorize";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />

        <Route path="/" element={<Protected />}>
          <Route path="profile" element={<Profile />} />
          <Route path="/admin" element={<Authorize roles={["admin"]} />}>
            <Route index element={<Admin />} />
          </Route>
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
  ƒ;
}

export default App;
