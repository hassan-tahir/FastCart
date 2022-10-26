import Link from "next/link";
import { React, useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../context/user";
import {useRouter} from 'next/router'
import {login} from '../DAL/user/login'
import {useSnackbar} from 'notistack'

function Login() {
  const router = useRouter()
  const { handleSubmit, register } = useForm();
  const {enqueueSnackbar} = useSnackbar()
  const [alert, setAlert] = useState(["", ""]);

  const { setUser, doLogin, loggingIn, setLoggingIn, user, admin, confirmed } = useContext(UserContext);
  if(admin && user)
  {
    router.push('/admin')
  }
  if(user && !admin)
  {
    router.push('/user')
  }
  else if(user && !confirmed)
  {
    router.push('/confirmEmail')
  }
  const onSubmit = async (values) => {
    const response = await login(values);
    if(response.code==200) {
      setUser(response.data.user.username)
      localStorage.setItem('token', response.data.jwt)
      localStorage.setItem('user', JSON.stringify(response.data.user))
    } else {
      enqueueSnackbar(response.message, {variant:'error'})
    }
  }
  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or
            <Link href="/register">
              <a className="ml-10 font-medium text-orange-500 hover:text-orange-600">
                Create New Account
              </a>
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="hidden"
            name="remember"
            value="true"
          />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                type="email"
                autoComplete="email"
                {...register("identifier", {
                  required: true,
                })}
                className="relative my-4 block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                {...register("password", {
                  required: true,
                })}
                className="relative my-4 block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-600"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link href="/forgot">
                <a
                  href="#"
                  className="font-medium text-orange-500 hover:text-orange-600"
                >
                  Forgot your password?
                </a>
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-orange-500 py-2 px-4 text-sm font-medium text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              disabled={loggingIn}
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-orange-500 group-hover:text-orange-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              {loggingIn && "Signing in..."}
              {!loggingIn && "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
