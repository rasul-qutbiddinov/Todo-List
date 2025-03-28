// src/App.tsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/auth/login";
import SignIn from "./pages/auth/sign";
import ProtectedRoute from "./components/ProtectedRoute"; // 👈 qo‘shildi

function App() {
  const routes = createBrowserRouter([
    {
      path: "/todo", // 🔁 endi bu /todo
      element: (
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      ),
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signin",
      element: <SignIn />,
    },
    {
      path: "/", // agar "/" ga kirsa, login pagega redirect
      element: <Login />,
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
