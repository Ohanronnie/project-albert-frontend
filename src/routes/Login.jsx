import { Link, useNavigate } from "react-router-dom"
import { axios } from "../utils/axios.js"
import { useState } from "react"
export default function Register() {
  const [details, setDetails] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({
    email: null,
    password: null,
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    axios
      .post("/user/login", details)
      .then((data) => {
        setErrors({})
        localStorage.setItem("X-AUTH-TOKEN", data.data.token)
        navigate("/home")
      })
      .catch((error) => {
        console.log(error)
        let response = error?.response?.data?.message
          .toLowerCase()
          .replaceAll('"', "")
        //        console.log(response);
        response = response.replace(response[0], response[0].toUpperCase())
        if (response.match(/email/i)) {
          setErrors((val) => ({ ...val, email: response }))
        } else {
          setErrors((val) => ({ ...val, email: null }))
        }
        if (response.match(/password/i)) {
          setErrors((val) => ({ ...val, password: response }))
        } else {
          setErrors((val) => ({ ...val, password: null }))
        }
      })
      .finally(() => setLoading(false))
  }
  const handleClick = (e) => {
    setDetails((val) => ({ ...val, [e.target.name]: e.target.value }))
  }
  return (
    <>
      <div className="herro flex items-center justify-center min-h-screen min-w-screen bg-base-200">
        <div className="hero-content w-full flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-bold">Login to your account </h1>
            <p className="py-1"></p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={handleClick}
                  className="input input-bordered"
                  required
                />
                <label className="label text-xs text-red-600">
                  {errors.email}
                </label>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleClick}
                  className="input input-bordered"
                  required
                />
                <label className="label text-xs text-red-600">
                  {errors.password}
                </label>
              </div>
              <div className="form-control mt-6">
                {!loading ? (
                  <button type="submit" className="btn btn-block rounded-full">
                    login
                  </button>
                ) : (
                  <button className="btn rounded-full btn-block">
                    <span className="loading loading-spinner"></span>
                    Loading
                  </button>
                )}
              </div>
              <div className="w-full flex items-center justify-center">
                <hr className="w-[45%]" />
                <span className="text-sm mx-2 px-2">Or</span>
                <hr className="w-[45%]" />
              </div>
              <Link to="/register">
                <button className="btn btn-block rounded-full"> Sign Up</button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
