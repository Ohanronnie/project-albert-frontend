import Header from "../components/Header";
import { Link } from "react-router-dom";
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
            <Link to="/home">
              <button className="btn w-52 bg-base-100">
                Subscribe For $20 only
              </button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};
const ProductCard = ({ title, body, badge, path }) => {
  return (
    <div className="card w-full border-solid border-[1px] card-compact mb-4 bg-base-200 shadow-xl">
      <figure>
        <img
          src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          alt=""
        />
      </figure>
      <div className="card-body bg-base-200">
        <h2 className="card-title text-sm my-0 uppercase">
          {title} <span className="badge badge-outline">{badge}</span>
        </h2>
        <p className="text-sm capitalize">{body}</p>
        <div className="card-actions justify-end">
          <Link to={`/product/${path}`}>
            <button className="btn btn-primary">Try It Out</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
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
            title="Helo"
            body="Lorem Ipsun Dolor Sit Amet"
            badge="Coming Soon"
          />
          <ProductCard
            title="Helo"
            body="Lorem Ipsun Dolor Sit Amet"
            badge="Coming Soon"
          />
        </div>
      </main>
    </>
  );
};

export default function Home() {
  return (
    <>
      <nav>
        <Header />
      </nav>
      <section className="bg-base-100">
        <Paid />
      </section>
    </>
  );
}
