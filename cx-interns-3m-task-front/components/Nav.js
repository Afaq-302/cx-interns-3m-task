import Link from 'next/link';
import { useState } from 'react';
import { signOut, useSession } from "next-auth/react"
import { useRouter } from 'next/router'

const Nav = ({ userSession }) => {
  // console.log("Nav", userSession);
  const router = useRouter()
  return (

    <nav
      className="
          flex flex-wrap
          items-center
          justify-between
          w-full bg-slate-200
          py-4
          md:py-0
          px-4
          text-lg text-gray-700
          bg-white
        "
    >
      <div>
        <Link href="/" passHref>
          <a>
            <img
              className="m-3"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
              width={60}
              alt="Articles Website Logo"
            />
          </a>
        </Link>
      </div>


      <div
        className="hidden w-full md:flex md:items-center md:w-auto"
        id="menu"
      >
        <ul
          className="
              pt-4
              text-base text-gray-700
              md:flex
              md:justify-between 
              md:pt-0 space-x-2"
        >
          <li>
            <Link href="/">
              <a className="md:p-2 py-2 block hover:text-purple-400">Home</a>
            </Link>
          </li>
          {/* <li>
            <Link href="/about">
              <a className="md:p-2 py-2 block hover:text-purple-400" href="#">
                About
              </a>
            </Link>
          </li> */}
          <li>
            <Link href="/compose">
              <a className="md:p-2 py-2 block hover:text-purple-400" href="#">
                New Project
              </a>
            </Link>
          </li>
          <>
            <li>
              {
                router.pathname != '/dashboard' && router.pathname != '/signup' && router.pathname != '/login' && router.pathname != '/about' ?
                  <a href='/signup' className="lg:px-5 md:p-2 hover:border-transparent font-semibold block bg-transparent rounded hover:bg-blue-500 text-blue-700 hover:text-white border border-blue-500 ">
                    &lt; Dashboard
                  </a>
                  : ''
              }
            </li>

            <li>
              {userSession ? <button className="lg:px-5 md:p-2 hover:border-transparent font-semibold block bg-transparent rounded  hover:bg-blue-500 text-blue-700 hover:text-white border border-blue-500" onClick={signOut}>
                Logout
              </button> : <a href='/login' className="lg:px-5 md:p-2 hover:border-transparent font-semibold block bg-transparent rounded py-2 hover:bg-blue-500 text-blue-700 hover:text-white border border-blue-500">
                Login
              </a>}

              {/* bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded */}

            </li>
            <li>
              <a href='/signup' className="lg:px-5 md:p-2 hover:border-transparent font-semibold block bg-transparent rounded hover:bg-blue-500 text-blue-700 hover:text-white border border-blue-500 ">
                Sign Up
              </a>
            </li>
          </>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
