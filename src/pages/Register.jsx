import { Button, Checkbox, Label, Select, TextInput } from "flowbite-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHospital, faEnvelope, faLock, faUserPlus, faIdCard, faCheck, faUser } from '@fortawesome/free-solid-svg-icons';
import { useStore } from "../app/store";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { schema } from "../utils/validationSchema";
import { registerUser } from "../api/auth/register.post";
import { GeneralModal } from "../components/Commons/GeneralModal";
import { ErrorModal } from "../components/Commons/ErrorModal";

export const Register = () => {
  const { formData, setFormData } = useStore();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: formData,
    mode: "onBlur"
  });

  const onSubmit = async (data) => {
    setFormData(data);
    const response = await registerUser(formData);
    if (response.status !== 201) {
      setShowError(true);
    } else {
      setFormData();
      setShowSuccess(true);
    }
  }

  const handleCloseSuccess = (data) => {
    setShowSuccess(data);
  }

  const handleCloseError = (data) => {
    setShowError(data);
  }


  return (
    <section className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-100">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <div className="mx-auto w-full max-w-md rounded-xl border border-green-100 bg-white shadow-2xl md:max-w-lg xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <div className="text-center">
              <div className="mb-4 inline-flex size-16 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-blue-600 shadow-lg">
                <FontAwesomeIcon icon={faHospital} className="size-8 text-white" />
              </div>
              <h1 className="mb-2 text-2xl font-bold text-gray-900">
                Registro de Personal
              </h1>
              <p className="text-sm text-gray-600">
                Sistema de Recepción Médica
              </p>
            </div>
            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
              {/* Nombres y Apellidos en Grid */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <FontAwesomeIcon icon={faUser} className="text-green-600" />
                  Información Personal
                </Label>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-1">
                    <Label htmlFor="surnames" className="text-xs font-medium text-gray-600">Nombres</Label>
                    <TextInput 
                      type="text" 
                      name="surnames"
                      {...register('surnames')}
                      id="surnames"
                      className="rounded-lg border-gray-300 text-sm focus:border-green-500 focus:ring-green-500"
                      placeholder="Nombres"
                    />
                    {errors.surnames && <p className="text-xs text-red-600">{errors.surnames.message}</p>}
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="forenames" className="text-xs font-medium text-gray-600">Apellidos</Label>
                    <TextInput 
                      type="text" 
                      name="forenames"
                      {...register('forenames')}
                      id="forenames"
                      className="rounded-lg border-gray-300 text-sm focus:border-green-500 focus:ring-green-500"
                      placeholder="Apellidos"
                    />
                    {errors.forenames && <p className="text-xs text-red-600">{errors.forenames.message}</p>}
                  </div>
                </div>
              </div>
              {/* Identificación */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <FontAwesomeIcon icon={faIdCard} className="text-green-600" />
                  Identificación
                </Label>
                <div className="flex gap-3">
                  <div className="w-28">
                    <Select 
                      defaultValue="rut" 
                      id="nidType" 
                      name="nidType" 
                      className="h-10 rounded-lg border-gray-300 text-sm focus:border-green-500 focus:ring-green-500"
                    >
                      <option value="rut">RUT</option>
                      <option value="pasaporte">Pasaporte</option>
                    </Select>
                  </div>
                  <div className="flex-1">
                    <TextInput 
                      type="text" 
                      name="nid" 
                      id="nid"
                      {...register('nid')}
                      className="h-10 rounded-lg border-gray-300 text-sm focus:border-green-500 focus:ring-green-500"
                      placeholder="11.111.111-1"
                    />
                  </div>
                </div>
                {errors.nidType && <p className="text-xs text-red-600">{errors.nidType.message}</p>}
                {errors.nid && <p className="text-xs text-red-600">{errors.nid.message}</p>}
              </div>
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <FontAwesomeIcon icon={faEnvelope} className="text-green-600" />
                  Correo Electrónico
                </Label>
                <TextInput 
                  type="email" 
                  name="email"
                  {...register('email')}
                  id="email"
                  className="h-10 rounded-lg border-gray-300 text-sm focus:border-green-500 focus:ring-green-500"
                  placeholder="correo@clinica.com"
                />
                {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
              </div>

              {/* Contraseñas */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <FontAwesomeIcon icon={faLock} className="text-green-600" />
                  Contraseña
                </Label>
                <div className="space-y-3">
                  <TextInput 
                    type="password" 
                    name="password"
                    {...register('password')}
                    id="password" 
                    placeholder="Contraseña (mín. 8 caracteres)"
                    className="h-10 rounded-lg border-gray-300 text-sm focus:border-green-500 focus:ring-green-500"
                  />
                  {errors.password && <p className="text-xs text-red-600">{errors.password.message}</p>}
                  
                  <TextInput 
                    type="password" 
                    name="confirm-password"
                    {...register('confirmPassword')}
                    id="confirm-password" 
                    placeholder="Confirmar contraseña"
                    className="h-10 rounded-lg border-gray-300 text-sm focus:border-green-500 focus:ring-green-500"
                  />
                  {errors.confirmPassword && <p className="text-xs text-red-600">{errors.confirmPassword.message}</p>}
                </div>
              </div>
              {/* Términos y Condiciones */}
              <div className="flex items-start gap-3 py-2">
                <Checkbox 
                  id="terms" 
                  name="terms" 
                  aria-describedby="terms"
                  {...register('checkBox')}
                  className="mt-1 shrink-0 rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <div className="text-xs text-gray-600">
                  <Label htmlFor="terms">
                    Acepto los{' '}
                    <a className="font-medium text-green-600 underline hover:text-green-800" href="#">
                      términos y condiciones
                    </a>
                    {' '}del sistema de recepción médica
                  </Label>
                </div>
              </div>
              
              {/* Botón de Registro */}
              <div className="pt-2">
                <Button 
                  type="submit" 
                  className="w-full rounded-lg bg-gradient-to-r from-green-600 to-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white shadow-lg transition-all duration-200 hover:from-green-700 hover:to-blue-700 focus:ring-4 focus:ring-green-300"
                >
                  <div className="flex items-center justify-center gap-2">
                    <FontAwesomeIcon icon={faUserPlus} />
                    Crear Cuenta de Recepción
                  </div>
                </Button>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  ¿Ya tienes una cuenta?{' '}
                  <a href="/login" className="font-medium text-green-600 underline hover:text-green-800">
                    Inicia sesión aquí
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {showSuccess && <GeneralModal message="User created successfully" show={showSuccess} onClose={handleCloseSuccess} />}
      {showError && <ErrorModal message="Error creating user" show={showError} onClose={handleCloseError} />}
    </section>
  )
}
