import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Header from "../components/Header"
import { axios } from "../utils/axios.js"
function Facebook({ setPages }) {
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
    axios
      .post("/product/login/facebook", details)
      .then(function (response) {
        setLoading(false)
        if (typeof response.data === "string") {
          return setErrors(response.data)
        }
        setPages(response.data.page)
      })
      .catch(function (error) {
        setLoading(false)
        setErrors(error?.response?.data?.message || "Incorrect password!")
      })
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
function PagesList({ pages, setPageDetails }) {
  const map = (page) => (
    <>
      <div className="flex items-center justify-between mb-2">
        <p className="text-base text-center leading-7">{page.pageName}</p>
        {!page.pageType && (
          <button
            onClick={() =>
              !page.pageType ? setPageDetails(page.pageId) : null
            }
            className="btn bg-base-100 btn-block w-14"
          >
            {!page.pageType ? `Set Up` : ""}
          </button>
        )}
      </div>
    </>
  )

  return (
    <main className="grid place-items-center px-4 py-24 sm:py-32 lg:px-6">
      <div className="border-[1px] px-6 py-2 rounded-md border-solid bg-base-200">
        <p className="text-base text-center leading-7">Select One</p>
        <hr className="mb-2" />
        {/*{[...pages.filter(page => page.pageType), ...pages.filter(page => !page.pageType)].map(map)}.*/}
        {[...pages.filter((page) => page.pageType)].map(map)}
        <hr className="my-2" />

        {[...pages.filter((page) => !page.pageType)].map(map)}
      </div>
    </main>
  )
}
function ContentType({ pageName, pageId }) {
  const content = ["ENTERTAINMENT", "SPORTS", "SCIENCE", "TECHNOLOGY"]
  const [loading, setLoading] = useState(null)
  const [contentChosed, setContentChosed] = useState("ENTERTAINMENT")
  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post("/product/facebook/savepage", {
        pageId,
        contentType: contentChosed,
      })
      .then(function (data) {
        console.log(data)
      })
      .catch((err) => alert("Error occurred somewhere, reload page"))
  }
  return (
    <main className="grid place-items-center px-4 py-24 sm:py-32 lg:px-6">
      <div className="border-[1px] px-6 py-2 rounded-md border-solid bg-base-200">
        <p className="text-base text-center leading-7">Select One</p>
        <hr className="mb-2" />

        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Select type of content</span>
            </label>
            <select onChange={(e) => setContentChosed(e.target.value)}>
              {content.map((val) => (
                <option name="">{val}</option>
              ))}
            </select>
          </div>
          <div className="form-control mt-6">
            {!loading ? (
              <button type="submit" className="btn btn-block bg-base-100">
                Add Page
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
  const [pages, setPages] = useState(null)
  const [pageId, setPageId] = useState(null)

  useEffect(() => {
    axios
      .get("/product/facebook/getpage")
      .then((response) => {
        if (response.data.length == 0) {
          setPages([])
        } else {
          setPages(response.data)
        }
      })
      .catch(console.error)
  }, [])
  return (
    <>
      <nav>
        <Header />
      </nav>
      {/*  {!pages && Facebook (setPages)}
     {pageDetails && PagesList(pages, setPageDetails)}*/}
      {!pages && <Facebook setPages={setPages} />}
      {pages && !pageId && (
        <PagesList pages={pages} setPageDetails={setPageId} />
      )}
      {pageId && <ContentType pageId={pageId} />}
    </>
  )
}
