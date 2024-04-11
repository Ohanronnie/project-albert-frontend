import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Header from "../components/Header"
function Facebook() {
  const [details, setDetails] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  const handleChange = (e) =>
    setDetails((detail) => ({ ...detail, [e.target.name]: e.target.value }))
  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    alert(details)
  }

  return (
    <>
      <main className="grid place-items-center px-6 py-2 sm:py-4 lg:px-8">
        <div className="border-[1px] p-2 rounded-md border-solid bg-base-200">
          <div className="">
            <p className="text-base leading-7">
              Enter your Facebook account details to grant us access to your
              page.
              <br />
              Your details are not stored on our server.
              <br /> It is also transported securely.
            </p>
          </div>
        </div>
      </main>
      <main className="grid place-items-center px-6 py--24 sm:py--32 lg:px-8">
        <div className="border-[1px] p-2 rounded-md border-solid bg-base-200">
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email address or number</span>
              </label>
              <input
                type="email"
                placeholder="Email address"
                name="email"
                onChange={handleChange}
                className="input input-bordered w-64"
                required
              />
            </div>
            <div className="form-control mt-2">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              {!loading ? (
                <button type="submit" className="btn btn-block bg-base-100">
                  login
                </button>
              ) : (
                <button className="btn bg-base-100 btn-block">
                  <span className="loading loading-spinner"></span>
                  Loading
                </button>
              )}
            </div>
          </form>
        </div>
      </main>
    </>
  )
}
function PagesList() {
  const pages = ["Hello", "World", "How Are You Doing", "Are You Fine"]
  const map = (page) => (
    <>
      <div className="flex items-center justify-between mb-2">
        <p className="text-base text-center leading-7">{page}</p>
        <button className="btn bg-base-100 btn-block w-14">Set Up</button>
      </div>
    </>
  )

  return (
    <main className="grid place-items-center px-4 py-24 sm:py-32 lg:px-6">
      <div className="border-[1px] px-6 py-2 rounded-md border-solid bg-base-200">
        <p className="text-base text-center leading-7">Select One</p>
        <hr className="mb-2" />
        {pages.map(map)}
      </div>
    </main>
  )
}
function ContentType() {
  const content = [
    "ENTERTAINMENT",
    "POLITICS",
    "SPORTS",
    "SCIENCE",
    "TECHNOLOGY",
  ]
  const [loading, setLoading] = useState(null)
  return (
    <main className="grid place-items-center px-4 py-24 sm:py-32 lg:px-6">
      <div className="border-[1px] px-6 py-2 rounded-md border-solid bg-base-200">
        <p className="text-base text-center leading-7">Select One</p>
        <hr className="mb-2" />

        <form onSubmit={alert}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Select type of content</span>
            </label>
            <select>
              {content.map((val) => (
                <option name="">{val}</option>
              ))}
            </select>
          </div>
          <div className="form-control mt-6">
            {!loading ? (
              <button type="submit" className="btn btn-block bg-base-100">
                login
              </button>
            ) : (
              <button className="btn bg-base-100 btn-block">
                <span className="loading loading-spinner"></span>
                Loading
              </button>
            )}
          </div>
        </form>
      </div>
    </main>
  )
}
export default function Content() {
  return (
    <>
      <nav>
        <Header />
      </nav>
      <ContentType />
    </>
  )
}
