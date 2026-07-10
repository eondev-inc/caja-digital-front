import { GeneralModal } from '../../components/Commons/GeneralModal';
import { ErrorModal } from '../../components/Commons/ErrorModal';
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
    <section className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <div className="mx-auto w-full max-w-md rounded-xl border border-primary-100 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-800 md:max-w-lg xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
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
