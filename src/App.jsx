import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";
import Landing from "./routes/Landing";
import Register from "./routes/Register";
import Login from "./routes/Login";
import Home from "./routes/Home";
import Watermark from "./routes/Watermark";
import { axios } from "./utils/axios.js";
import { useState, useEffect } from "react";
const PrivateRoute = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);
  useEffect(function () {
    axios
      .post("/user")
      .then(() => {
        setIsValid(true);
      })
      .catch(() => {
        setIsValid(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  if (!isLoading) {
    if (isValid) return <Outlet />;
    return <Navigate to="/login" replace />;
  }
};

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/home",
      element: <PrivateRoute />,
      children: [
        {
          path: "",
          element: <Home />,
        },
      ],
    },
    {
      path: "/product/watermark",
      element: <PrivateRoute />,
      children: [
        {
          path: "",
          element: <Watermark />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
