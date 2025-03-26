import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Header from "../components/Header"
import { axios } from "../utils/axios.js"
function Facebook({ setPages, setPageToken }) {
  const [details, setDetails] = useState({
    token: "",
    pageId: "",
  })
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) =>
    setDetails((detail) => ({ ...detail, [e.target.name]: e.target.value }));
  
  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    axios
      .post("/product/login/facebook/check", details)
      .then(function (response) {
        setLoading(false)
        if (typeof response.data === "string") {
          return setErrors(response.data)
        }
        setPageToken(details.token);
        
        console.log(response.data);
        setPages(details
        );
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
                <span className="label-text">Page Access Token</span>
              </label>
              <input
                type="text"
                placeholder="Account Token"
                name="token"
                onChange={handleChange}
                className="input input-bordered w-64"
                required
              />
            </div>
            <div className="form-control mt-2">
              <label className="label">
                <span className="label-text">Your page Id</span>
              </label>
              <input
                type="text"
                placeholder="Page id"
                name="pageId"
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
  const [pages, setPages] = useState(null);
  useEffect(function(){
    axios
      .get('/product/facebook/getsavedpage')
      .then(response => {
        setPages(response.data)
    })
  },[])
  const map = (page) => (
    <>
      <div className="flex items-center justify-between mb-2">
        <p className="text-base text-center leading-7">{page.pageName}</p>
        {!page.pageType && (
          <button
            onClick={() =>
              !page.pageType ? setPageDetails(page.pageId) : null
            }
            className="btn bg-base-100 px-1 w-16"
          >
            {!page.pageType ? `Remove` : "Add"}
          </button>
        )}
      </div>
    </>
  )

  return pages && ( 
    <main className="grid place-items-center px-4 py-24 sm:py-32 lg:px-6">
      <div className="border-[1px] px-6 py-2 w-1/2 rounded-md border-solid bg-base-200">
        <p className="text-base text-center leading-7">Select One</p>
        <hr className="mb-2" />
         {[...pages.filter((page) => !page.pageType)].map(map)}
         <hr className="mb-2" />
         <button
            className="btn bg-base-100 px-1 btn-block"
          >
            Add more page
          </button>
      </div>
    </main>
  )
}
function ContentType({ pageName, pageId, pageToken }) {
  const content = ["ENTERTAINMENT", "SPORTS", "SCIENCE", "TECHNOLOGY"]
  const [loading, setLoading] = useState(null)
  const [contentChosed, setContentChosed] = useState("ENTERTAINMENT")
  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post("/product//login/facebook", {
        pageId,
        pageToken,
        contentType: contentChosed,
      })
      .then(function (data) {
        console.log(data)
      })
      .catch((err) => alert("Error occurred somewhere, reload page"))
  }
  return (
    <main className="grid place-items-center px-4 py-24 sm:py-32 lg:px-6">
      <div className="border-[1px] px-6 py-2 w-1/2 rounded-md border-solid bg-base-200">
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
  const [pageToken, setPageToken] = useState(null)

  useEffect(() => {
    axios
      .get("/product/facebook/getpage")
      .then((response) => {
        if (response.data.length == 0) {
          setPages(null)
        } else {
          setPages(response.data[0]);
          console.log(response.data);
          !pageToken && setPageToken(response.data[0].pageToken)
        }
      })
      .catch(console.error)
  }, [])
  return (
    <>
      <nav>
        <Header />
      </nav>
      {<PagesList />}
      {!pages ? <Facebook setPages={setPages} setPageToken={setPageToken}/> : <PagesList />}
      
      {pages && <ContentType pageId={pages.pageId} pageName={pages.pageName} pageToken={pageToken } />}
    </>
  )
}
