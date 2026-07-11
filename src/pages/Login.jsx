import LoginHero from './login/LoginHero';
import LoginForm from './login/LoginForm';
import { useLogin } from './login/hooks/useLogin';

export const Login = () => {
  const l = useLogin();

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100 dark:from-primary-950 dark:via-secondary-950 dark:to-primary-950">
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 -top-20 size-72 rounded-full bg-primary-100 blur-3xl dark:bg-primary-900" />
        <div className="absolute -bottom-32 -right-20 size-96 rounded-full bg-secondary-100 blur-3xl dark:bg-secondary-900" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
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
