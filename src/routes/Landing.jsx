import Header from "../components/Header";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
export default function Landing() {
  return (
    <>
      <nav>
        <Header landing={true} />
      </nav>
      <section className="mt-10 px-6">
        <div className="">
          <h1 className="font-semibold mb-4 dark:text-white leading-[1.3]  text-4xl text-center">
            Introducing a New Era of Social Media Manager{" "}
          </h1>
          <h4 className="capitalize text-center dark:text-white text-md">
            Manage your social media space effectively with AI
          </h4>
          <Link to="/register">
            <button className="btn mt-6 light:text-white light:bg-black dark:text-black text-sm rounded-full btn-block capitalize bg-white">
              Start for free <ArrowRightIcon className="h-5 w-5" />
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}
