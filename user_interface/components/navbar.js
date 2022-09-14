import { React, useEffect, useContext } from "react";
import Link from "next/link";
import { UserContext } from "../context/user";
const Navbar = ({ cart }) => {
  const { user, checkLogin, doLogout } = useContext(UserContext);
  useEffect(() => {
    async function func() {
      const res = await checkLogin();
      if (res.status === 200) {
      }
    }
    func();
  }, []);
  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link href="/">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <img className="w-8" src="/shopping-cart.png" alt="logo" />
            <span className="ml-3 text-xl">FastCart</span>
          </a>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link href="/">
            <a className="mr-5 hover:text-gray-900">Home</a>
          </Link>
          <Link href="/products">
            <a className="mr-5 hover:text-gray-900">Products</a>
          </Link>
          <Link href="/categories">
            <a className="mr-5 hover:text-gray-900">Categories</a>
          </Link>
          <Link href="/cart">
            <a className="mr-5 hover:text-gray-900">Cart({cart.length})</a>
          </Link>
          { user &&
          <Link href="/user">
            <a className="mr-5 hover:text-orange-600">
              Profile
              <svg style={{"display":"inline"}}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </a>
          </Link> }
        </nav>
        {!user && (
          <Link href="/login">
            <button
              className="inline-flex text-white border-0 py-1 px-2 md:px-4 focus:outline-none rounded text-md my-2"
              style={{ backgroundColor: "#f0661f" }}
            >
              Login
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>
            </button>
          </Link>
        )}
        {user && (
          <button
            onClick={() => doLogout()}
            className="inline-flex text-white border-0 py-1 px-2 md:px-2 focus:outline-none rounded text-md my-2"
            style={{ backgroundColor: "#f0661f" }}
          >
            Logout
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
              />
            </svg>
          </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
