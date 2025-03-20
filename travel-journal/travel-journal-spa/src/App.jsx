import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
  RouterProvider,
} from "react-router-dom"; // import createBrowserRouter and createRoutesFromElements from react-router-dom
import { RootLayout } from "@/layouts"; // import RootLayout from layouts folder
import {
  CreatePost,
  Error,
  Home,
  Login,
  NotFound,
  Post,
  Register,
} from "@/pages"; // import all pages from pages folder

// The createBrowserRouter function creates a router instance that uses the HTML5 history API to keep your UI in sync with the URL.
// The createRoutesFromElements function creates a set of routes from the provided elements. This is useful for defining your application's routing structure in a declarative way.
const router = createBrowserRouter(
  // The createRoutesFromElements function takes a JSX structure and converts it into a route configuration.
  // The Route component is used to define a route in your application. It takes a path and an element to render when the path matches.
  createRoutesFromElements(
    // The RootLayout component is used to define the main layout of your application. It typically includes a header, footer, and other common elements.
    // The errorElement prop is used to specify a component to render when an error occurs while rendering the route.
    <Route path="/" element={<RootLayout />} errorElement={<Error />}>
      {/* outlet  and error element */}
      <Route element={<Outlet />} errorElement={<Error />}>
        {/* home element */}
        <Route index element={<Home />} />
        {/* login element  */}
        <Route path="login" element={<Login />} />
        {/* register element */}
        <Route path="register" element={<Register />} />
        {/* post id element */}
        <Route path="post/:id" element={<Post />} />
        {/* create element */}
        <Route path="create" element={<CreatePost />} />
        {/* not found element */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Route>
  )
);

// The RouterProvider component is used to provide the router instance to your application. It allows you to use the router in your components and manage navigation.
const App = () => <RouterProvider router={router} />;

// exporting the App component as default
export default App;
