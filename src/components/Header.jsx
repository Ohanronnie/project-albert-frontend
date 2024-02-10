import { useNavigate } from "react-router-dom";
export default function Header({ landing }) {
  const navigate = useNavigate();

  return (
    <>
      <div className="navbar bg-base-200 dark:text-white shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className={`menu menu-sm hidden ${
                true && "hidden"
              } dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52`}
            >
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Parent 2</a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost  text-xl">Itools</a>
        </div>
        <div className="navbar-center hidden">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <details>
                <summary>Parent</summary>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          {landing && (
            <button
              onClick={() => navigate("/register")}
              className="btn text-white bg-[#008FFF] outline-none border-none"
            >
              Sign Up For Free
            </button>
          )}
        </div>
      </div>
    </>
  );
}
