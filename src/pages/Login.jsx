import { loginSchema } from "../utils/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button, Label, Select, TextInput } from "flowbite-react";
import { useStore } from "../app/store";
import { useEffect, useState } from "react";
import { ErrorModal } from "../components/Commons/ErrorModal";
import { useNavigate } from "react-router-dom";
import { getEntities,login } from "../api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faEnvelope, 
  faLock, 
  faHospital,
  faSignInAlt,
  faCashRegister
} from '@fortawesome/free-solid-svg-icons';

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
      <section className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
        <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
          <div className="mb-6 flex items-center">
            <FontAwesomeIcon 
              icon={faHospital} 
              className="mr-3 text-3xl text-primary-600 dark:text-primary-400"
              aria-label="Sistema de caja médica"
            />
            <h1 className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              Sistema de Caja Médica
            </h1>
          </div>
          <div className="dark:bg-gray-800/90 w-full rounded-2xl border-0 bg-white/90 shadow-2xl backdrop-blur-sm sm:max-w-md md:mt-0 xl:p-0">
            <div className="space-y-6 p-8 sm:p-10 md:space-y-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-3xl">
                  Acceso de Recepción Médica
                </h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Portal para gestión de pagos y admisión de pacientes
                </p>
              </div>
              <form className="space-y-6 md:space-y-8" onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-2">
                  <Label htmlFor="email" className="mb-2 flex items-center text-sm font-medium text-gray-900 dark:text-white">
                    <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-primary-600 dark:text-primary-400" />
                    Correo Institucional
                  </Label>
                  <TextInput 
                    type="email" 
                    name="email"
                    {...register('email')}
                    id="email" 
                    className="block w-full border-gray-300 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:focus:border-primary-400 dark:focus:ring-primary-400"
                    placeholder="recepcion@centrodesalud.com"
                    color={errors.email ? "failure" : "gray"}
                  />
                  {errors.email && <p className="mx-1 text-left text-sm text-red-500">{errors.email.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="mb-2 flex items-center text-sm font-medium text-gray-900 dark:text-white">
                    <FontAwesomeIcon icon={faLock} className="mr-2 text-primary-600 dark:text-primary-400" />
                    Contraseña Segura
                  </Label>
                  <TextInput 
                    type="password" 
                    name="password"
                    {...register('password')}
                    id="password" 
                    placeholder="••••••••••••"
                    className="block w-full border-gray-300 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:focus:border-primary-400 dark:focus:ring-primary-400"
                    color={errors.password ? "failure" : "gray"}
                  />
                  {errors.password && <p className="mx-1 text-left text-sm text-red-500">{errors.password.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="entity" className="mb-2 flex items-center text-sm font-medium text-gray-900 dark:text-white">
                    <FontAwesomeIcon icon={faHospital} className="mr-2 text-primary-600 dark:text-primary-400" />
                    Centro de Salud / Hospital
                  </Label>
                  <Select 
                    id="entity" 
                    name="entity"
                    {...register('entity')}
                    className="block w-full border-gray-300 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:focus:border-primary-400 dark:focus:ring-primary-400"
                    color={errors.entity ? "failure" : "gray"}
                  >
                    <option value="">Seleccione su centro de trabajo...</option>
                    { entities.map((entity) => (
                        <option key={entity.id} value={entity.id}>{entity.name}</option>
                      ))
                    }
                  </Select>
                  {errors.entity && <p className="mx-1 text-left text-sm text-red-500">{errors.entity.message}</p>}
                </div>
                                <div className="flex justify-end">
                  <a 
                    href="#" 
                    className="text-sm font-medium text-secondary-600 hover:text-secondary-700 hover:underline dark:text-secondary-400"
                  >
                    ¿Olvidó su contraseña?
                  </a>
                </div>
                
                <Button 
                  type="submit"
                  size="xl"
                  className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 font-semibold shadow-lg transition-all duration-200 hover:from-primary-700 hover:to-secondary-700 focus:ring-4 focus:ring-primary-300"
                  color="blue"
                >
                  <div className="flex items-center justify-center">
                    <FontAwesomeIcon icon={faCashRegister} className="mr-3" />
                    <span>Acceder a Caja de Recepción</span>
                  </div>
                </Button>
                
                <div className="text-center">
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    ¿Necesita acceso al sistema? {' '}
                    <a 
                      href="/register" 
                      className="font-medium text-secondary-600 hover:text-secondary-700 hover:underline dark:text-secondary-400"
                    >
                      Solicitar credenciales
                    </a>
                  </p>
                  <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
                    Sistema autorizado para personal de recepción médica
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      {showError && <ErrorModal message="Credenciales incorrectas" show={showError} onClose={handleCloseModal} />}
    </>
  )
}
