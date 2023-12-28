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
import Payment from "./routes/Payment";
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
const PaidRoute = () => {
  const [hasPaid, setHasPaid] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .post("/user")
      .then((response) => {
        const data = response.data;
        if (data.payment_required && !data.free_trial_days) {
          setHasPaid(false);
        } else if (!data.payment_required) {
          setHasPaid(true);
        }
      })
      .catch((error) => {
        setHasPaid(false);
      })
      .finally((e) => setLoading(false));
  }, []);
  if (!loading) {
    if (hasPaid) return <Outlet />;
    return <Navigate to="/home" replace />;
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
      path: "/payment/pay",
      element: <PrivateRoute />,
      children: [
        {
          path: "",
          element: <Payment />,
        },
      ],
    },
    {
      path: "/product/watermark",
      element: <PrivateRoute />,
      children: [
        {
          path: "",
          element: <PaidRoute />,
          children: [
            {
              path: "",
              element: <Watermark />,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
