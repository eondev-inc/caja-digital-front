import { GeneralModal } from '../components/Commons/GeneralModal';
import { ErrorModal } from '../components/Commons/ErrorModal';
import { useRegister } from './register/hooks/useRegister';
import { RegisterHeader } from './register/RegisterHeader';
import { RegisterForm } from './register/RegisterForm';

export const Register = () => {
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    entities,
    loadingEntities,
    showSuccess,
    setShowSuccess,
    showError,
    setShowError,
    errorMessage,
    onSubmit,
  } = useRegister();

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100 dark:from-primary-950 dark:via-secondary-950 dark:to-primary-950">
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 -top-20 size-72 rounded-full bg-primary-100 blur-3xl dark:bg-primary-900" />
        <div className="absolute -bottom-32 -right-20 size-96 rounded-full bg-secondary-100 blur-3xl dark:bg-secondary-900" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white shadow-xl dark:border-primary-800 dark:bg-primary-900 md:max-w-lg">
          <div className="space-y-4 p-6 sm:p-8">
            <RegisterHeader />
            <RegisterForm
              register={register}
              handleSubmit={handleSubmit}
              errors={errors}
              isSubmitting={isSubmitting}
              entities={entities}
              loadingEntities={loadingEntities}
              onSubmit={onSubmit}
            />
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
