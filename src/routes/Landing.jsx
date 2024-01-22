import Header from "../components/Header";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
const advantages = [
  {
    title: "Monetizatio Freedom",
    body: "Unlock unlimited earning potential by monetizing videos without copyright restrictions.",
  },
  {
    title: "Creative Control",
    body: "Enjoy unparalleled creative freedom to modify and enhance content, fostering innovation.",
  },
  {
    title: "Legal Confidence",
    body: "Operate with peace of mind, knowing modified videos comply with copyright laws.",
  },
  {
    title: "Broad Audience Appeal",
    body: "Attract a wider audience with diverse, copyright-free content.",
  },
  {
    title: "Collaboration Opportunities",
    body: "Easily collaborate without navigating complex copyright issues.",
  },
  {
    title: "Quick Monetization Onset",
    body: "Start earning rapidly without delays from copyright permissions.",
  },
  {
    title: "Adaptability Across Platforms",
    body: "Share and monetize content seamlessly on various platforms.",
  },
  {
    title: "Enhanced Virality",
    body: "Optimize for increased shareability and virality without copyright limitations.",
  },
  {
    title: "Brand Endorsements",
    body: "Attract brand partnerships confidently, showcasing modified content.",
  },
  {
    title: "User Loyalty",
    body: "Build loyalty by supporting creators in monetizing and expressing creativity.",
  },
];
const Advantages = ({ title, body }) => {
  return (
    <>
      <main className={"mb-4"}>
        <div className="border-[1px] py-4 pl-4 rounded-md border-solid text-cente bg-base-200">
          <h1 className="text-xl font-bold tracking-tight sm:text-xl">
            {title}
          </h1>
          <p className="mt-3 text-base leading-7">{body}</p>
        </div>
      </main>
    </>
  );
};
export default function Landing() {
  return (
    <>
      <nav>
        <Header landing={true} />
      </nav>
      <section className="mt-10 px-6">
        <div className="">
          <h1 className="font-semibold mb-4 dark:text-white leading-[1.3] md:leading-[1.5] md:text-5xl text-4xl text-center">
            Introducing a New Era of Social Media Manager{" "}
          </h1>
          <h4 className="capitalize text-center dark:text-white text-md">
            Manage your social media space effectively with AI
          </h4>
          <Link to="/register">
            <button className="btn mt-6 md: light:text-white light:bg-black dark:text-black text-sm rounded-full btn-block capitalize bg-white">
              Start for free <ArrowRightIcon className="h-5 w-5" />
            </button>
          </Link>
        </div>
        <hr className="my-8" />
        <div className="">
          <h1 className="font-semibold mb-4 dark:text-white leading-[1.3]  text-2xl text-center">
            Why Choose Us?
          </h1>
          <div className="pb-8">
            {advantages.map((e) => (
              <Advantages key={Math.random()} {...e} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
