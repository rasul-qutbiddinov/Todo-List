import { createBrowserRouter,RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/auth/login";


function App() {

  const routes = createBrowserRouter([
    {
      path: "/",
      children: [
        {
          index: true,
          element: <Home />,
        },
      ],
    },
    {
      path: "/auth",
      element: <Login />,
    },
  ]);

  return <RouterProvider router={routes} />;
}
export default App;
