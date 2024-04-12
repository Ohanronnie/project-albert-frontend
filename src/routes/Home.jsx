import Header from "../components/Header"
import { Link } from "react-router-dom"
import { axios } from "../utils/axios.js"
import { useState, useEffect } from "react"
import Vector from "../assets/youtube-4740743_1280.jpg"
const NeedPayment = () => {
  return (
    <>
      <main className="grid place-items-center px-6 py-24 sm:py-32 lg:px-8">
        <div className="border-[1px] p-2 rounded-md border-solid text-center bg-base-200">
          <p className="text-base font-semibold text-indigo-600">Attention!</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
            Payment Required
          </h1>
          <p className="mt-6 text-base leading-7">
            Sorry, you have to subscribe before you can use this tool.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link to="/payment/pay">
              <button className="btn w-52 bg-base-100">
                Subscribe For ₦3000 only
              </button>
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
const ProductCard = ({ title, body, badge, path }) => {
  return (
    <div className="card w-full border-solid border-[1px] card-compact mb-4 bg-base-200 shadow-xl">
      <figure>
        <img src={Vector} alt="" />
      </figure>
      <div className="card-body bg-base-200">
        <h2 className="card-title text-sm my-0 uppercase">
          {title} <span className="badge badge-outline">{badge}</span>
        </h2>
        <p className="text-sm capitalize">{body}</p>
        {!badge.match(/soon/i) && (
          <div className="card-actions justify-end">
            <Link to={`/product/${path}`}>
              <button className="btn btn-primary">{"Try It Out"}</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
const Paid = () => {
  return (
    <>
      <main className="px-4 py-4">
        <h4 className="">Available Products</h4>
        <div className="my-4 flex justify-between flex-wrap">
          <ProductCard
            title="Watermark Adder"
            body="Add video, text and image to your video"
            badge="NEW"
            path="watermark"
          />
          <ProductCard
            title="Content Manager"
            body="Help you manage your Facebook page with AI"
            badge="NEW"
            path="content/manage"
          />
          {/*
          <ProductCard
            title="Content Scheduling"
            body="Schedule post to social media"
            badge="Coming Soon"
          />*/}
        </div>
      </main>
    </>
  )
}

export default function Home() {
  const [hasPaid, setHasPaid] = useState(false)
  const [loading, setLoading] = useState(true)
  const [daysRemain, setDaysRemain] = useState(0)
  useEffect(() => {
    axios
      .post("/user")
      .then((response) => {
        const data = response.data
        if (data.paymentRequired) {
          setHasPaid(false)
        } else {
          setHasPaid(true)
        }
        /*        if (data.payment_required && !data.free_trial_days) {
          setHasPaid(false);
        } else if (!data.payment_required) {
          setHasPaid(true);
        }*/
      })
      .catch((error) => {
        setHasPaid(false)
      })
      .finally((e) => setLoading(false))
  }, [])
  return (
    <>
      <nav>
        <Header />
      </nav>
      <section className="bg-base-100">
        {!loading && !hasPaid && <NeedPayment />}
        {!loading && hasPaid && <Paid />}
      </section>
    </>
  )
}
