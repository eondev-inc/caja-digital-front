import { Button, Checkbox, Label, Select, TextInput, Spinner } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHospital,
  faEnvelope,
  faLock,
  faUserPlus,
  faIdCard,
  faUser,
  faBuilding,
} from '@fortawesome/free-solid-svg-icons';
import { useStore } from '../app/store';
import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { schema } from '../utils/validationSchema';
import { registerUser } from '../api/auth/register.post';
import { getEntities } from '../api/general-settings/entities.get';
import { GeneralModal } from '../components/Commons/GeneralModal';
import { ErrorModal } from '../components/Commons/ErrorModal';

export const Register = () => {
  const { formData, setFormData } = useStore();

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('Error al crear el usuario');
  const [entities, setEntities] = useState([]);
  const [loadingEntities, setLoadingEntities] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: formData,
    mode: 'onBlur',
  });

  useEffect(() => {
    const fetchEntities = async () => {
      try {
        const response = await getEntities();
        if (Array.isArray(response)) {
          setEntities(response);
        }
      } catch {
        setEntities([]);
      } finally {
        setLoadingEntities(false);
      }
    };

    fetchEntities();
  }, []);

  const onSubmit = async (data) => {
    // Persistir solo campos no sensibles (excluir password y confirmPassword)
    setFormData({
      forenames: data.forenames,
      surnames: data.surnames,
      nid: data.nid,
      email: data.email,
      entity_id: data.entity_id,
      checkBox: data.checkBox,
    });

    // Construir payload limpio para el backend
    const payload = {
      forenames: data.forenames,
      surnames: data.surnames,
      nid: data.nid,
      email: data.email,
      password: data.password,
      entity_id: data.entity_id,
    };

    try {
      const response = await registerUser(payload);
      if (response.status !== 201) {
        setErrorMessage('Error al crear el usuario. Verifica los datos e intenta nuevamente.');
        setShowError(true);
      } else {
        setFormData({
          forenames: '',
          surnames: '',
          nid: '',
          email: '',
          entity_id: '',
          checkBox: false,
        });
        setShowSuccess(true);
      }
    } catch (error) {
      const msg =
        error?.response?.data?.message === 'El usuario ya está registrado'
          ? 'El RUT o correo electrónico ya está registrado en el sistema.'
          : 'Error al crear el usuario. Verifica los datos e intenta nuevamente.';
      setErrorMessage(msg);
      setShowError(true);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <div className="mx-auto w-full max-w-md rounded-xl border border-primary-100 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-800 md:max-w-lg xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">

            {/* Header */}
            <div className="text-center">
              <div className="mb-4 inline-flex size-16 items-center justify-center rounded-full bg-gradient-to-r from-primary-500 to-secondary-600 shadow-lg">
                <FontAwesomeIcon icon={faHospital} className="size-8 text-white" aria-hidden="true" />
              </div>
              <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                Registro de Personal
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Caja Digital — Centros de Salud
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>

              {/* Nombres y Apellidos */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <FontAwesomeIcon icon={faUser} className="text-primary-600 dark:text-primary-400" aria-hidden="true" />
                  Información Personal
                </Label>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-1">
                    <Label htmlFor="forenames" className="text-xs font-medium text-gray-600 dark:text-gray-400">
                      Nombres
                    </Label>
                    <TextInput
                      type="text"
                      id="forenames"
                      {...register('forenames')}
                      placeholder="Nombres"
                      className="rounded-lg border-gray-300 text-sm focus:border-primary-500 focus:ring-primary-500 dark:border-slate-600 dark:focus:border-primary-400"
                    />
                    {errors.forenames && (
                      <p className="text-xs text-red-600 dark:text-red-400" role="alert">
                        {errors.forenames.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="surnames" className="text-xs font-medium text-gray-600 dark:text-gray-400">
                      Apellidos
                    </Label>
                    <TextInput
                      type="text"
                      id="surnames"
                      {...register('surnames')}
                      placeholder="Apellidos"
                      className="rounded-lg border-gray-300 text-sm focus:border-primary-500 focus:ring-primary-500 dark:border-slate-600 dark:focus:border-primary-400"
                    />
                    {errors.surnames && (
                      <p className="text-xs text-red-600 dark:text-red-400" role="alert">
                        {errors.surnames.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* RUT */}
              <div className="space-y-2">
                <Label htmlFor="nid" className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <FontAwesomeIcon icon={faIdCard} className="text-primary-600 dark:text-primary-400" aria-hidden="true" />
                  RUT
                </Label>
                <TextInput
                  type="text"
                  id="nid"
                  {...register('nid')}
                  placeholder="11.111.111-1"
                  className="rounded-lg border-gray-300 text-sm focus:border-primary-500 focus:ring-primary-500 dark:border-slate-600"
                />
                {errors.nid && (
                  <p className="text-xs text-red-600 dark:text-red-400" role="alert">
                    {errors.nid.message}
                  </p>
                )}
              </div>

              {/* Centro de Salud */}
              <div className="space-y-2">
                <Label htmlFor="entity_id" className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <FontAwesomeIcon icon={faBuilding} className="text-primary-600 dark:text-primary-400" aria-hidden="true" />
                  Centro de Salud
                </Label>
                {loadingEntities ? (
                  <div className="flex items-center gap-2 py-2 text-sm text-gray-500 dark:text-gray-400">
                    <Spinner size="sm" />
                    <span>Cargando centros de salud...</span>
                  </div>
                ) : (
                  <Select
                    id="entity_id"
                    {...register('entity_id')}
                    className="rounded-lg border-gray-300 text-sm focus:border-primary-500 focus:ring-primary-500 dark:border-slate-600"
                  >
                    <option value="">Seleccione un centro de salud</option>
                    {entities.map((entity) => (
                      <option key={entity.id} value={entity.id}>
                        {entity.name}
                      </option>
                    ))}
                  </Select>
                )}
                {errors.entity_id && (
                  <p className="text-xs text-red-600 dark:text-red-400" role="alert">
                    {errors.entity_id.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <FontAwesomeIcon icon={faEnvelope} className="text-primary-600 dark:text-primary-400" aria-hidden="true" />
                  Correo Electrónico
                </Label>
                <TextInput
                  type="email"
                  id="email"
                  {...register('email')}
                  placeholder="correo@clinica.com"
                  className="rounded-lg border-gray-300 text-sm focus:border-primary-500 focus:ring-primary-500 dark:border-slate-600"
                />
                {errors.email && (
                  <p className="text-xs text-red-600 dark:text-red-400" role="alert">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Contraseñas */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <FontAwesomeIcon icon={faLock} className="text-primary-600 dark:text-primary-400" aria-hidden="true" />
                  Contraseña
                </Label>
                <div className="space-y-3">
                  <TextInput
                    type="password"
                    id="password"
                    {...register('password')}
                    placeholder="Contraseña (mín. 8 caracteres)"
                    className="rounded-lg border-gray-300 text-sm focus:border-primary-500 focus:ring-primary-500 dark:border-slate-600"
                  />
                  {errors.password && (
                    <p className="text-xs text-red-600 dark:text-red-400" role="alert">
                      {errors.password.message}
                    </p>
                  )}
                  <TextInput
                    type="password"
                    id="confirm-password"
                    {...register('confirmPassword')}
                    placeholder="Confirmar contraseña"
                    className="rounded-lg border-gray-300 text-sm focus:border-primary-500 focus:ring-primary-500 dark:border-slate-600"
                  />
                  {errors.confirmPassword && (
                    <p className="text-xs text-red-600 dark:text-red-400" role="alert">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Términos y Condiciones */}
              <div className="flex items-start gap-3 py-2">
                <Checkbox
                  id="terms"
                  {...register('checkBox')}
                  aria-describedby="terms-label"
                  className="mt-1 shrink-0 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-slate-600 dark:text-primary-400"
                />
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  <Label htmlFor="terms" id="terms-label">
                    Acepto los{' '}
                    <a
                      className="font-medium text-primary-600 underline hover:text-primary-800 dark:text-primary-400"
                      href="#"
                    >
                      términos y condiciones
                    </a>
                    {' '}del sistema Caja Digital
                  </Label>
                  {errors.checkBox && (
                    <p className="mt-1 text-xs text-red-600 dark:text-red-400" role="alert">
                      {errors.checkBox.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Botón de Registro */}
              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting || loadingEntities}
                  className="w-full rounded-lg bg-gradient-to-r from-primary-600 to-secondary-600 px-5 py-2.5 text-center text-sm font-medium text-white shadow-lg transition-all duration-200 hover:from-primary-700 hover:to-secondary-700 focus:ring-4 focus:ring-primary-300 disabled:opacity-60"
                >
                  <div className="flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <Spinner size="sm" />
                    ) : (
                      <FontAwesomeIcon icon={faUserPlus} aria-hidden="true" />
                    )}
                    {isSubmitting ? 'Registrando...' : 'Crear Cuenta de Recepción'}
                  </div>
                </Button>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  ¿Ya tienes una cuenta?{' '}
                  <a href="/login" className="font-medium text-primary-600 underline hover:text-primary-800 dark:text-primary-400">
                    Inicia sesión aquí
                  </a>
                </p>
              </div>

            </form>
          </div>
        </div>
      </div>

      {showSuccess && (
        <GeneralModal
          message="Usuario creado exitosamente. Ya puede iniciar sesión con sus credenciales."
          show={showSuccess}
          onClose={() => setShowSuccess(false)}
        />
      )}
      {showError && (
        <ErrorModal
          message={errorMessage}
          show={showError}
          onClose={() => setShowError(false)}
        />
      )}
    </section>
  );
};
