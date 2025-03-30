import { loginSchema } from "../utils/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button, Checkbox, Label, Select, TextInput } from "flowbite-react";
import { useStore } from "../app/store";
import { useEffect, useState } from "react";
import { ErrorModal } from "../components/Commons/ErrorModal";
import { useNavigate } from "react-router-dom";
import { getEntities,login } from "../api";

export const Login = () => {
  const [showError, setShowError] = useState(false);
  const [entities, setEntities] = useState([]);
  const navigateTo = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onBlur"
  });
  //Access Token para guardar en el store
  const { setAccessToken, setIsAuthenticated, isAuthenticated, setUserInfo, accessToken } = useStore();

  const onSubmit = async (data) => {
    const response = await login(data);

    if (response.statusCode !== 404) {
      setAccessToken(response.accessToken);
      setUserInfo(response.user);
      setIsAuthenticated(true);
      setShowError(false)

    } else {
      setShowError(true)
    }
  }

  const handleCloseModal = (data) => {
    setShowError(data)
  }

  useEffect(() => {
    const fetchEntities = async () => {
      const response = await getEntities();
      setEntities(response);
    }
    fetchEntities();
  }
  , [])

  useEffect(() => {
    if (isAuthenticated) {
      navigateTo('/dashboard')
    }
  }, [isAuthenticated, navigateTo])

  useEffect(() => {
    if (accessToken) {
      navigateTo('/dashboard');
    }
  }, [accessToken, navigateTo])

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
                    id="email" className="block w-full text-gray-900"
                    placeholder="name@company.com"
                  />
                  {errors.email && <p className="mx-1 text-left text-sm text-red-500">{errors.email.message}</p>}
                </div>
                <div>
                  <Label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Password</Label>
                  <TextInput type="password" name="password"
                    {...register('password')}
                    id="password" placeholder="••••••••"
                    className="block w-full text-gray-900" 
                  />
                  {errors.password && <p className="mx-1 text-left text-sm text-red-500">{errors.password.message}</p>}
                </div>
                <div>
                  <Label htmlFor="entity" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Select your Entity</Label>
                  <Select id="entity" name="entity"
                    {...register('entity')}
                    className="block w-full text-gray-900"
                  >
                    { entities.map((entity) => (
                        <option key={entity.id} value={entity.id}>{entity.name}</option>
                      ))
                    }
                  </Select>
                  {errors.entity && <p className="mx-1 text-left text-sm text-red-500">{errors.entity.message}</p>}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <Checkbox id="remember" aria-describedby="remember" type="checkbox"/>
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                    </div>
                  </div>
                  <a href="#" className="text-primary-600 dark:text-primary-500 text-sm font-medium hover:underline">Forgot password?</a>
                </div>
                <Button type="submit"
                  className="w-full 
                  text-center text-sm 
                  font-medium text-white"
                  color="blue"
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
      {showError && <ErrorModal message="Credenciales incorrectas" show={showError} onClose={handleCloseModal} />}
    </>
  )
}
