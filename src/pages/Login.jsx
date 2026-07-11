import LoginHero from './login/LoginHero';
import LoginForm from './login/LoginForm';
import { useLogin } from './login/hooks/useLogin';

export const Login = () => {
  const l = useLogin();

  return (
    <section className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <LoginHero />
        <LoginForm
          register={l.register}
          handleSubmit={l.handleSubmit}
          errors={l.errors}
          isSubmitting={l.isSubmitting}
          entities={l.entities}
          errorMessage={l.errorMessage}
          onSubmit={l.onSubmit}
        />
      </div>
    </section>
  );
};
