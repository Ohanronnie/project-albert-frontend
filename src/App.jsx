import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
  useNavigate,
} from "react-router-dom"
import Landing from "./routes/Landing"
import Register from "./routes/Register"
import Login from "./routes/Login"
import Home from "./routes/Home"
import Watermark from "./routes/Watermark"
import Payment from "./routes/Payment"
import Content, { AccountList } from "./routes/Content"
import { axios } from "./utils/axios.js"
import { useState, useEffect } from "react"
import VideoPage from "./routes/Video.jsx"
import TwitterCallback from "./routes/twitter.jsx"
const PrivateRoute = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isValid, setIsValid] = useState(false)
  useEffect(function () {
    axios
      .post("/user")
      .then(() => {
        setIsValid(true)
      })
      .catch(() => {
        setIsValid(false)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])
  if (!isLoading) {
    if (isValid) return <Outlet />
    return <Navigate to="/login" replace />
  }
}
const PaidRoute = () => {
  const [hasPaid, setHasPaid] = useState(false)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    axios
      .post("/user")
      .then((response) => {
        const data = response.data
        if (data.paymentRequired) {
          setHasPaid(false)
        } else if (!data.paymentRequired) {
          setHasPaid(true)
        }
      })
      .catch((error) => {
        setHasPaid(false)
      })
      .finally((e) => setLoading(false))
  }, [])
  if (!loading) {
    if (hasPaid) return <Outlet />
    return <Navigate to="/home" replace />
  }
}
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
path: '/auth/twitter/callback',
element: <TwitterCallback/>
    },
    {
      path: "/video/:id",
      element: <VideoPage />,
    },
    {
      path: "/home",
      element: /*<PrivateRoute />*/ <Home />,
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
    /* Add paid route to this before pushing to production*/
    /*    {
      path: "/product/content/manage",
      element: <Content />,
    }*/ {
      path: "/product/content/manage",
      element: <PrivateRoute />,
      children: [
        {
          path: "",
          element: <PaidRoute />,
          children: [
            {
              path: "",
              element: <Content />,
            },
          ],
        },
      ],
    },
    {
      path: "/product/twitter/list",
      element: <PrivateRoute />,
      children: [
        {
          path: "",
          element: <PaidRoute />,
          children: [
            {
              path: "",
              element: <AccountList />,
            },
          ],
        },
      ],
    },
  ])
  return <RouterProvider router={router} />
}

export default App
