import { axios } from "../utils/axios";
import { useState, useEffect, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
function ContentType({ name }) {
  const content = ["ENTERTAINMENT", "SPORTS", "SCIENCE", "TECHNOLOGY"]
  const [loading, setLoading] = useState(null)
  const [contentChosed, setContentChosed] = useState("ENTERTAINMENT");
  const [country, setCountry] = useState('us');
  const [language, setLanguage] = useState('en');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post("/product/auth/twitter/setContent", {
        contentType: contentChosed,
        country, language
      })
      .then(function (data) {
        console.log(data);
        navigate('/product/twitter/list');
      })
      .catch((err) => alert("Error occurred somewhere, reload page"))
  }
  return (
    <>
      <p className="text-base text-center leading-7">Welcome ${name}</p>
        <p className="text-base text-center leading-7">Select One</p>
        <hr className="mb-2" />

        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Select type of content</span>
            </label>
            <select className="input-bordered input" onChange={(e) => setContentChosed(e.target.value)}>
              {content.map((val) => (
                <option name="">{val}</option>
              ))}
            </select>
            </div>
            <div className="form-control">
            <label className="label">
              <span className="label-text">Enter country code</span>
            </label>
            <input className='input input-bordered' maxLength={2} onChange={(e) => setCountry(e.target.value)} value={country} />
             </div>
             <div className="form-control my-2">
            <label className="label">
              <span className="label-text">Enter language code</span>
            </label>
            <input className='input input-bordered ' maxLength={2} onChange={(e) => setLanguage(e.target.value)} value={language} />
             </div>
          <div className="form-control mt-6">
            {!loading ? (
              <button type="submit" className="btn btn-block bg-base-100">
                SUBMIT
              </button>
            ) : (
              <button className="btn bg-base-100 btn-block">
                <span className="loading loading-spinner"></span>
                Loading
              </button>
            )}
          </div>
        </form></>
  )
}

export function AccountList(){
  const [user, setUser] = useState(null);
  const hasRun = useRef(false);
  const navigate = useNavigate();
  const handleRemove =()=>{
    axios.delete('/product/auth/twitter/remove').then(() => navigate('/product/content/manage'))
  }
  useEffect(function(){
    axios.get('/product/auth/twitter/user').then(({ data }) => {
      console.log(17377)
      hasRun.current = true;
      if(data?.name) return setUser(data.name);
      setUser(false);
      navigate('/product/content/manage');
      hasRun.current = true;
    })
  },[]);

  return hasRun.current === true && user && (<>
   <main className="grid place-items-center px-4 py-24 h-full sm:py-32 lg:px-6">
      <div className="border-[1px] px-6 py-2 w-1/2 rounded-md border-solid bg-base-200">
        <p className="text-base text-center leading-7">Select One</p>
        <hr className="mb-2" />
        <div className="flex items-center justify-between mb-2">
        <p className="text-base text-center leading-7">{user}</p>
        {!false && (
          <button
          onClick={handleRemove}
            className="btn bg-base-100 px-1 w-16"
          >
            Remove
          </button>
        )}
      </div>
      </div>
    </main>
  </>) 
}
export default function Content(){
  const [authUrl, setAuthUrl] = useState(null);
  const [user, setUser] = useState(null);
  useEffect(function(){
    if(authUrl) window.location.href = authUrl;
  },[authUrl]);
  useEffect(function(){
    axios.get('/product/auth/twitter/user').then(({ data }) => {
      if(data?.name) return setUser(data.name);
      setUser(false);
    })
  },[]);
    const handleClick = () => {
      axios.get('/product/auth/twitter/get_auth_url').then(({ data }) => setAuthUrl(data.url)).catch(console.error)
    }
  
    return (
      <>
        <main className="grid place-items-center h-full px-4 py-24 sm:py-32 lg:px-6">
          <div className="border-[1px] w-1/2 p-2  rounded-md border-solid bg-base-200">{user === false ? (<> <div className="">
              <p className="text-base text-center mb-6 leading-7">
                Connect your twitter account
              </p>

             
              <button onClick={handleClick} className="btn bg-base-100 px-1 btn-block">Login with X (Twitter) </button>
             </div></>) : (<><ContentType name={user}/></>)}
           
          </div>
        </main>
      </>
    )
  }
