import React, { useContext, useState } from "react";
import { useForm, reset } from "react-hook-form";
import Link from "next/link";
import { UserContext } from "../context/user";
import {registerUser} from '../DAL/user';
import {useSnackbar} from 'notistack';
function Register() {
  const {enqueueSnackbar} = useSnackbar();
  const { doRegister } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const password = {};
  password.current = watch("password", "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState(["", ""]);

  const onSubmit = async (values) => {
    setIsSubmitting(true);

    const response = await registerUser(values);
    console.log(response);
    if(response.code==200){
      enqueueSnackbar("Login successfull, Please verify Email address", {variant:"success"})
    }
    else{
      enqueueSnackbar(response.message, {variant:"error"})
    }

    // if (ret[0] === "alert") {
    //   setAlert(ret);
    // } else {
    //   setAlert(ret);
    //   reset();
    // }
    setIsSubmitting(false);
  };
  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Register as a new User
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or
            <Link href="/login">
              <a className="ml-10 font-medium text-orange-500 hover:text-orange-600">
                Login
              </a>
            </Link>
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-6"
          action="#"
          method="POST"
        >
          <input type="hidden" name="remember" value="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                type="text"
                {...register("username", {
                  required: "Please enter username",
                })}
                className="relative block w-full appearance-none rounded-none rounded-t-md my-4 border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                placeholder="Username"
              />
              {errors.username && <p>{errors.username.message}</p>}
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                })}
                className="relative block w-full appearance-none rounded-none my-4 rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                placeholder="Email address"
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "You must specify a password",
                  minLength: { value: 8, message: "At least 8 character" },
                })}
                className="relative block w-full appearance-none my-4 rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                placeholder="Password"
              />
              {errors.password && <p>{errors.password.message}</p>}
            </div>
            <div>
              <label htmlFor="confirm_password" className="sr-only">
                Confirm Password
              </label>
              <input
                type="password"
                {...register("repeatpassword", {
                  validate: (value) =>
                    value === password.current || "The passwords do not match",
                })}
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-orange-500 focus:outline-none my-4 focus:ring-orange-500 sm:text-sm"
                placeholder="Confirm Password"
              />
              {errors.repeatpassword && <p>{errors.repeatpassword.message}</p>}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-orange-500 py-2 px-4 text-sm font-medium text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              disabled={isSubmitting}
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
              {isSubmitting && "Signing Up..."}
              {!isSubmitting && "Sign up"}
            </button>
          </div>
          {alert[1]}
        </form>
      </div>
    </div>
  );
}

export default Register;
