import { Button } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHospital } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export const HomeCTA = () => {
  return (
    <section
      id="contact"
      className="bg-neutral-50 dark:bg-neutral-900"
      aria-labelledby="cta-heading"
    >
      <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h2
          id="cta-heading"
          className="mb-4 text-4xl font-bold text-neutral-900 dark:text-white sm:text-5xl"
        >
          Listo para modernizar tu centro de salud
        </h2>
        <p className="mx-auto mb-10 max-w-xl text-lg text-neutral-600 dark:text-neutral-400">
          Únete a más de 500 centros de salud que ya gestionan sus cobros con
          Caja Digital. Implementación en 24 horas.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button
            as={Link}
            to="/register"
            color="blue"
            size="xl"
            className="shadow-lg transition-all hover:shadow-xl focus:ring-4 focus:ring-primary-300"
            aria-label="Crear cuenta gratuita en Caja Digital"
          >
            <FontAwesomeIcon
              icon={faHospital}
              className="mr-2"
              aria-hidden="true"
            />
            Crear cuenta gratuita
          </Button>
          <Button
            as={Link}
            to="/login"
            color="light"
            size="xl"
            className="transition-all focus:ring-4 focus:ring-neutral-200"
          >
            Iniciar sesión
          </Button>
        </div>
        <p className="mt-6 text-sm text-neutral-500 dark:text-neutral-500">
          Sin tarjeta de crédito · Cancela cuando quieras · Soporte en español
        </p>
      </div>
    </section>
  );
};
