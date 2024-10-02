import { loginSchema } from "../utils/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { login } from "../api/auth/login.post";
import { useStore } from "../app/store";
import { GeneralModal } from "../components/Commons/GeneralModal";
import { useState } from "react";
import { useEffect } from "react";

export const Login = () => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onBlur"
  });
  //Access Token para guardar en el store
  const { setAccessToken } = useStore();

  const handleModalClose = () => {
    setShow(false)
  }

  const onSubmit = async (data) => {
    
    const response = await login(data);

    if (response.access_token) {
      setAccessToken(response.access_token);
    } else {
      setError(response)
      setShow(true)
    }
  }

  return (
    <>
      <section className="dark:bg-gray-900">
        <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
          <div className="w-full rounded-lg border border-slate-300 bg-white shadow-2xl sm:max-w-md md:mt-0 xl:p-0 dark:border dark:border-gray-700 dark:bg-gray-800">
            <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <Label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Your email</Label>
                  <TextInput type="email" name="email"
                    {...register('email')}
                    id="email" className="focus:border-primary-600 focus:ring-primary-600 
                    block w-full 
                    text-gray-900 dark:border-gray-600 
                    dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 
                    dark:focus:border-blue-500 dark:focus:ring-blue-500" 
                    placeholder="name@company.com"
                  />
                  {errors.email && <p className="mx-1 text-left text-sm text-red-500">{errors.email.message}</p>}
                </div>
                <div>
                  <Label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Password</Label>
                  <TextInput type="password" name="password" 
                    {...register('password')}
                    id="password" placeholder="••••••••" 
                    className="focus:border-primary-600 focus:ring-primary-600  block
                    w-full text-gray-900 
                    dark:border-gray-600 dark:bg-gray-700 
                    dark:text-white dark:placeholder:text-gray-400 
                    dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  />
                  {errors.password && <p className="mx-1 text-left text-sm text-red-500">{errors.password.message}</p>}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <Checkbox id="remember" aria-describedby="remember" type="checkbox" 
                        className="focus:ring-primary-300 dark:focus:ring-primary-600 
                        dark:border-gray-600 dark:bg-gray-700 
                        dark:ring-offset-gray-800"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                    </div>
                  </div>
                  <a href="#" className="text-primary-600 dark:text-primary-500 text-sm font-medium hover:underline">Forgot password?</a>
                </div>
                <Button type="submit"
                  className="hover:bg-primary-700 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 
                  dark:focus:ring-primary-800 w-full 
                  text-center text-sm 
                  font-medium text-white 
                  focus:outline-none focus:ring-4"
                >
                  Sign in
                </Button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Don’t have an account yet? <a href="/register" className="text-primary-600 dark:text-primary-500 font-medium hover:underline">Sign up</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
      <GeneralModal
        title={error.error}
        show={show} 
        typeModal={"error"} 
        buttonMessage={error.message} 
        onClose={handleModalClose}
      >
        <p> An error has ocurred, please retry!</p>
      </GeneralModal>
    </>
  )
}
